import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../../constants/colors";

export default function FeatureCard({ icon, title, desc, color = "blue" }) {
    const iconBackground =
        color === "purple"
        ? COLORS.purple
        : color === "green"
        ? COLORS.emerald
        : COLORS.primary;

    return (
        <View style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: iconBackground }]}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255,255,255,0.92)",
        borderWidth: 1,
        borderColor: "rgba(15, 23, 42, 0.06)",
        borderRadius: 22,
        paddingVertical: 24,
        paddingHorizontal: 18,
        alignItems: "center",
    },
    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "900",
        color: COLORS.text,
        textAlign: "center",
        marginBottom: 10,
    },
    desc: {
        fontSize: 15,
        lineHeight: 26,
        color: COLORS.muted,
        textAlign: "center",
    },
});