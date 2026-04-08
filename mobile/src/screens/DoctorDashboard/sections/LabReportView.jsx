import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import styles from "./LabReportViewStyle";

const mockReports = {
    1: {
        reportTitle: "التقرير الطبي الشامل",
        reportSubtitle: "فحص تخطيط القلب والبيانات السريرية",
        patient: {
            fullName: "سارة محمد علي",
            medicalId: "#12944",
            genderAge: "أنثى، 45 عاماً",
            birthDate: "15 مايو 1978",
        },
        examInfo: {
            examDate: "16 مارس 2026",
            labName: "قسم القلب",
            caseStatus: "مكتمل",
        },
        resultCards: [
            {
                id: 1,
                name: "معدل نبض القلب",
                statusLabel: "حرج",
                statusType: "critical",
                value: "122",
                unit: "bpm",
                normalRange: "60-100",
                icon: "warning",
            },
            {
                id: 2,
                name: "ارتفاع مقطع ST",
                statusLabel: "مرتفع",
                statusType: "warning",
                value: "موجود",
                unit: "",
                normalRange: "غير موجود",
                icon: "warning",
            },
        ],
        notes: [
            "أظهر التخطيط وجود ارتفاع في مقطع ST مما يستدعي المتابعة الفورية.",
            "معدل ضربات القلب أعلى من المعدل الطبيعي.",
            "التوصية: تقييم قلبي عاجل وربط النتائج بالأعراض السريرية الحالية.",
        ],
        recommendations: {
            lifestyle: [
                "تقليل الجهد البدني إلى حين مراجعة الطبيب المختص.",
                "الالتزام بالأدوية الموصوفة إن وجدت.",
            ],
            followUp: [
                "مراجعة طبيب القلب بشكل عاجل.",
                "إعادة التخطيط أو استكمال الفحوصات حسب التقييم السريري.",
            ],
        },
        doctor: {
            name: "د. سامي خالد",
            specialty: "أخصائي أمراض القلب والأوعية الدموية",
            date: "16 مارس 2026",
            time: "14:30",
        },
    },

    2: {
        reportTitle: "التقرير الطبي الشامل",
        reportSubtitle: "فحص إنزيمات القلب",
        patient: {
            fullName: "سارة محمد علي",
            medicalId: "#12944",
            genderAge: "أنثى، 45 عاماً",
            birthDate: "15 مايو 1978",
        },
        examInfo: {
            examDate: "16 مارس 2026",
            labName: "المختبر المركزي",
            caseStatus: "قيد الانتظار",
        },
        resultCards: [],
        notes: [
            "لم تصدر النتائج النهائية بعد.",
            "الحالة الحالية: قيد المعالجة داخل المختبر.",
        ],
        recommendations: {
            lifestyle: [],
            followUp: ["انتظار صدور النتائج النهائية ومراجعة الطبيب عند توفرها."],
        },
        doctor: {
            name: "د. سامي خالد",
            specialty: "أخصائي أمراض القلب والأوعية الدموية",
            date: "16 مارس 2026",
            time: "14:30",
        },
    },
};

const LabReportView = () => {
    const router = useRouter();
    const { id, reportData } = useLocalSearchParams();

    let parsedReport = null;

    try {
        parsedReport = reportData ? JSON.parse(reportData) : null;
    } catch (e) {
        parsedReport = null;
    }

    const finalReportData = parsedReport || mockReports[id];

    const getCardStyle = (statusType) => {
        switch (statusType) {
            case "normal":
                return styles.resultCardNormal;
            case "warning":
                return styles.resultCardWarning;
            case "critical":
                return styles.resultCardCritical;
            case "pending":
                return styles.resultCardPending;
            default:
                return styles.resultCardNormal;
        }
    };

    const getBadgeStyle = (statusType) => {
        switch (statusType) {
            case "normal":
                return styles.badgeNormal;
            case "warning":
                return styles.badgeWarning;
            case "critical":
                return styles.badgeCritical;
            case "pending":
                return styles.badgePending;
            default:
                return styles.badgePending;
        }
    };

    if (!finalReportData) {
        return (
            <View style={styles.emptyPage}>
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyTitle}>لا توجد بيانات تقرير</Text>
                    <Text style={styles.emptyText}>
                        لم يتم العثور على تقرير مطابق لهذا المعرّف.
                    </Text>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.backButtonText}>العودة</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const {
        reportTitle,
        reportSubtitle,
        patient,
        examInfo,
        resultCards = [],
        notes = [],
        recommendations = {},
        doctor,
    } = finalReportData;

    return (
        <View style={styles.page}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={styles.topBackButton}
                    onPress={() => router.back()}
                    activeOpacity={0.88}
                >
                    <Text style={styles.topBackButtonText}>العودة</Text>
                </TouchableOpacity>

                <View style={styles.reportCard}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            {reportTitle || "التقرير الطبي الشامل"}
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            {reportSubtitle || `تفاصيل التقرير رقم ${id}`}
                        </Text>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>بيانات المريض</Text>

                            <View style={styles.gridTwo}>
                                <View style={styles.infoCard}>
                                    <Text style={styles.infoLabel}>الاسم الكامل</Text>
                                    <Text style={styles.infoValue}>
                                        {patient?.fullName || "-"}
                                    </Text>
                                </View>

                                <View style={styles.infoCard}>
                                    <Text style={styles.infoLabel}>رقم السجل الطبي</Text>
                                    <Text style={styles.infoValue}>
                                        {patient?.medicalId || "-"}
                                    </Text>
                                </View>

                                <View style={styles.infoCard}>
                                    <Text style={styles.infoLabel}>تاريخ الميلاد</Text>
                                    <Text style={styles.infoValue}>
                                        {patient?.birthDate || "-"}
                                    </Text>
                                </View>

                                <View style={styles.infoCard}>
                                    <Text style={styles.infoLabel}>الجنس والعمر</Text>
                                    <Text style={styles.infoValue}>
                                        {patient?.genderAge || "-"}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>معلومات الفحص</Text>

                            <View style={styles.gridThree}>
                                <View style={styles.infoCard}>
                                    <Text style={styles.infoLabelBlue}>تاريخ الفحص</Text>
                                    <Text style={styles.infoValueBlue}>
                                        {examInfo?.examDate || "-"}
                                    </Text>
                                </View>

                                <View style={styles.infoCard}>
                                    <Text style={styles.infoLabelBlue}>المختبر / القسم</Text>
                                    <Text style={styles.infoValueBlue}>
                                        {examInfo?.labName || "-"}
                                    </Text>
                                </View>

                                <View style={styles.infoCard}>
                                    <Text style={styles.infoLabel}>الحالة</Text>
                                    <View style={styles.examStatusBox}>
                                        <Text style={styles.examStatusText}>
                                            {examInfo?.caseStatus || "-"}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>نتائج التحليل</Text>

                            {resultCards.length > 0 ? (
                                <View style={styles.resultsList}>
                                    {resultCards.map((result) => (
                                        <View
                                            key={result.id}
                                            style={[styles.resultCard, getCardStyle(result.statusType)]}
                                        >
                                            <View style={styles.resultTopLine}>
                                                <Text style={styles.resultName}>
                                                    {result.name}
                                                </Text>

                                                <View
                                                    style={[styles.badge, getBadgeStyle(result.statusType)]}
                                                >
                                                    <Text style={styles.badgeText}>
                                                        {result.statusLabel}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.resultContent}>
                                                <View style={styles.resultMetaColumn}>
                                                    <Text style={styles.resultMetaLabel}>القيمة</Text>
                                                    <Text style={styles.resultMetaValue}>
                                                        {result.value}{" "}
                                                        {result.unit ? (
                                                            <Text style={styles.resultUnit}>
                                                                {result.unit}
                                                            </Text>
                                                        ) : null}
                                                    </Text>
                                                </View>

                                                <View style={styles.resultMetaColumn}>
                                                    <Text style={styles.resultMetaLabel}>
                                                        النطاق الطبيعي
                                                    </Text>
                                                    <Text style={styles.resultMetaValue}>
                                                        {result.normalRange || "-"}
                                                    </Text>
                                                </View>

                                                <View style={styles.resultIconWrap}>
                                                    <Text style={styles.resultIcon}>
                                                        {result.icon === "warning" ? "⚠" : "✓"}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <View style={styles.emptyStateBox}>
                                    <Text style={styles.emptyStateText}>
                                        لا توجد نتائج تفصيلية متاحة حالياً لهذا التقرير.
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.section}>
                            <View style={styles.notesBox}>
                                <Text style={styles.sectionTitleAlt}>ملاحظات الطبيب</Text>

                                {notes.length > 0 ? (
                                    notes.map((note, index) => (
                                        <View key={index} style={styles.listItemRow}>
                                            <Text style={styles.listBullet}>•</Text>
                                            <Text style={styles.notesText}>{note}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.notesText}>لا توجد ملاحظات مضافة.</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>التوصيات</Text>

                            <View style={styles.recommendationsGrid}>
                                <View style={[styles.recommendationCard, styles.recommendationGreen]}>
                                    <Text style={styles.recommendationTitle}>نمط الحياة</Text>

                                    {recommendations?.lifestyle?.length ? (
                                        recommendations.lifestyle.map((item, index) => (
                                            <View key={index} style={styles.listItemRow}>
                                                <Text style={styles.listBulletGreen}>•</Text>
                                                <Text style={styles.recommendationGreenText}>
                                                    {item}
                                                </Text>
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={styles.recommendationGreenText}>
                                            لا توجد توصيات حالياً.
                                        </Text>
                                    )}
                                </View>

                                <View style={[styles.recommendationCard, styles.recommendationBlue]}>
                                    <Text style={styles.recommendationTitleBlue}>المتابعة</Text>

                                    {recommendations?.followUp?.length ? (
                                        recommendations.followUp.map((item, index) => (
                                            <View key={index} style={styles.listItemRow}>
                                                <Text style={styles.listBulletBlue}>•</Text>
                                                <Text style={styles.recommendationBlueText}>
                                                    {item}
                                                </Text>
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={styles.recommendationBlueText}>
                                            لا توجد توصيات متابعة حالياً.
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>

                        <View style={[styles.section, styles.signatureSection]}>
                            <View style={styles.signatureBox}>
                                <Text style={styles.signatureLabel}>توقيع الطبيب</Text>
                                <View style={styles.signatureLine} />
                                <Text style={styles.signatureName}>{doctor?.name || "-"}</Text>
                                <Text style={styles.signatureMeta}>
                                    {doctor?.specialty || "-"}
                                </Text>
                                <Text style={styles.signatureMeta}>الختم الرسمي للمستشفى</Text>
                            </View>

                            <View style={styles.signatureBox}>
                                <Text style={styles.signatureLabel}>تاريخ التوقيع</Text>
                                <View style={styles.signatureLine} />
                                <Text style={styles.signatureName}>{doctor?.date || "-"}</Text>
                                <Text style={styles.signatureMeta}>
                                    الساعة: {doctor?.time || "-"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.actionsRow}>
                    <TouchableOpacity
                        style={styles.secondaryBtn}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.secondaryBtnText}>مراجعة المريض</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryBtn}>
                        <Text style={styles.primaryBtnText}>طباعة</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default LabReportView;