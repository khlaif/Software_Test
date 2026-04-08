import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "../DoctorDashboardStyle";

const reports = [
    {
        id: 1,
        title: "تخطيط القلب (ECG)",
        value: "ST-Elevation",
        status: "مكتمل",
        statusType: "done",
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
        ],
        recommendations: {
            lifestyle: ["تقليل الجهد البدني إلى حين مراجعة الطبيب المختص."],
            followUp: ["مراجعة طبيب القلب بشكل عاجل."],
        },
        doctor: {
            name: "د. سامي خالد",
            specialty: "أخصائي أمراض القلب والأوعية الدموية",
            date: "16 مارس 2026",
            time: "14:30",
        },
    },
    {
        id: 2,
        title: "إنزيمات القلب",
        value: "--",
        status: "قيد الانتظار",
        statusType: "pending",
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
];

const LabResultsTab = () => {
    const [activeTab] = useState("lab");
    const router = useRouter();

    const openReport = (report) => {
        router.push({
            pathname: "/LabReportView",
            params: {
                reportData: JSON.stringify(report),
                id: String(report.id),
            },
        });
    };

    if (activeTab !== "lab") return null;

    return (
        <View style={styles.tabContentCard}>
            <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>النتائج المخبرية</Text>
                <Text style={styles.sectionBadge}>{reports.length} تقارير</Text>
            </View>

            <View style={styles.labResultsGrid}>
                {reports.map((report) => (
                    <View key={report.id} style={styles.labResultCard}>
                        <View style={styles.labResultMain}>
                            <View style={styles.labResultRight}>
                                <Text style={styles.labResultTitle}>{report.title}</Text>

                                <View
                                    style={[
                                        styles.labResultStatusBadge,
                                        report.statusType === "done"
                                            ? styles.labResultStatusDone
                                            : styles.labResultStatusPending,
                                    ]}
                                >
                                    <Text style={styles.labResultStatusText}>
                                        {report.status}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.labResultLeft}>
                                <Text
                                    style={[
                                        styles.labResultValue,
                                        report.statusType === "done"
                                            ? styles.labResultValueDanger
                                            : styles.labResultValueMuted,
                                    ]}
                                >
                                    {report.value}
                                </Text>

                                <TouchableOpacity
                                    style={styles.labReportLink}
                                    activeOpacity={0.88}
                                    onPress={() => openReport(report)}
                                >
                                    <Text style={styles.labReportLinkText}>عرض التقرير</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default LabResultsTab;