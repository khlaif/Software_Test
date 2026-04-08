import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";

const items = [
    { label: "قسم الأشعة", value: 85, color: "#ef4444" },
    { label: "المختبر المركزي", value: 40, color: "#22c55e" },
    { label: "عيادات القلب", value: 65, color: "#f59e0b" },
];

export default function LoadPanel() {
    return (
        <View style={styles.card}>
            <View style={styles.inner}>
                <Text style={styles.title}>إشغال المرافق</Text>

                {items.map((it) => (
                <View key={it.label} style={styles.row}>
                    <View style={styles.head}>
                        <Text style={styles.name}>{it.label}</Text>
                        <Text style={styles.percent}>{it.value}%</Text>
                    </View>

                    <View style={styles.bar}>
                        <View
                            style={[
                            styles.fill,
                            {
                                width: `${it.value}%`,
                                backgroundColor: it.color,
                            },
                            ]}
                        />
                    </View>
                </View>
                ))}

                <Pressable style={styles.linkButton}>
                    <Text style={styles.linkText}>تحدث مباشرة من الأقسام ↗</Text>
                </Pressable>
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
    title: {
        fontSize: 22,
        fontWeight: "900",
        color: "#0f172a",
        textAlign: "right",
        marginBottom: 14,
    },
    row: {
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "rgba(15,23,42,0.06)",
    },
    head: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    name: {
        color: "#0f172a",
        fontSize: 16,
        fontWeight: "900",
        textAlign: "right",
    },
    percent: {
        color: "#64748b",
        fontSize: 14,
        fontWeight: "900",
    },
    bar: {
        height: 10,
        backgroundColor: "#eef2f7",
        borderRadius: 999,
        overflow: "hidden",
        alignItems: "flex-end",
    },
    fill: {
        height: "100%",
        borderRadius: 999,
    },
    linkButton: {
        width: "100%",
        marginTop: 14,
        minHeight: 44,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    linkText: {
        color: "#64748b",
        fontSize: 14,
        fontWeight: "800",
    },
});