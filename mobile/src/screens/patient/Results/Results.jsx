import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    Alert,
    Share,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import styles from "./ResultsStyles";

import ShareIcon from "../../../../assets/images/share-2.svg";
import CheckCircleIcon from "../../../../assets/images/circle-check.svg";
import WarningIcon from "../../../../assets/images/circle-alert.svg";
import FileIcon from "../../../../assets/images/file-text_blue.svg";
import ReportIcon from "../../../../assets/images/clipboard-list.svg";

const fallbackData = {
    completedTag: "اكتمل المسار التشخيصي",
    title: "النتائج والتقارير النهائية",
    subtitle: "تمت مراجعة جميع الفحوصات من قبل الطبيب المختص.",
    finalDiagnosis:
        "بناءً على نتائج تخطيط القلب وفحوصات الدم، تبين وجود إجهاد عضلي بسيط. تم وصف الراحة التامة لمدة 3 أيام مع علاج (بروفين 400 ملغ) عند الضرورة.",
    followUp: [
        "الراحة التامة وتجنب المجهود البدني العنيف.",
        "شرب كميات وافرة من السوائل.",
        "مراجعة العيادة بعد أسبوع لإجراء فحص جهد.",
    ],
    warning:
        "في حال عودة الألم بشكل حاد أو الشعور بدوار مفاجئ، يرجى مراجعة الطوارئ فوراً وعدم الانتظار لموعد المتابعة.",
    tests: [
        {
            title: "تخطيط القلب (ECG)",
            summary: "طبيعي مع تسارع بسيط",
            date: "Feb 16",
            status: "طبيعي",
            details: ["لا توجد مؤشرات خطورة حالية", "متابعة عند اللزوم"],
        },
        {
            title: "فحص إنزيمات القلب",
            summary: "3.2 ng/mL (ضمن المدى)",
            date: "Feb 16",
            status: "طبيعي",
            details: ["النتيجة ضمن المدى المرجعي", "لا يلزم إجراء إضافي حالياً"],
        },
        {
            title: "أشعة سينية للصدر",
            summary: "طبيعي",
            date: "Feb 16",
            status: "طبيعي",
            details: ["لا توجد علامات التهاب", "لا توجد سوائل على الرئة"],
        },
    ],
};

export default function Results() {
    const [openIndex, setOpenIndex] = useState(null);
    const [storedData, setStoredData] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        const loadData = async () => {
            try {
                const raw = await AsyncStorage.getItem("ai_result");

                if (raw) {
                    setStoredData(JSON.parse(raw));
                }
            } catch (error) {
                console.log("Failed to load ai_result:", error);
            }
        };

        loadData();
    }, []);

    const viewModel = useMemo(() => {
        if (!storedData) {
            return fallbackData;
        }

        return {
            completedTag: storedData.completedTag || fallbackData.completedTag,
            title: storedData.title || fallbackData.title,
            subtitle: storedData.subtitle || fallbackData.subtitle,
            finalDiagnosis: storedData.finalDiagnosis || fallbackData.finalDiagnosis,
            followUp: Array.isArray(storedData.followUp)
                ? storedData.followUp
                : fallbackData.followUp,
            warning: storedData.warning || fallbackData.warning,
            tests: Array.isArray(storedData.tests)
                ? storedData.tests
                : fallbackData.tests,
        };
    }, [storedData]);

    const onBackToDashboard = () => {
        navigation.navigate("PatientDashboard");
    };

    const onShare = async () => {
        try {
            await Share.share({
                title: viewModel.title,
                message: `${viewModel.title}\n\n${viewModel.finalDiagnosis}`,
            });
        } catch (error) {
            Alert.alert("خطأ", "تعذر المشاركة حالياً.");
        }
    };

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.headerCard}>
                <View style={styles.badge}>
                    <View style={styles.badgeIconWrap}>
                        <CheckCircleIcon width={18} height={18} />
                    </View>

                    <Text style={styles.badgeText}>{viewModel.completedTag}</Text>
                </View>

                <Text style={styles.title}>{viewModel.title}</Text>
                <Text style={styles.subtitle}>{viewModel.subtitle}</Text>

                <View style={styles.actionsRow}>
                    <Pressable style={styles.primaryBtn} onPress={onBackToDashboard}>
                        <Text style={styles.primaryBtnText}>العودة للوحة التحكم</Text>
                    </Pressable>

                    <Pressable style={styles.ghostBtn} onPress={onShare}>
                        <ShareIcon width={18} height={18} />
                        <Text style={styles.ghostBtnText}>مشاركة</Text>
                    </Pressable>
                </View>
            </View>

            <View style={[styles.card, styles.diagnosisCard]}>
                <View style={styles.cardTitleRow}>
                    <ReportIcon width={20} height={20} />
                    <Text style={styles.cardTitle}>التشخيص النهائي</Text>
                </View>

                <View style={styles.quoteBox}>
                    <Text style={styles.quoteText}>“{viewModel.finalDiagnosis}”</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>تعليمات المتابعة</Text>

                <View style={styles.followList}>
                    {viewModel.followUp.map((item, index) => (
                        <View key={index} style={styles.followItem}>
                            <View style={styles.followNum}>
                                <Text style={styles.followNumText}>{index + 1}</Text>
                            </View>

                            <Text style={styles.followText}>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={[styles.card, styles.warningCard]}>
                <View style={styles.cardTitleRow}>
                    <WarningIcon width={20} height={20} />
                    <Text style={styles.warningTitle}>متى يجب القلق؟</Text>
                </View>

                <Text style={styles.warningText}>{viewModel.warning}</Text>
            </View>

            <View style={styles.testsSection}>
                <Text style={styles.sectionTitle}>تفاصيل الفحوصات</Text>

                {viewModel.tests.map((test, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <View key={index} style={styles.testCard}>
                            <Pressable
                                style={styles.testHeader}
                                onPress={() => setOpenIndex(isOpen ? null : index)}
                            >
                                <View style={styles.testMain}>
                                    <View style={styles.testTitleRow}>
                                        <FileIcon width={18} height={18} />
                                        <Text style={styles.testTitle}>{test.title}</Text>
                                    </View>

                                    <Text style={styles.testSummary}>{test.summary}</Text>
                                </View>

                                <View style={styles.testSide}>
                                    <Text style={styles.testDate}>{test.date}</Text>

                                    <View style={styles.statusBadge}>
                                        <Text style={styles.statusText}>{test.status}</Text>
                                    </View>

                                    <Text style={styles.toggleText}>
                                        {isOpen ? "إغلاق" : "فتح"}
                                    </Text>
                                </View>
                            </Pressable>

                            {isOpen && (
                                <View style={styles.testBody}>
                                    {(test.details || []).map((detail, i) => (
                                        <Text key={i} style={styles.testDetail}>
                                            • {detail}
                                        </Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}