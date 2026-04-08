import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import StatCard from "./StatCard";

// import shieldIcon from "../../../../web/src/assets/shield-check.svg";
// import globeIcon from "../../../../web/src/assets/globe.svg";
// import lockIcon from "../../../../web/src/assets/lock.svg";
// import stethoscopeIcon from "../../../../web/src/assets/stethoscope.svg";

export default function StatsSection() {
    const stats = [
        { value: "98.5%", label: "دقة التحليل" },
        { value: "+15", label: "مستشفيات مرتبطة" },
        { value: "30%", label: "توفير وقت الطبيب" },
        { value: "AES-256", label: "أمان البيانات" },
    ];

    return (
        <View style={styles.section}>
        <View style={styles.container}>
            <View style={styles.grid}>
            {stats.map((item) => (
                <StatCard
                key={item.label}
                icon={item.icon}
                value={item.value}
                label={item.label}
                />
            ))}
            </View>

            <View style={styles.headline}>
            <Text style={styles.pill}>المميزات الأساسية</Text>
            <Text style={styles.title}>حلول طبية متكاملة</Text>
            <Text style={styles.desc}>
                نحن لا نقدم مجرد برنامج، نحن نقدم شريكاً ذكياً لصحتك.
            </Text>
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        paddingVertical: 44,
        backgroundColor: COLORS.background,
    },
    container: {
        paddingHorizontal: 16,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 14,
        marginBottom: 34,
    },
    headline: {
        alignItems: "center",
    },
    pill: {
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: "rgba(47, 111, 237, 0.10)",
        color: COLORS.primary,
        fontWeight: "800",
        fontSize: 13,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "rgba(47, 111, 237, 0.18)",
    },
    title: {
        fontSize: 30,
        lineHeight: 36,
        fontWeight: "900",
        color: COLORS.text,
        textAlign: "center",
        marginBottom: 10,
    },
    desc: {
        maxWidth: 320,
        fontSize: 15,
        lineHeight: 26,
        color: COLORS.muted,
        textAlign: "center",
    },
});