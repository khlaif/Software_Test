import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { analyzeSymptoms } from "../../../services/api";
import styles from "./SymptomsStyles";

import BrainIcon from "../../../../assets/images/brain-circuit.svg";
import MessageIcon from "../../../../assets/images/message-square.svg";
import SparkleIcon from "../../../../assets/images/sparkle.svg";
import AlertIcon from "../../../../assets/images/circle-alert.svg";

const QUICK_SYMPTOMS = [
    "الم في الصدر",
    "ضيق تنفس",
    "صداع نصفي",
    "سعال جاف",
    "ارتفاع حرارة",
];

export default function SymptomsScreen() {
    const [text, setText] = useState("");
    const [selected, setSelected] = useState(new Set());
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const navigation = useNavigation();
    const chips = useMemo(() => QUICK_SYMPTOMS, []);
    const placeholder =
        "ابدا بالكتابة هنا... (مثال: اشعر بضيق في التنفس عند الصعود في السلالم)";

    const canAnalyze = text.trim().length > 0;

    const quickToText = (label) => {
        setText((prev) => (prev ? `${prev} ،${label}` : label));

        setSelected((prev) => {
            const updated = new Set(prev);
            updated.add(label);
            return updated;
        });
    };

    const handleAnalyze = async () => {
        if (!canAnalyze || isAnalyzing) return;

        try {
            setIsAnalyzing(true);

            const result = await analyzeSymptoms(text);

            await AsyncStorage.setItem("ai_result", JSON.stringify(result));

            navigation.navigate("results", { aiResult: result });
        } catch (error) {
            console.error("Analyze error:", error);
            Alert.alert("خطأ", error.message || "صار خطأ أثناء تحليل الأعراض");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleBackToDashboard = () => {
        navigation.navigate("PatientDashboard");
    };

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.backButton}
                        onPress={handleBackToDashboard}
                    >
                        <Text style={styles.backButtonText}>لوحة التحكم</Text>
                    </TouchableOpacity>

                    <View style={styles.logoWrap}>
                        <View style={styles.logoPulse}>
                            <BrainIcon width={34} height={34} />
                        </View>
                    </View>
                </View>

                <Text style={styles.title}>كيف تشعر اليوم؟</Text>

                <Text style={styles.subtitle}>
                    أدخل أعراضك بدقّة وسيقوم محرّك{" "}
                    <Text style={styles.brand}>MEDFLOW AI</Text>
                    {" "}بتحليلها لتنظيم مسارك الطبي.
                </Text>
            </View>

            <View style={styles.card}>
                

                <View style={styles.cardHead}>
                    <View style={styles.cardIcon}>
                        <MessageIcon width={20} height={20} />
                    </View>

                    <Text style={styles.cardTitle}>وصف الحالة الصحية</Text>
                </View>

                <View style={styles.textBox}>
                    <TextInput
                        style={styles.textarea}
                        value={text}
                        onChangeText={setText}
                        placeholder={placeholder}
                        placeholderTextColor="rgba(100,116,139,.75)"
                        multiline
                        textAlign="right"
                    />
                </View>

                <View style={styles.quickSection}>
                    <View style={styles.quickLabel}>
                        <SparkleIcon width={18} height={18} />
                        <Text style={styles.quickLabelText}>اختصارات سريعة</Text>
                    </View>

                    <View style={styles.chipsWrap}>
                        {chips.map((chip, index) => {
                            const active = selected.has(chip);
                            const isLastRow = index >= 3;

                            return (
                                <TouchableOpacity
                                    key={chip}
                                    activeOpacity={0.85}
                                    style={[
                                        styles.chip,
                                        isLastRow ? styles.chipBottomRow : styles.chipTopRow,
                                        active && styles.chipActive,
                                    ]}
                                    onPress={() => quickToText(chip)}
                                >
                                    <View style={styles.plusWrap} />
                                    <Text style={styles.chipText}>{chip}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                        styles.analyzeButton,
                        !canAnalyze && styles.analyzeButtonDisabled,
                        isAnalyzing && styles.analyzeButtonProcessing,
                    ]}
                    onPress={handleAnalyze}
                    disabled={!canAnalyze || isAnalyzing}
                >
                    <View style={styles.buttonIconWrap}>
                        {isAnalyzing ? (
                            <ActivityIndicator color="#ffffff" size="small" />
                        ) : null}
                    </View>

                    <Text style={styles.analyzeButtonText}>
                        {isAnalyzing
                            ? "جاري تحليل الأعراض..."
                            : "تحليل الأعراض بالذكاء الاصطناعي"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.alertBox}>
                    <View style={styles.alertTop}>
                        <View style={styles.alertIconWrap}>
                            <AlertIcon width={18} height={18} />
                        </View>

                        <Text style={styles.alertTitle}>تنبيه طبي</Text>
                    </View>

                    <Text style={styles.alertText}>
                        هذا النظام مصمّم للمساعدة في الجدولة والتنظيم فقط. إذا كنت تعاني من أعراض خطيرة
                        تُهدِّد الحياة، يُرجى التوجّه فورًا لأقرب مستشفى.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}