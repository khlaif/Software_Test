import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Modal,
    Pressable,
    Dimensions,
} from "react-native";
import styles from "./DoctorDashboardStyle";
import OfficeHoursTab from "./sections/OfficeHoursTab";
import DiagnosisNotesTab from "./sections/DiagnosisNotesTab";
import LabResultsTab from "./sections/LabResultsTab";

import Doctoricon from "../../../assets/images/stethoscope_w.svg";
import Usericon from "../../../assets/images/user.svg";

const DoctorDashboard = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState("home");
    const [searchTerm, setSearchTerm] = useState("");
    const [showMedicalHistory, setShowMedicalHistory] = useState(false);
    const [showSideTabs, setShowSideTabs] = useState(false);

    const screenWidth = Dimensions.get("window").width;
    const sidePanelWidth = screenWidth > 900 ? screenWidth * 0.3 : screenWidth * 0.78;

    const tabs = [
        { id: "home", label: "الصفحة الرئيسية" },
        { id: "lab", label: "النتائج المخبرية" },
        { id: "notes", label: "ملاحظات التشخيص" },
        { id: "consultation", label: "الاستشارات عن بعد" },
        { id: "schedule", label: "الساعات المكتبية" },
    ];

    const initialPatients = [
        {
            id: 1,
            name: "سارة محمد",
            age: 45,
            gender: "أنثى",
            recordNumber: "1294/4#",
            status: "حالة حرجة",
            statusType: "danger",
            condition: "ضيق تنفس حاد",
            badge: "حالة طارئة",
            badgeType: "danger",
            waitTime: "5m",
            isCompleted: false,
            vitals: [
                { id: 1, label: "ضغط الدم", value: "140/90", type: "danger" },
                { id: 2, label: "النبض", value: "110 bpm", type: "danger" },
                { id: 3, label: "الأكسجين", value: "92%", type: "warning" },
                { id: 4, label: "الحرارة", value: "37.2°C", type: "success" },
            ],
            aiRecommendations: {
                risk: { title: "قصور تنفسي", percentage: 85 },
                urgentTests: ["غازات الدم الشرياني", "تصوير مقطعي CT"],
            },
            labResults: [
                {
                    id: 1,
                    testName: "تخطيط القلب ECG",
                    resultValue: "ST-Elevation",
                    status: "مكتمل",
                    resultType: "critical",
                },
                {
                    id: 2,
                    testName: "إنزيمات القلب",
                    resultValue: "--",
                    status: "قيد الانتظار",
                    resultType: "pending",
                },
            ],
            medicalHistory: {
                lastVisit: "12 يناير 2026",
                surgeriesCount: "2 عمليات سابقة",
                timeline: [
                    {
                        id: 1,
                        title: "عملية قسطرة قلبية",
                        date: "2025-11-20",
                        hospital: "مستشفى النجاح",
                    },
                    {
                        id: 2,
                        title: "فحص دوري شامل",
                        date: "2025-05-15",
                        hospital: "مستشفى المقاصد",
                    },
                ],
            },
        },
        {
            id: 2,
            name: "ياسين علي",
            age: 37,
            gender: "ذكر",
            recordNumber: "2231/7#",
            status: "قيد المراجعة",
            statusType: "review",
            condition: "ألم في البطن",
            badge: "بانتظار الفحوصات",
            badgeType: "muted",
            waitTime: "20m",
            isCompleted: false,
            vitals: [
                { id: 1, label: "ضغط الدم", value: "125/82", type: "normal" },
                { id: 2, label: "النبض", value: "84 bpm", type: "normal" },
                { id: 3, label: "الأكسجين", value: "98%", type: "success" },
                { id: 4, label: "الحرارة", value: "36.9°C", type: "success" },
            ],
            aiRecommendations: {
                risk: { title: "اشتباه التهاب زائدة", percentage: 62 },
                urgentTests: ["تحليل CBC", "تصوير Ultrasound"],
            },
            labResults: [
                {
                    id: 1,
                    testName: "CBC",
                    resultValue: "WBC مرتفع",
                    status: "مكتمل",
                    resultType: "warning",
                },
                {
                    id: 2,
                    testName: "CRP",
                    resultValue: "--",
                    status: "قيد الانتظار",
                    resultType: "pending",
                },
            ],
            medicalHistory: {
                lastVisit: "03 فبراير 2026",
                surgeriesCount: "لا يوجد",
                timeline: [
                    {
                        id: 1,
                        title: "مراجعة ألم بطني سابق",
                        date: "2026-02-03",
                        hospital: "مستشفى النجاح",
                    },
                ],
            },
        },
        {
            id: 3,
            name: "ليلى حسن",
            age: 29,
            gender: "أنثى",
            recordNumber: "7782/3#",
            status: "جاهزة للمراجعة",
            statusType: "ready",
            condition: "متابعة دورية",
            badge: "جاهزة للمراجعة",
            badgeType: "light",
            waitTime: "1h",
            isCompleted: false,
            vitals: [
                { id: 1, label: "ضغط الدم", value: "118/76", type: "success" },
                { id: 2, label: "النبض", value: "72 bpm", type: "success" },
                { id: 3, label: "الأكسجين", value: "99%", type: "success" },
                { id: 4, label: "الحرارة", value: "36.7°C", type: "success" },
            ],
            aiRecommendations: {
                risk: { title: "استقرار عام", percentage: 18 },
                urgentTests: ["لا توجد فحوصات عاجلة"],
            },
            labResults: [
                {
                    id: 1,
                    testName: "سكر صائم",
                    resultValue: "طبيعي",
                    status: "مكتمل",
                    resultType: "normal",
                },
            ],
            medicalHistory: {
                lastVisit: "20 ديسمبر 2025",
                surgeriesCount: "1 عملية سابقة",
                timeline: [
                    {
                        id: 1,
                        title: "متابعة دورية",
                        date: "2025-12-20",
                        hospital: "المستشفى العربي التخصصي",
                    },
                ],
            },
        },
    ];

    const [waitingPatients, setWaitingPatients] = useState(initialPatients);
    const [currentPatient, setCurrentPatient] = useState(initialPatients[0] || null);

    const filteredPatients = useMemo(() => {
        return waitingPatients.filter(
            (item) =>
                item.name.includes(searchTerm) || item.condition.includes(searchTerm)
        );
    }, [waitingPatients, searchTerm]);

    const handleSelectPatient = (patient) => {
        setCurrentPatient(patient);
        setShowMedicalHistory(false);
    };

    const handleConfirmEndVisit = () => {
        if (!currentPatient || currentPatient.isCompleted) return;

        const updatedPatients = waitingPatients.map((item) =>
            item.id === currentPatient.id
                ? {
                      ...item,
                      status: "تمت المعاينة",
                      statusType: "completed",
                      badge: "تمت المعاينة",
                      badgeType: "completed",
                      isCompleted: true,
                  }
                : item
        );

        const sortedPatients = [
            ...updatedPatients.filter((item) => !item.isCompleted),
            ...updatedPatients.filter((item) => item.isCompleted),
        ];

        const nextActivePatient =
            sortedPatients.find((item) => !item.isCompleted) || sortedPatients[0] || null;

        setWaitingPatients(sortedPatients);
        setCurrentPatient(nextActivePatient);
    };

    const getStatusChipStyle = (type) => {
        switch (type) {
            case "danger":
                return styles.statusChipDanger;
            case "review":
                return styles.statusChipReview;
            case "ready":
                return styles.statusChipReady;
            case "completed":
                return styles.statusChipCompleted;
            default:
                return styles.statusChipDefault;
        }
    };

    const getVitalStyle = (type) => {
        switch (type) {
            case "danger":
                return styles.vitalDanger;
            case "warning":
                return styles.vitalWarning;
            case "success":
                return styles.vitalSuccess;
            case "normal":
                return styles.vitalNormal;
            default:
                return styles.vitalNormal;
        }
    };

    const renderMainContent = () => {
        if (activeTab === "home") {
            return (
                <>
                    <View style={styles.searchWrapper}>
                        <TextInput
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                            placeholder="بحث عن مريض بالاسم أو الحالة..."
                            placeholderTextColor="#94a3b8"
                            style={styles.searchInput}
                            textAlign="right"
                        />
                    </View>

                    <View style={styles.queueSection}>
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionTitle}>المرضى الحاليون</Text>
                            <Text style={styles.sectionBadge}>{filteredPatients.length} مرضى</Text>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.patientsScrollContent}
                        >
                            {filteredPatients.map((item) => {
                                const isActive = currentPatient?.id === item.id;

                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        activeOpacity={0.9}
                                        onPress={() => handleSelectPatient(item)}
                                        style={[
                                            styles.patientMiniCard,
                                            isActive && styles.patientMiniCardActive,
                                            item.isCompleted && styles.patientMiniCardCompleted,
                                        ]}
                                    >
                                        <View style={styles.patientMiniTop}>
                                            <Text style={styles.patientMiniName}>{item.name}</Text>
                                            <Text style={styles.patientMiniTime}>{item.waitTime}</Text>
                                        </View>

                                        <Text style={styles.patientMiniCondition}>
                                            {item.condition}
                                        </Text>

                                        <View
                                            style={[
                                                styles.miniBadge,
                                                getStatusChipStyle(item.statusType),
                                            ]}
                                        >
                                            <Text style={styles.miniBadgeText}>{item.badge}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {currentPatient ? (
                        <>
                            <View style={styles.currentPatientCard}>
                                <View style={styles.currentPatientTop}>
                                    <View style={styles.avatarBox}>
                                        <Usericon width={34} height={34} />
                                    </View>

                                    <View style={styles.currentPatientInfo}>
                                        <View style={styles.nameStatusRow}>
                                            <Text style={styles.currentPatientName}>
                                                {currentPatient.name}
                                            </Text>

                                            <View
                                                style={[
                                                    styles.statusChip,
                                                    getStatusChipStyle(currentPatient.statusType),
                                                ]}
                                            >
                                                <Text style={styles.statusChipText}>
                                                    {currentPatient.status}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text style={styles.currentPatientMeta}>
                                            {currentPatient.gender} • {currentPatient.age} عامًا
                                        </Text>

                                        <Text style={styles.currentPatientRecord}>
                                            رقم السجل: {currentPatient.recordNumber}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.actionsRow}>
                                    <TouchableOpacity
                                        style={styles.secondaryActionBtn}
                                        onPress={() => setShowMedicalHistory(true)}
                                    >
                                        <Text style={styles.secondaryActionText}>
                                            التاريخ الطبي
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.dangerActionBtn,
                                            currentPatient.isCompleted && styles.disabledBtn,
                                        ]}
                                        disabled={currentPatient.isCompleted}
                                        onPress={handleConfirmEndVisit}
                                    >
                                        <Text style={styles.dangerActionText}>
                                            إنهاء المعاينة
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.aiCard}>
                                <View style={styles.aiHeaderRow}>
                                    <Text style={styles.aiTitle}>توصيات MEDFLOW AI</Text>

                                    <View style={styles.aiBadge}>
                                        <Text style={styles.aiBadgeText}>تحليل مباشر</Text>
                                    </View>
                                </View>

                                <View style={styles.aiRiskBox}>
                                    <View style={styles.aiRiskHeader}>
                                        <Text style={styles.aiRiskLabel}>تحليل المخاطر</Text>
                                        <Text style={styles.aiRiskPercent}>
                                            {currentPatient.aiRecommendations?.risk?.percentage || 0}%
                                        </Text>
                                    </View>

                                    <Text style={styles.aiRiskValue}>
                                        {currentPatient.aiRecommendations?.risk?.title ||
                                            "لا توجد بيانات"}
                                    </Text>

                                    <View style={styles.progressTrack}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                {
                                                    width: `${
                                                        currentPatient.aiRecommendations?.risk
                                                            ?.percentage || 0
                                                    }%`,
                                                },
                                            ]}
                                        />
                                    </View>
                                </View>

                                <View style={styles.urgentTestsBox}>
                                    <Text style={styles.urgentTestsTitle}>
                                        الفحوصات العاجلة
                                    </Text>

                                    {currentPatient.aiRecommendations?.urgentTests?.map(
                                        (test, index) => (
                                            <View key={index} style={styles.urgentTestItem}>
                                                <Text style={styles.urgentTestBullet}>•</Text>
                                                <Text style={styles.urgentTestText}>{test}</Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>

                            <View style={styles.vitalsCard}>
                                <View style={styles.sectionHeaderRow}>
                                    <Text style={styles.sectionTitle}>المؤشرات الحيوية</Text>
                                    <Text style={styles.sectionBadge}>
                                        {currentPatient.vitals?.length || 0} عناصر
                                    </Text>
                                </View>

                                <View style={styles.vitalsGrid}>
                                    {currentPatient.vitals?.map((item) => (
                                        <View key={item.id} style={styles.vitalCard}>
                                            <Text style={styles.vitalLabel}>{item.label}</Text>
                                            <Text
                                                style={[
                                                    styles.vitalValue,
                                                    getVitalStyle(item.type),
                                                ]}
                                            >
                                                {item.value}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </>
                    ) : (
                        <View style={styles.contentPlaceholder}>
                            <Text style={styles.placeholderTitle}>لا يوجد مريض حالي</Text>
                            <Text style={styles.placeholderText}>
                                اختر مريضًا من قائمة الانتظار لعرض التفاصيل.
                            </Text>
                        </View>
                    )}
                </>
            );
        }

        if (activeTab === "lab") {
            return <LabResultsTab />;
        }

        if (activeTab === "notes") {
            return (
                <DiagnosisNotesTab
                    diagnosisData={{
                        initialDiagnosis: {
                            title: "اشتباه التهاب رئوي حاد",
                            symptoms:
                                "يعاني المريض من ضيق تنفس مع ارتفاع في معدل النبض وانخفاض نسبي في تشبع الأكسجين. يوصى بالمراقبة السريرية المستمرة وربط الحالة بنتائج الفحوصات المخبرية والشعاعية.",
                            severity: "high",
                        },
                        treatmentPlan: [
                            {
                                id: 1,
                                stepNumber: 1,
                                title: "خطة العلاج الموصى به",
                                note: "بدء العلاج الداعم، طلب فحوصات إضافية، وإعادة تقييم الحالة بعد استكمال النتائج.",
                            },
                        ],
                    }}
                />
            );
        }

        if (activeTab === "consultation") {
            return (
                <View style={styles.tabContentCard}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>الاستشارات عن بُعد</Text>
                        <Text style={styles.sectionBadge}>3 جلسات</Text>
                    </View>

                    <View style={styles.consultCard}>
                        <Text style={styles.consultPatient}>أحمد علي</Text>
                        <Text style={styles.consultMeta}>
                            اليوم • 02:00 م • متابعة ضغط الدم
                        </Text>
                        <TouchableOpacity style={styles.primaryMiniButton}>
                            <Text style={styles.primaryMiniButtonText}>بدء الجلسة</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.consultCard}>
                        <Text style={styles.consultPatient}>فاطمة محمود</Text>
                        <Text style={styles.consultMeta}>
                            اليوم • 03:30 م • استشارة أولية
                        </Text>
                        <TouchableOpacity style={styles.secondaryMiniButton}>
                            <Text style={styles.secondaryMiniButtonText}>عرض التفاصيل</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        if (activeTab === "schedule") {
            return <OfficeHoursTab />;
        }

        return null;
    };

    const renderMedicalHistoryModal = () => {
        if (!currentPatient) return null;

        return (
            <Modal
                visible={showMedicalHistory}
                transparent
                animationType="fade"
                onRequestClose={() => setShowMedicalHistory(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setShowMedicalHistory(false)}
                >
                    <Pressable
                        style={styles.medicalHistoryModalCard}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>التاريخ الطبي الكامل</Text>

                            <TouchableOpacity onPress={() => setShowMedicalHistory(false)}>
                                <Text style={styles.modalCloseText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalPatientName}>{currentPatient.name}</Text>

                        <View style={styles.historyStatsRow}>
                            <View style={styles.historyStatBox}>
                                <Text style={styles.historyStatLabel}>آخر زيارة</Text>
                                <Text style={styles.historyStatValue}>
                                    {currentPatient.medicalHistory?.lastVisit || "-"}
                                </Text>
                            </View>

                            <View style={styles.historyStatBox}>
                                <Text style={styles.historyStatLabel}>عدد العمليات</Text>
                                <Text style={styles.historyStatValue}>
                                    {currentPatient.medicalHistory?.surgeriesCount || "-"}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.timelineMainTitle}>التسلسل الزمني</Text>

                        <ScrollView
                            style={styles.modalTimelineScroll}
                            showsVerticalScrollIndicator={false}
                        >
                            {currentPatient.medicalHistory?.timeline?.map((item) => (
                                <View key={item.id} style={styles.timelineCard}>
                                    <View style={styles.timelineDot} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.timelineTitle}>{item.title}</Text>
                                        <Text style={styles.timelineMeta}>
                                            {item.date} • {item.hospital}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        );
    };

    const renderSideTabsModal = () => {
        return (
            <Modal
                visible={showSideTabs}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSideTabs(false)}
            >
                <Pressable
                    style={styles.sideTabsOverlay}
                    onPress={() => setShowSideTabs(false)}
                >
                    <Pressable
                        style={[styles.sideTabsPanel, { width: sidePanelWidth }]}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <View style={styles.sideTabsHeader}>
                            <Text style={styles.sideTabsTitle}>لوحة التبويبات</Text>

                            <TouchableOpacity onPress={() => setShowSideTabs(false)}>
                                <Text style={styles.sideTabsClose}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sideTabsList}>
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;

                                return (
                                    <TouchableOpacity
                                        key={tab.id}
                                        activeOpacity={0.9}
                                        style={[
                                            styles.sideTabItem,
                                            isActive && styles.sideTabItemActive,
                                        ]}
                                        onPress={() => {
                                            setActiveTab(tab.id);
                                            setShowSideTabs(false);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.sideTabLabel,
                                                isActive && styles.sideTabLabelActive,
                                            ]}
                                        >
                                            {tab.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f4f7fb" />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerTop}>
                    <TouchableOpacity
                        style={styles.headerMenuButton}
                        onPress={() => setShowSideTabs(true)}
                        activeOpacity={0.85}
                    >
                        <View style={styles.headerIcon}>
                            <Doctoricon width={20} height={20} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.headerCenterContent}>
                        <View>
                            <Text style={styles.headerTitle}>مركز الطبيب</Text>
                            <Text style={styles.headerSubtitle}>
                                Doctor Mobile Command
                            </Text>
                        </View>
                    </View>
                </View>

                {renderMainContent()}
                {renderMedicalHistoryModal()}
            </ScrollView>

            {renderSideTabsModal()}
        </SafeAreaView>
    );
};

export default DoctorDashboard;