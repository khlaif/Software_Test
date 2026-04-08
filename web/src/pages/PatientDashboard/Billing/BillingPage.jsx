import React, { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./BillingPage.css";

import recipticon from "../../../assets/receipt.svg"
import checkIcon from "../../../assets/check.svg";
import pendingIcon from "../../../assets/clock_g.svg";
import sheildicon from "../../../assets/shield-check.svg"


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

export default function BillingPage() {
    const invoiceRef = useRef(null);

    const [invoiceId] = useState(generateInvoiceId());
    const [issueDate, setIssueDate] = useState("");
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [paymentForm, setPaymentForm] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    useEffect(() => {
        setIssueDate(formatArabicDate(new Date()));
    }, []);

    const patientProfile = useMemo(() => {
        const raw = localStorage.getItem("patient_profile");

        if (!raw) {
            return {
                userName: "المريض",
                patientId: "غير متوفر",
            };
        }

        try {
            const parsed = JSON.parse(raw);
            return {
                userName: parsed.userName || "المريض",
                patientId: parsed.patientId || "غير متوفر",
            };
        } catch {
            return {
                userName: "المريض",
                patientId: "غير متوفر",
            };
        }
    }, []);

    const aiPayload = useMemo(() => {
        const raw = localStorage.getItem("ai_result");

        if (!raw) return null;

        try {
            return JSON.parse(raw);
        } catch {
            return null;
        }
    }, []);

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
        }, 2000);
    };

    const handleDownload = async () => {
        if (!invoiceRef.current) return;

        try {
            setIsDownloading(true);

            const canvas = await html2canvas(invoiceRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth - 10;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (imgHeight <= pageHeight - 10) {
                pdf.addImage(imgData, "PNG", 5, 5, imgWidth, imgHeight);
            } else {
                let heightLeft = imgHeight;
                let position = 5;

                pdf.addImage(imgData, "PNG", 5, position, imgWidth, imgHeight);
                heightLeft -= pageHeight - 10;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight + 5;
                    pdf.addPage();
                    pdf.addImage(imgData, "PNG", 5, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight - 10;
                }
            }

            pdf.save(`${invoiceDetails.id}.pdf`);
        } catch (error) {
            console.error("PDF download error:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="billing-page" dir="rtl">
            <header className="billing-header">
                <div className="billing-header-blur">
                    <div className="billing-header-blur-circle"></div>
                </div>

                <div className="billing-header-container">
                    <button
                        type="button"
                        className="billing-back-btn"
                        onClick={() => window.history.back()}
                    >
                        <span className="billing-back-text">
                            العودة للوحة التحكم
                        </span>
                        <span className="billing-back-arrow">
                            
                        </span>
                    </button>

                    <div className="billing-header-title-row">
                        <div className="billing-header-icon-slot">
                            <img src={recipticon} alt="Receipt" />
                        </div>

                        <div className="billing-header-text">
                            <h1>كشف الحساب الطبي</h1>
                            <p>فاتورة رقم {invoiceDetails.id}</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="billing-main">
                <div ref={invoiceRef} className="billing-card">
                    <div
                        className={`billing-status-section ${
                            paymentSuccess
                                ? "billing-status-section--paid"
                                : "billing-status-section--pending"
                        }`}
                    >
                        <div className="billing-status-info">
                            <div
                                className={`billing-status-icon-slot ${
                                    paymentSuccess
                                        ? "billing-status-icon-slot--paid"
                                        : "billing-status-icon-slot--pending"
                                }`}
                            >
                                {paymentSuccess ? (
                                    <img
                                        src={checkIcon}
                                        alt="Paid"
                                        className="billing-status-icon billing-status-icon--paid"
                                    />
                                ) : (
                                    <img
                                        src={pendingIcon}
                                        alt="Pending"
                                        className="billing-status-icon billing-status-icon--pending"
                                    />
                                )}

                            </div>

                            <div className="billing-status-text">
                                <h3>
                                    {paymentSuccess
                                        ? "تم الدفع بنجاح"
                                        : "بانتظار الدفع"}
                                </h3>

                                <p>
                                    {paymentSuccess
                                        ? "شكراً لك، تم تسوية رصيد هذه الفاتورة بالكامل."
                                        : "يرجى تسوية الرصيد المتبقي لإتمام الإجراءات."}
                                </p>
                            </div>
                        </div>

                        {!paymentSuccess && (
                            <button
                                type="button"
                                className="billing-pay-btn"
                                onClick={handleOpenPaymentModal}
                                disabled={!invoiceDetails.items.length}
                            >
                                {`دفع الآن (${invoiceDetails.summary.patientShare} ₪)`}
                            </button>
                        )}
                    </div>

                    <div className="billing-card-body">
                        <div className="billing-info-row">
                            <div className="billing-info-block">
                                <p className="billing-info-label">المريض</p>
                                <p className="billing-info-value">
                                    {invoiceDetails.patientName}
                                </p>
                                <p className="billing-info-subtext">
                                    رقم الملف: {invoiceDetails.patientId}
                                </p>
                            </div>

                            <div className="billing-info-block">
                                <p className="billing-info-label">
                                    التغطية التأمينية
                                </p>

                                <div className="billing-insurance-line">
                                    <div className="billing-insurance-icon-slot">
                                        <img src={sheildicon} alt="Insurance" />  
                                    </div>

                                    <p className="billing-info-value billing-info-value--insurance">
                                        {invoiceDetails.insuranceProvider} (
                                        {invoiceDetails.insuranceCoverageLabel})
                                    </p>
                                </div>

                                <div className="billing-insurance-badge">
                                    {invoiceDetails.insuranceStatus}
                                </div>
                            </div>

                            <div className="billing-info-block billing-info-block--date">
                                <p className="billing-info-label">
                                    تاريخ الإصدار
                                </p>
                                <p className="billing-info-value">
                                    {invoiceDetails.date}
                                </p>
                            </div>
                        </div>

                        <div className="billing-separator"></div>

                        <div className="billing-details-section">
                            <h4 className="billing-details-title">
                                تفاصيل الطلبية
                            </h4>

                            <div className="billing-table-wrapper">
                                <table className="billing-table">
                                    <thead>
                                        <tr>
                                            <th>الإجراء الطبي</th>
                                            <th>القسم</th>
                                            <th className="billing-table-left">
                                                التكلفة (₪)
                                            </th>
                                            <th className="billing-table-left billing-table-green">
                                                تغطية التأمين
                                            </th>
                                            <th className="billing-table-left billing-table-dark">
                                                المطلوب دفعه
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {invoiceDetails.items.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="billing-empty-cell">
                                                    لا توجد فحوصات موصى بها حالياً لعرضها في الفاتورة.
                                                </td>
                                            </tr>
                                        ) : (
                                            invoiceDetails.items.map((item, index) => (
                                                <tr key={`${item.name}-${index}`}>
                                                    <td className="billing-procedure-name">
                                                        {item.name}
                                                    </td>

                                                    <td className="billing-dept-name">
                                                        {item.dept}
                                                    </td>

                                                    <td className="billing-table-left billing-cost-text">
                                                        {item.cost}
                                                    </td>

                                                    <td className="billing-table-left billing-covered-text">
                                                        -{item.covered}
                                                    </td>

                                                    <td className="billing-table-left billing-final-text">
                                                        {item.final} ₪
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="billing-separator"></div>

                        <div className="billing-summary-wrapper">
                            <div className="billing-summary-card">
                                <div className="billing-summary-line">
                                    <span>إجمالي التكلفة قبل التأمين</span>
                                    <span>{invoiceDetails.summary.total} ₪</span>
                                </div>

                                <div className="billing-summary-line billing-summary-line--green">
                                    <span>إجمالي تغطية التأمين (70%)</span>
                                    <span>
                                        -{invoiceDetails.summary.insuranceCovered} ₪
                                    </span>
                                </div>

                                <div className="billing-summary-inner-separator"></div>

                                <div className="billing-summary-total">
                                    <span className="billing-summary-total-label">
                                        الرصيد المستحق الدفع
                                    </span>

                                    <span className="billing-summary-total-value">
                                        {invoiceDetails.summary.patientShare} ₪
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="billing-card-footer">
                        <p className="billing-footer-note">
                            الأسعار الحالية تقديرية ومهيأة للربط لاحقاً مع قاعدة البيانات.
                        </p>

                        <button
                            type="button"
                            className="billing-download-btn"
                            onClick={handleDownload}
                            disabled={isDownloading || !invoiceDetails.items.length}
                        >
                            {isDownloading ? "جاري التحميل..." : "تحميل PDF"}
                        </button>
                    </div>
                </div>
            </main>

            {showPaymentModal && (
                <div className="billing-modal-overlay" onClick={handleClosePaymentModal}>
                    <div
                        className="billing-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="billing-modal-header">
                            <h3>الدفع الإلكتروني</h3>

                            <button
                                type="button"
                                className="billing-modal-close"
                                onClick={handleClosePaymentModal}
                            >
                                ×
                            </button>
                        </div>

                        <div className="billing-modal-body">
                            <div className="billing-modal-summary">
                                <span>المبلغ المطلوب</span>
                                <strong>{invoiceDetails.summary.patientShare} ₪</strong>
                            </div>

                            <div className="billing-form-group">
                                <label>اسم حامل البطاقة</label>
                                <input
                                    type="text"
                                    value={paymentForm.cardName}
                                    onChange={(e) =>
                                        handlePaymentInputChange("cardName", e.target.value)
                                    }
                                    placeholder="أدخل اسم حامل البطاقة"
                                />
                            </div>

                            <div className="billing-form-group">
                                <label>رقم البطاقة</label>
                                <input
                                    type="text"
                                    value={paymentForm.cardNumber}
                                    onChange={(e) =>
                                        handlePaymentInputChange("cardNumber", e.target.value)
                                    }
                                    placeholder="1234 5678 9012 3456"
                                    inputMode="numeric"
                                />
                            </div>

                            <div className="billing-form-row">
                                <div className="billing-form-group">
                                    <label>تاريخ الانتهاء</label>
                                    <input
                                        type="text"
                                        value={paymentForm.expiry}
                                        onChange={(e) =>
                                            handlePaymentInputChange("expiry", e.target.value)
                                        }
                                        placeholder="MM/YY"
                                        inputMode="numeric"
                                    />
                                </div>

                                <div className="billing-form-group">
                                    <label>CVV</label>
                                    <input
                                        type="password"
                                        value={paymentForm.cvv}
                                        onChange={(e) =>
                                            handlePaymentInputChange("cvv", e.target.value)
                                        }
                                        placeholder="***"
                                        inputMode="numeric"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="billing-modal-footer">
                            <button
                                type="button"
                                className="billing-modal-cancel"
                                onClick={handleClosePaymentModal}
                                disabled={isPaying}
                            >
                                إلغاء
                            </button>

                            <button
                                type="button"
                                className="billing-modal-confirm"
                                onClick={handlePayment}
                                disabled={!isPaymentFormValid || isPaying}
                            >
                                {isPaying ? "جاري تنفيذ الدفع..." : "تأكيد الدفع"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}