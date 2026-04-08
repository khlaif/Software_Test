import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import ShieldIcon from "../../../../assets/images/shield-check.svg";
import BrainIcon from "../../../../assets/images/brain-circuit_blue.svg";

function badgeFromPriority(priority) {
    if (priority === "Critical") {
        return { text: "طارئ جدًا", bg: "rgba(239,68,68,0.12)", color: "#dc2626" };
    }
    if (priority === "High") {
        return { text: "عاجل", bg: "rgba(249,115,22,0.12)", color: "#ea580c" };
    }
    if (priority === "Medium") {
        return { text: "متوسط", bg: "rgba(37,99,235,0.10)", color: "#2563eb" };
    }
    return { text: "منخفض", bg: "rgba(100,116,139,0.12)", color: "#64748b" };
}

function formatArabicTime(time24) {
    const [hourStr, minute] = time24.split(":");
    let hour = Number(hourStr);
    const period = hour >= 12 ? "مساءً" : "صباحاً";

    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;

    return `${String(hour).padStart(2, "0")}:${minute} ${period}`;
}

function formatArabicDate(dateString) {
    const date = new Date(dateString);

    const days = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
    ];

    const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
    ];

    return `${days[date.getDay()]}، ${date.getDate()} ${months[date.getMonth()]}`;
}

function buildScheduledAppointments(recommendedTests = [], priority = "Medium") {
    const today = new Date();
    const testSlots = ["09:00", "10:00", "11:00", "14:00", "15:00"];
    const doctorReviewTime = "17:00";

    const testAppointments = recommendedTests.map((test, index) => {
        const scheduleDate = new Date(today);
        scheduleDate.setDate(today.getDate() + Math.floor(index / testSlots.length));

        const time24 = testSlots[index % testSlots.length];

        return {
            id: Date.now() + index,
            title: test.test_name,
            location: "سيتم تحديد موقع الفحص من قاعدة البيانات",
            doctor: null,
            date: formatArabicDate(scheduleDate.toISOString()),
            time: formatArabicTime(time24),
            status: index === 0 ? "suggested" : "pending",
            statusLabel: index === 0 ? "مقترح من النظام" : "قيد التأكيد",
            actions: index === 0 ? ["change", "confirm"] : ["change"],
            reason: test.reason || "",
            appointmentType: "test",
            priority,
        };
    });

    if (testAppointments.length === 0) return [];

    const lastTestDate = new Date(today);
    lastTestDate.setDate(
        today.getDate() + Math.floor((testAppointments.length - 1) / testSlots.length)
    );

    const doctorAppointment = {
        id: Date.now() + 9999,
        title: "معاينة طبيب (مراجعة النتائج)",
        location: "سيتم تحديد العيادة من قاعدة البيانات",
        doctor: "سيتم تحديد الطبيب المسؤول من قاعدة البيانات",
        date: formatArabicDate(lastTestDate.toISOString()),
        time: formatArabicTime(doctorReviewTime),
        status: "pending",
        statusLabel: "قيد التأكيد",
        actions: ["change", "confirm"],
        reason: "موعد مراجعة بعد إتمام الفحوصات المقترحة من النظام",
        appointmentType: "doctor_review",
        priority,
    };

    return [...testAppointments, doctorAppointment];
}

export default function AiRecommendations() {
    const [aiPayload, setAiPayload] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const loadAiResult = async () => {
            try {
                const raw = await AsyncStorage.getItem("ai_result");
                if (raw) setAiPayload(JSON.parse(raw));
            } catch (error) {
                console.log("Error loading ai_result:", error);
            }
        };

        loadAiResult();
    }, []);

    const aiData = aiPayload?.data;
    const priority = aiData?.priority_level || "Medium";
    const badge = useMemo(() => badgeFromPriority(priority), [priority]);

    const recs = aiData?.recommended_tests || [];
    const redFlags = aiData?.red_flags || [];
    const summary = aiData?.summary || "لم يتم العثور على تحليل بعد.";

    const generatedAppointments = useMemo(() => {
        return buildScheduledAppointments(recs, priority);
    }, [recs, priority]);

    const handleViewAppointments = async () => {
        try {
            await AsyncStorage.setItem(
                "scheduled_appointments",
                JSON.stringify(generatedAppointments)
            );

            navigation.navigate("scheduling", {
                appointments: generatedAppointments,
            });
        } catch (error) {
            console.log("Error saving appointments:", error);
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.inner}>
                <View style={styles.top}>
                    <View style={styles.shieldWrap}>
                        <ShieldIcon width={24} height={24} />
                    </View>
                    <Text style={styles.title}>توصيات المحرك الذكي MEDFLOW</Text>
                </View>

                <View style={styles.callout}>
                    <View style={styles.callIconWrap}>
                        <BrainIcon width={24} height={24} />
                    </View>

                    <View style={styles.callTextWrap}>
                        <View style={styles.callTitleRow}>
                            <Text style={styles.callTitle}>تحليل متقدم للأعراض</Text>
                            <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                                <Text style={[styles.badgeText, { color: badge.color }]}>
                                    {badge.text}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.callText}>{summary}</Text>

                        {aiPayload?.warning ? (
                            <Text style={[styles.callText, styles.warningText]}>
                                ⚠ {aiPayload.warning}
                            </Text>
                        ) : null}
                    </View>
                </View>

                {redFlags.length > 0 && (
                    <View style={[styles.callout, { marginTop: 12 }]}>
                        <View style={styles.callTextWrap}>
                            <Text style={styles.callTitle}>مؤشرات خطر (Red Flags)</Text>
                            <Text style={styles.callText}>{redFlags.join("، ")}</Text>
                        </View>
                    </View>
                )}

                <View style={styles.list}>
                    {recs.length === 0 ? (
                        <Text style={styles.emptyText}>لا توجد توصيات حالياً.</Text>
                    ) : (
                        recs.map((r, idx) => (
                            <View key={`${r.test_name}-${idx}`} style={styles.item}>
                                <View style={styles.itemTop}>
                                    <Text style={styles.itemTitle}>{r.test_name}</Text>

                                    <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                                        <Text style={[styles.badgeText, { color: badge.color }]}>
                                            {badge.text}
                                        </Text>
                                    </View>

                                    
                                </View>

                                <Text style={styles.itemDesc}>{r.reason}</Text>

                                <Pressable style={styles.itemButton} onPress={handleViewAppointments}>
                                    <Text style={styles.itemButtonText}>عرض الموعد</Text>
                                </Pressable>
                            </View>
                        ))
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        shadowColor: "#0f172a",
        shadowOpacity: 0.07,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgba(15,23,42,0.06)",
    },
    inner: {
        padding: 18,
    },
    top: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 14,
    },
    shieldWrap: {
        width: 46,
        height: 46,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: "900",
        color: "#0f172a",
        textAlign: "right",
        flex: 1,
    },
    callout: {
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        padding: 16,
        borderRadius: 18,
        backgroundColor: "rgba(37,99,235,0.08)",
        borderWidth: 1,
        borderColor: "rgba(37,99,235,0.18)",
        marginBottom: 14,
    },
    callIconWrap: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "rgba(37,99,235,0.20)",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
    },
    callTextWrap: {
        flex: 1,
        alignItems: "flex-end",
    },
    callTitleRow: {
        width: "100%",
        flexDirection: "row-reverse",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 6,
    },
    callTitle: {
        color: "#2563eb",
        fontWeight: "800",
        fontSize: 18,
        textAlign: "right",
        marginLeft: 8,
    },
    callText: {
        color: "#64748b",
        fontSize: 14,
        lineHeight: 23,
        textAlign: "right",
        width: "100%",
    },
    warningText: {
        marginTop: 8,
        opacity: 0.85,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "800",
    },
    list: {
        gap: 10,
    },
    emptyText: {
        color: "#64748b",
        fontSize: 14,
        textAlign: "right",
    },
    item: {
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    itemTop: {
        flexDirection: "row-reverse",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 6,
    },
    itemTitle: {
        flex: 1,
        color: "#000",
        fontWeight: "900",
        fontSize: 16,
        textAlign: "right",
        marginLeft: 8,
    },
    itemDesc: {
        color: "#64748b",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
        marginBottom: 10,
    },
    itemButton: {
        alignSelf: "center",
        backgroundColor: "#f6f9ff",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 50,
        minWidth: 200,
    },
    itemButtonText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "700",
        textAlign:"center"
    },
});