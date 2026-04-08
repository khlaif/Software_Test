import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../../constants/colors";

export default function StatCard({ icon, value, label }) {
    return (
        <View style={styles.card}>
        <View style={styles.iconBox}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>

        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: "47%",
        backgroundColor: "rgba(255,255,255,0.92)",
        borderWidth: 1,
        borderColor: "rgba(15, 23, 42, 0.06)",
        borderRadius: 22,
        paddingVertical: 22,
        paddingHorizontal: 16,
        alignItems: "center",
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: COLORS.blueTint,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    icon: {
        width: 22,
        height: 22,
    },
    value: {
        fontSize: 26,
        fontWeight: "900",
        color: COLORS.textDark,
        marginBottom: 6,
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.muted,
        textAlign: "center",
    },
});