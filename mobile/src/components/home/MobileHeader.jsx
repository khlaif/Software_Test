import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { COLORS } from "../../constants/colors";

// import menuIcon from "../../../assets/menu.png";
// import logoIcon from "../../../assets/logo.png";

export default function MobileHeader() {
    return (
        <View style={styles.wrapper}>
        <View style={styles.container}>
            <Pressable style={styles.menuButton}>
            {/* <Image source={menuIcon} style={styles.menuIcon} resizeMode="contain" /> */}
            </Pressable>

            <View style={styles.brand}>
            {/* <Image source={logoIcon} style={styles.logo} resizeMode="contain" /> */}
            <View style={styles.brandTextWrap}>
                <Text style={styles.brandTitle}>Diagnostic Workflow</Text>
                <Text style={styles.brandSubtitle}>ذكاء طبي متكامل</Text>
            </View>
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(15, 23, 42, 0.06)",
    },
    container: {
        minHeight: 72,
        paddingHorizontal: 16,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
    },
    brand: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    logo: {
        width: 42,
        height: 42,
        borderRadius: 12,
        marginLeft: 10,
    },
    brandTextWrap: {
        alignItems: "flex-end",
    },
    brandTitle: {
        fontSize: 15,
        fontWeight: "900",
        color: COLORS.text,
        textAlign: "right",
    },
    brandSubtitle: {
        fontSize: 12,
        fontWeight: "600",
        color: COLORS.muted,
        textAlign: "right",
        marginTop: 2,
    },
    menuButton: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#eef4ff",
        alignItems: "center",
        justifyContent: "center",
    },
    menuIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.primary,
    },
});