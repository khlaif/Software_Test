import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Pressable,
    ActivityIndicator,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import styles from "./BillingpageStyle";

import Recipticon from "../../../../assets/images/receipt.svg";
import CheckIcon from "../../../../assets/images/circle-check_green.svg";
import PendingIcon from "../../../../assets/images/clock_orange.svg";
import Sheildicon from "../../../../assets/images/shield-check.svg";

function formatArabicDate(date) {
    return new Intl.DateTimeFormat("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}

function generateInvoiceId() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    return `INV-${y}${m}${d}-${randomPart}`;
}

function getDepartmentFromTestName(testName = "") {
    const name = testName.toLowerCase();

    if (
        name.includes("mri") ||
        name.includes("ct") ||
        name.includes("x-ray") ||
        name.includes("أشعة") ||
        name.includes("رنين") ||
        name.includes("تصوير")
    ) {
        return "الأشعة";
    }

    if (
        name.includes("cbc") ||
        name.includes("blood") ||
        name.includes("lab") ||
        name.includes("دم") ||
        name.includes("مختبر") ||
        name.includes("تحاليل")
    ) {
        return "المختبر";
    }

    if (
        name.includes("ecg") ||
        name.includes("cardio") ||
        name.includes("heart") ||
        name.includes("قلب") ||
        name.includes("القلبية")
    ) {
        return "القلبية";
    }

    if (
        name.includes("urine") ||
        name.includes("بول")
    ) {
        return "المختبر";
    }

    return "التشخيص";
}

function getEstimatedCost(testName = "") {
    const name = testName.toLowerCase();

    if (
        name.includes("mri") ||
        name.includes("رنين")
    ) {
        return 800;
    }

    if (
        name.includes("ct") ||
        name.includes("طبقي")
    ) {
        return 650;
    }

    if (
        name.includes("x-ray") ||
        name.includes("أشعة")
    ) {
        return 180;
    }

    if (
        name.includes("cbc") ||
        name.includes("دم")
    ) {
        return 120;
    }

    if (
        name.includes("ecg") ||
        name.includes("قلب")
    ) {
        return 200;
    }

    if (
        name.includes("urine") ||
        name.includes("بول")
    ) {
        return 90;
    }

    return 150;
}

function buildInvoiceItemsFromAiResult(aiResult, insuranceRate = 0.7) {
    const recommendedTests = aiResult?.data?.recommended_tests || [];

    if (!recommendedTests.length) {
        return [];
    }

    return recommendedTests.map((test) => {
        const cost = getEstimatedCost(test.test_name);
        const covered = Math.round(cost * insuranceRate);
        const final = cost - covered;

        return {
            name: test.test_name,
            dept: getDepartmentFromTestName(test.test_name),
            cost,
            covered,
            final,
            reason: test.reason || "",
        };
    });
}

function getInvoiceSummary(items = []) {
    const total = items.reduce((sum, item) => sum + item.cost, 0);
    const insuranceCovered = items.reduce((sum, item) => sum + item.covered, 0);
    const patientShare = items.reduce((sum, item) => sum + item.final, 0);

    return {
        total,
        insuranceCovered,
        patientShare,
    };
}

function formatCardNumber(value) {
    return value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
}

function formatExpiry(value) {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);

    if (cleaned.length <= 2) {
        return cleaned;
    }

    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
}

function buildInvoiceHtml(invoiceDetails, paymentSuccess) {
    const rows =
        invoiceDetails.items.length === 0
            ? `
                <tr>
                    <td colspan="5" style="padding:20px; text-align:center; color:#6b7280;">
                        لا توجد فحوصات موصى بها حالياً لعرضها في الفاتورة.
                    </td>
                </tr>
              `
            : invoiceDetails.items
                  .map(
                      (item) => `
                        <tr>
                            <td style="padding:12px; border-bottom:1px solid #e2e8f0; text-align:right;">${item.name}</td>
                            <td style="padding:12px; border-bottom:1px solid #e2e8f0; text-align:right;">${item.dept}</td>
                            <td style="padding:12px; border-bottom:1px solid #e2e8f0; text-align:center;">${item.cost}</td>
                            <td style="padding:12px; border-bottom:1px solid #e2e8f0; text-align:center; color:#16a34a;">-${item.covered}</td>
                            <td style="padding:12px; border-bottom:1px solid #e2e8f0; text-align:center; font-weight:bold;">${item.final} ₪</td>
                        </tr>
                    `
                  )
                  .join("");

    return `
        <html dir="rtl">
            <head>
                <meta charset="utf-8" />
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 24px;
                        color: #0f172a;
                        background: #ffffff;
                    }
                    .header {
                        background: #0f172a;
                        color: white;
                        padding: 24px;
                        border-radius: 18px;
                        margin-bottom: 24px;
                    }
                    .title {
                        font-size: 28px;
                        font-weight: bold;
                        margin-bottom: 6px;
                    }
                    .subtitle {
                        font-size: 15px;
                        color: #cbd5e1;
                    }
                    .status {
                        padding: 16px;
                        border-radius: 16px;
                        margin-bottom: 24px;
                        background: ${paymentSuccess ? "#f0fdf4" : "#fffbeb"};
                        color: ${paymentSuccess ? "#14532d" : "#78350f"};
                        border: 1px solid ${paymentSuccess ? "#bbf7d0" : "#fde68a"};
                    }
                    .grid {
                        display: table;
                        width: 100%;
                        margin-bottom: 24px;
                    }
                    .col {
                        display: table-cell;
                        width: 33.33%;
                        vertical-align: top;
                        padding-left: 12px;
                    }
                    .label {
                        color: #64748b;
                        font-size: 13px;
                        margin-bottom: 6px;
                    }
                    .value {
                        font-size: 17px;
                        font-weight: bold;
                    }
                    .badge {
                        display: inline-block;
                        margin-top: 10px;
                        padding: 6px 10px;
                        border-radius: 999px;
                        background: #f0fdf4;
                        color: #15803d;
                        border: 1px solid #bbf7d0;
                        font-size: 12px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 12px;
                    }
                    th {
                        text-align: right;
                        color: #64748b;
                        font-size: 12px;
                        padding: 12px;
                        background: #f8fafc;
                    }
                    .summary {
                        margin-top: 24px;
                        background: #f8fafc;
                        border-radius: 16px;
                        padding: 18px;
                    }
                    .summary-row {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                        font-size: 15px;
                    }
                    .green {
                        color: #16a34a;
                    }
                    .total {
                        border-top: 1px solid #e2e8f0;
                        padding-top: 14px;
                        margin-top: 14px;
                        font-weight: bold;
                        font-size: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="title">كشف الحساب الطبي</div>
                    <div class="subtitle">فاتورة رقم ${invoiceDetails.id}</div>
                </div>

                <div class="status">
                    ${
                        paymentSuccess
                            ? "تم الدفع بنجاح - شكراً لك، تم تسوية رصيد هذه الفاتورة بالكامل."
                            : "بانتظار الدفع - يرجى تسوية الرصيد المتبقي لإتمام الإجراءات."
                    }
                </div>

                <div class="grid">
                    <div class="col">
                        <div class="label">المريض</div>
                        <div class="value">${invoiceDetails.patientName}</div>
                        <div style="margin-top:4px; color:#64748b;">رقم الملف: ${invoiceDetails.patientId}</div>
                    </div>

                    <div class="col">
                        <div class="label">التغطية التأمينية</div>
                        <div class="value">
                            ${invoiceDetails.insuranceProvider} (${invoiceDetails.insuranceCoverageLabel})
                        </div>
                        <div class="badge">${invoiceDetails.insuranceStatus}</div>
                    </div>

                    <div class="col">
                        <div class="label">تاريخ الإصدار</div>
                        <div class="value">${invoiceDetails.date}</div>
                    </div>
                </div>

                <div style="font-size:20px; font-weight:bold; margin-bottom:12px;">تفاصيل الطلبية</div>

                <table>
                    <thead>
                        <tr>
                            <th>الإجراء الطبي</th>
                            <th>القسم</th>
                            <th style="text-align:center;">التكلفة (₪)</th>
                            <th style="text-align:center;">تغطية التأمين</th>
                            <th style="text-align:center;">المطلوب دفعه</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>

                <div class="summary">
                    <div class="summary-row">
                        <span>إجمالي التكلفة قبل التأمين</span>
                        <span>${invoiceDetails.summary.total} ₪</span>
                    </div>

                    <div class="summary-row green">
                        <span>إجمالي تغطية التأمين (70%)</span>
                        <span>-${invoiceDetails.summary.insuranceCovered} ₪</span>
                    </div>

                    <div class="summary-row total">
                        <span>الرصيد المستحق الدفع</span>
                        <span>${invoiceDetails.summary.patientShare} ₪</span>
                    </div>
                </div>
            </body>
        </html>
    `;
}

export default function Billingpage() {
    const navigation = useNavigation();

    const [invoiceId] = useState(generateInvoiceId());
    const [issueDate, setIssueDate] = useState("");
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const [patientProfile, setPatientProfile] = useState({
        userName: "المريض",
        patientId: "غير متوفر",
    });

    const [aiPayload, setAiPayload] = useState(null);

    const [paymentForm, setPaymentForm] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    useEffect(() => {
        setIssueDate(formatArabicDate(new Date()));
        loadStoredData();
    }, []);

    const loadStoredData = async () => {
        try {
            setIsLoadingData(true);

            const patientRaw = await AsyncStorage.getItem("patient_profile");
            const aiRaw = await AsyncStorage.getItem("ai_result");

            if (patientRaw) {
                try {
                    const parsedPatient = JSON.parse(patientRaw);
                    setPatientProfile({
                        userName: parsedPatient.userName || "المريض",
                        patientId: parsedPatient.patientId || "غير متوفر",
                    });
                } catch {
                    setPatientProfile({
                        userName: "المريض",
                        patientId: "غير متوفر",
                    });
                }
            }

            if (aiRaw) {
                try {
                    const parsedAi = JSON.parse(aiRaw);
                    setAiPayload(parsedAi);
                } catch {
                    setAiPayload(null);
                }
            }
        } catch (error) {
            console.log("Storage read error:", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    const invoiceItems = useMemo(() => {
        return buildInvoiceItemsFromAiResult(aiPayload, 0.7);
    }, [aiPayload]);

    const summary = useMemo(() => {
        return getInvoiceSummary(invoiceItems);
    }, [invoiceItems]);

    const invoiceDetails = useMemo(() => {
        return {
            id: invoiceId,
            date: issueDate,
            status: paymentSuccess ? "paid" : "pending",
            patientName: patientProfile.userName,
            patientId: patientProfile.patientId,
            insuranceProvider: "شركة التأمين الوطنية",
            insuranceCoverageLabel: "تغطية 70%",
            insuranceStatus: "تأمين فعال (Active)",
            items: invoiceItems,
            summary,
        };
    }, [invoiceId, issueDate, patientProfile, invoiceItems, summary, paymentSuccess]);

    const handleOpenPaymentModal = () => {
        if (!invoiceDetails.items.length) return;
        setShowPaymentModal(true);
    };

    const handleClosePaymentModal = () => {
        if (isPaying) return;
        setShowPaymentModal(false);
    };

    const handlePaymentInputChange = (field, value) => {
        let finalValue = value;

        if (field === "cardNumber") {
            finalValue = formatCardNumber(value);
        }

        if (field === "expiry") {
            finalValue = formatExpiry(value);
        }

        if (field === "cvv") {
            finalValue = value.replace(/\D/g, "").slice(0, 3);
        }

        setPaymentForm((prev) => ({
            ...prev,
            [field]: finalValue,
        }));
    };

    const isPaymentFormValid =
        paymentForm.cardName.trim().length > 2 &&
        paymentForm.cardNumber.replace(/\s/g, "").length === 16 &&
        paymentForm.expiry.length === 5 &&
        paymentForm.cvv.length === 3;

    const handlePayment = () => {
        if (!isPaymentFormValid) return;

        setIsPaying(true);

        setTimeout(() => {
            setIsPaying(false);
            setPaymentSuccess(true);
            setShowPaymentModal(false);

            Alert.alert("تم", "تم الدفع بنجاح");
        }, 2000);
    };

    const handleDownload = async () => {
        if (!invoiceDetails.items.length) return;

        try {
            setIsDownloading(true);

            const html = buildInvoiceHtml(invoiceDetails, paymentSuccess);

            const { uri } = await Print.printToFileAsync({
                html,
            });

            const canShare = await Sharing.isAvailableAsync();

            if (canShare) {
                await Sharing.shareAsync(uri);
            } else {
                Alert.alert("تم", "تم إنشاء ملف PDF بنجاح");
            }
        } catch (error) {
            console.log("PDF download error:", error);
            Alert.alert("خطأ", "حدث خطأ أثناء إنشاء ملف PDF");
        } finally {
            setIsDownloading(false);
        }
    };

    const renderStatusIcon = () => {
        if (paymentSuccess) {
            return <CheckIcon width={24} height={24} />;
        }

        return <PendingIcon width={24} height={24} />;
    };

    const renderTableRows = () => {
        if (invoiceDetails.items.length === 0) {
            return (
                <View style={styles.emptyStateRow}>
                    <Text style={styles.emptyStateText}>
                        لا توجد فحوصات موصى بها حالياً لعرضها في الفاتورة.
                    </Text>
                </View>
            );
        }

        return invoiceDetails.items.map((item, index) => (
            <View key={`${item.name}-${index}`} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.procedureCell]}>
                    {item.name}
                </Text>

                <Text style={[styles.tableCell, styles.deptCell]}>
                    {item.dept}
                </Text>

                <Text style={[styles.tableCell, styles.costCell]}>
                    {item.cost}
                </Text>

                <Text style={[styles.tableCell, styles.coveredCell]}>
                    -{item.covered}
                </Text>

                <Text style={[styles.tableCell, styles.finalCell]}>
                    {item.final} ₪
                </Text>
            </View>
        ));
    };

    if (isLoadingData) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loaderWrapper}>
                    <ActivityIndicator size="large" color="#2563eb" />
                    <Text style={styles.loaderText}>جاري تحميل الفاتورة...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.headerBlurCircle} />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.backButton}
                        onPress={() => navigation.navigate("PatientDashboard")}
                    >
                        <Text style={styles.backButtonText}>العودة للوحة التحكم</Text>
                    </TouchableOpacity>

                    <View style={styles.headerTitleRow}>
                        <View style={styles.headerIconSlot}>
                            <Recipticon width={30} height={30} />
                        </View>

                        <View style={styles.headerTextWrapper}>
                            <Text style={styles.headerTitle}>كشف الحساب الطبي</Text>
                            <Text style={styles.headerSubtitle}>
                                فاتورة رقم {invoiceDetails.id}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.mainCard}>
                    <View
                        style={[
                            styles.statusSection,
                            paymentSuccess
                                ? styles.statusSectionPaid
                                : styles.statusSectionPending,
                        ]}
                    >
                        <View style={styles.statusInfo}>
                            <View
                                style={[
                                    styles.statusIconSlot,
                                    paymentSuccess
                                        ? styles.statusIconSlotPaid
                                        : styles.statusIconSlotPending,
                                ]}
                            >
                                {renderStatusIcon()}
                            </View>

                            <View style={styles.statusTextWrapper}>
                                <Text
                                    style={[
                                        styles.statusTitle,
                                        paymentSuccess
                                            ? styles.statusTitlePaid
                                            : styles.statusTitlePending,
                                    ]}
                                >
                                    {paymentSuccess
                                        ? "تم الدفع بنجاح"
                                        : "بانتظار الدفع"}
                                </Text>

                                <Text
                                    style={[
                                        styles.statusDescription,
                                        paymentSuccess
                                            ? styles.statusDescriptionPaid
                                            : styles.statusDescriptionPending,
                                    ]}
                                >
                                    {paymentSuccess
                                        ? "شكراً لك، تم تسوية رصيد هذه الفاتورة بالكامل."
                                        : "يرجى تسوية الرصيد المتبقي لإتمام الإجراءات."}
                                </Text>
                            </View>
                        </View>

                        {!paymentSuccess && (
                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={[
                                    styles.payButton,
                                    !invoiceDetails.items.length && styles.disabledButton,
                                ]}
                                onPress={handleOpenPaymentModal}
                                disabled={!invoiceDetails.items.length}
                            >
                                <Text style={styles.payButtonText}>
                                    {`دفع الآن (${invoiceDetails.summary.patientShare} ₪)`}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.cardBody}>
                        <View style={styles.infoColumn}>
                            <View style={styles.infoBlock}>
                                <Text style={styles.infoLabel}>المريض</Text>
                                <Text style={styles.infoValue}>
                                    {invoiceDetails.patientName}
                                </Text>
                                <Text style={styles.infoSubtext}>
                                    رقم الملف: {invoiceDetails.patientId}
                                </Text>
                            </View>

                            <View style={styles.infoBlock}>
                                <Text style={styles.infoLabel}>التغطية التأمينية</Text>

                                <View style={styles.insuranceLine}>
                                    <View style={styles.insuranceIconSlot}>
                                        <Sheildicon width={20} height={20} />
                                    </View>

                                    <Text style={styles.infoValue}>
                                        {invoiceDetails.insuranceProvider} (
                                        {invoiceDetails.insuranceCoverageLabel})
                                    </Text>
                                </View>

                                <View style={styles.insuranceBadge}>
                                    <Text style={styles.insuranceBadgeText}>
                                        {invoiceDetails.insuranceStatus}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.infoBlock}>
                                <Text style={styles.infoLabel}>تاريخ الإصدار</Text>
                                <Text style={styles.infoValue}>
                                    {invoiceDetails.date}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.detailsSection}>
                            <Text style={styles.detailsTitle}>تفاصيل الطلبية</Text>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.tableScrollContent}
                            >
                                <View style={styles.tableWrapper}>
                                    <View style={styles.tableHeader}>
                                        <Text style={[styles.tableHeaderCell, styles.procedureCell]}>
                                            الإجراء الطبي
                                        </Text>

                                        <Text style={[styles.tableHeaderCell, styles.deptCell]}>
                                            القسم
                                        </Text>

                                        <Text style={[styles.tableHeaderCell, styles.costCell]}>
                                            التكلفة (₪)
                                        </Text>

                                        <Text style={[styles.tableHeaderCell, styles.coveredCell]}>
                                            تغطية التأمين
                                        </Text>

                                        <Text style={[styles.tableHeaderCell, styles.finalCell]}>
                                            المطلوب دفعه
                                        </Text>
                                    </View>

                                    {renderTableRows()}
                                </View>
                            </ScrollView>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.summaryWrapper}>
                            <View style={styles.summaryCard}>
                                <View style={styles.summaryLine}>
                                    <Text style={styles.summaryLineText}>
                                        إجمالي التكلفة قبل التأمين
                                    </Text>

                                    <Text style={styles.summaryLineText}>
                                        {invoiceDetails.summary.total} ₪
                                    </Text>
                                </View>

                                <View style={styles.summaryLine}>
                                    <Text style={styles.summaryLineGreenText}>
                                        إجمالي تغطية التأمين (70%)
                                    </Text>

                                    <Text style={styles.summaryLineGreenText}>
                                        -{invoiceDetails.summary.insuranceCovered} ₪
                                    </Text>
                                </View>

                                <View style={styles.summaryInnerSeparator} />

                                <View style={styles.summaryTotal}>
                                    <Text style={styles.summaryTotalLabel}>
                                        الرصيد المستحق الدفع
                                    </Text>

                                    <Text style={styles.summaryTotalValue}>
                                        {invoiceDetails.summary.patientShare} ₪
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardFooter}>
                        <Text style={styles.footerNote}>
                            الأسعار الحالية تقديرية ومهيأة للربط لاحقاً مع قاعدة البيانات.
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={[
                                styles.downloadButton,
                                (isDownloading || !invoiceDetails.items.length) &&
                                    styles.disabledButton,
                            ]}
                            onPress={handleDownload}
                            disabled={isDownloading || !invoiceDetails.items.length}
                        >
                            <Text style={styles.downloadButtonText}>
                                {isDownloading ? "جاري التحميل..." : "تحميل PDF"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <Modal
                visible={showPaymentModal}
                transparent
                animationType="fade"
                onRequestClose={handleClosePaymentModal}
            >
                <Pressable style={styles.modalOverlay} onPress={handleClosePaymentModal}>
                    <Pressable style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>الدفع الإلكتروني</Text>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.modalCloseButton}
                                onPress={handleClosePaymentModal}
                            >
                                <Text style={styles.modalCloseButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>
                            <View style={styles.modalSummary}>
                                <Text style={styles.modalSummaryLabel}>المبلغ المطلوب</Text>
                                <Text style={styles.modalSummaryValue}>
                                    {invoiceDetails.summary.patientShare} ₪
                                </Text>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>اسم حامل البطاقة</Text>
                                <TextInput
                                    value={paymentForm.cardName}
                                    onChangeText={(value) =>
                                        handlePaymentInputChange("cardName", value)
                                    }
                                    placeholder="أدخل اسم حامل البطاقة"
                                    placeholderTextColor="#94a3b8"
                                    style={styles.input}
                                    textAlign="right"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>رقم البطاقة</Text>
                                <TextInput
                                    value={paymentForm.cardNumber}
                                    onChangeText={(value) =>
                                        handlePaymentInputChange("cardNumber", value)
                                    }
                                    placeholder="1234 5678 9012 3456"
                                    placeholderTextColor="#94a3b8"
                                    style={styles.input}
                                    keyboardType="numeric"
                                    textAlign="left"
                                />
                            </View>

                            <View style={styles.formRow}>
                                <View style={styles.formHalf}>
                                    <Text style={styles.formLabel}>تاريخ الانتهاء</Text>
                                    <TextInput
                                        value={paymentForm.expiry}
                                        onChangeText={(value) =>
                                            handlePaymentInputChange("expiry", value)
                                        }
                                        placeholder="MM/YY"
                                        placeholderTextColor="#94a3b8"
                                        style={styles.input}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>

                                <View style={styles.formHalf}>
                                    <Text style={styles.formLabel}>CVV</Text>
                                    <TextInput
                                        value={paymentForm.cvv}
                                        onChangeText={(value) =>
                                            handlePaymentInputChange("cvv", value)
                                        }
                                        placeholder="***"
                                        placeholderTextColor="#94a3b8"
                                        style={styles.input}
                                        keyboardType="numeric"
                                        secureTextEntry
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={[
                                    styles.cancelButton,
                                    isPaying && styles.disabledButton,
                                ]}
                                onPress={handleClosePaymentModal}
                                disabled={isPaying}
                            >
                                <Text style={styles.cancelButtonText}>إلغاء</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={[
                                    styles.confirmButton,
                                    (!isPaymentFormValid || isPaying) &&
                                        styles.disabledButton,
                                ]}
                                onPress={handlePayment}
                                disabled={!isPaymentFormValid || isPaying}
                            >
                                <Text style={styles.confirmButtonText}>
                                    {isPaying ? "جاري تنفيذ الدفع..." : "تأكيد الدفع"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}