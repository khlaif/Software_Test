import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { COLORS } from "../../constants/colors";

// import heroImg from "../../../assets/heroimg.png";
// import activityImg from "../../../assets/activity.png";
// import sparkleImg from "../../../assets/sparkle.png";
import heroImg from "../../../assets/images/heroimg.avif"

export default function HeroSection({ onStartPress }) {
    return (
        <View style={styles.wrapper}>
        <View style={styles.container}>
            <View style={styles.pill}>
            {/* <Image source={sparkleImg} style={styles.pillIcon} resizeMode="contain" /> */}
            <Text style={styles.pillText}>تقنيات الذكاء الاصطناعي 2026</Text>
            </View>

            <Text style={styles.title}>
            نقلة نوعية في{"\n"}
            <Text style={styles.titleGradient}>الرعاية الصحية</Text>
            </Text>

            <Text style={styles.desc}>
            نظام ذكي يختصر وقتك، ينظم مسارك الطبي، ويضمن لك تشخيصاً أدق بلمسة
            تكنولوجية عصرية.
            </Text>

            <Pressable style={styles.cta} onPress={onStartPress}>
            <Text style={styles.ctaText}>ابدأ مسارك الآن</Text>
            {/* <Image source={lessIcon} style={styles.ctaIcon} resizeMode="contain" /> */}
            </Pressable>

            <View style={styles.socialProof}>
            <View style={styles.avatars}>
                <View style={styles.avatar} />
                <View style={styles.avatar} />
                <View style={styles.avatar} />
            </View>

            <Text style={styles.proofText}>
                <Text style={styles.proofHighlight}>+5,000</Text> مستخدم{"\n"}
                يثقون بنظامنا
            </Text>
            </View>

            <View style={styles.imageWrap}>
            <Image source={heroImg} style={styles.image} resizeMode="cover" />

            <View style={styles.floatCard}>
                <View style={styles.floatIconBox}>
                {/* <Image source={activityImg} style={styles.floatIcon} resizeMode="contain" /> */}
                </View>
                <View>
                <Text style={styles.floatSmall}>وقت الانتظار</Text>
                <Text style={styles.floatBig}>-40% أقل</Text>
                </View>
            </View>
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "rgba(59, 130, 246, 0.10)",
        paddingTop: 24,
        paddingBottom: 28,
    },
    container: {
        paddingHorizontal: 16,
    },
    pill: {
        alignSelf: "flex-end",
        flexDirection: "row-reverse",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.75)",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        marginBottom: 14,
    },
    pillIcon: {
        width: 16,
        height: 16,
        marginLeft: 8,
    },
    pillText: {
        color: COLORS.primary,
        fontWeight: "700",
        fontSize: 13,
        textAlign: "right",
    },
    title: {
        fontSize: 34,
        lineHeight: 42,
        fontWeight: "900",
        color: COLORS.text,
        textAlign: "right",
        marginBottom: 14,
    },
    titleGradient: {
        color: COLORS.primary,
    },
    desc: {
        fontSize: 15,
        lineHeight: 28,
        color: COLORS.muted,
        textAlign: "right",
        marginBottom: 20,
    },
    cta: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 16,
        marginBottom: 16,
    },
    ctaText: {
        color: COLORS.white,
        fontSize: 17,
        fontWeight: "800",
    },
    ctaIcon: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    socialProof: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 20,
    },
    avatars: {
        flexDirection: "row-reverse",
        marginLeft: 12,
    },
    avatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#dbeafe",
        borderWidth: 2,
        borderColor: "#fff",
        marginLeft: -8,
    },
    proofText: {
        color: COLORS.muted,
        fontSize: 13,
        lineHeight: 20,
        textAlign: "right",
    },
    proofHighlight: {
        color: COLORS.primary,
        fontWeight: "800",
    },
    imageWrap: {
        position: "relative",
        backgroundColor: COLORS.white,
        borderRadius: 22,
        padding: 12,
        marginTop: 8,
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 18,
    },
    floatCard: {
        position: "absolute",
        top: 20,
        right: 20,
        flexDirection: "row-reverse",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.92)",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    floatIconBox: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: COLORS.green,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },
    floatIcon: {
        width: 18,
        height: 18,
        tintColor: "#fff",
    },
    floatSmall: {
        fontSize: 11,
        color: COLORS.muted,
        fontWeight: "700",
        textAlign: "right",
    },
    floatBig: {
        fontSize: 15,
        color: COLORS.text,
        fontWeight: "900",
        textAlign: "right",
    },
});