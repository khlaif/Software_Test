import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

import ActivityIcon from "../../../../assets/images/activity.svg";
import BrainIcon from "../../../../assets/images/brain-circuit.svg";
import CalendarIcon from "../../../../assets/images/calendar.svg";
import CheckIcon from "../../../../assets/images/check.svg";
import NoteIcon from "../../../../assets/images/notepad-text.svg";
import VideoIcon from "../../../../assets/images/video_white.svg"
import filetexticon from "../../../../assets/images/file-text_w.svg"

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 44) / 2;

const cards = [
    {
        title: "إدخال الأعراض",
        icon: ActivityIcon,
        status: "مكتمل",
        tone: "done",
        route: "/symptoms",
        soft: "#2564eb",
    },
    {
        title: "الجدولة الذكية",
        icon: CalendarIcon,
        status: "مكتمل",
        tone: "done",
        route: "/scheduling",
        soft: "#F97316",
    },
    {
        title: "النتائج النهائية",
        icon: CheckIcon,
        status: "مكتمل",
        tone: "done",
        route: "/results",
        soft: "#10B981",
    },
    {
        title: "خطة المتابعة",
        icon: NoteIcon,
        status: "قيد التنفيذ",
        tone: "active",
        route: "/follow-up",
        soft: "#2563EB",
    },
    {
        title:"الفواتير والمحاسبة",
        icon: filetexticon,
        status: "مكتمل",
        tone: "done",
        route: "/billingpatient",
        soft: "#8b5cf6",
    },
    {
        title: "العلاج عن بعد",
        icon: VideoIcon,
        status: "انتظار",
        tone: "wait",
        route: "/telemed",
        soft: "#94A3B8",
    },
];

function getSoftBackground(color) {
    if (color === "#2564eb") return "#2564eb";
    if (color === "#8b5cf6") return "#8b5cf6";
    if (color === "#F97316") return "#F97316";
    if (color === "#10B981") return "#10B981";
    if (color === "#2563EB") return "#2563EB";
    if (color === "#94A3B8") return "#94A3B8";
    return "rgba(37, 99, 235, 0.10)";
}

export default function ProcessCards() {
    const router = useRouter();

    return (
        <View style={styles.grid}>
        {cards.map((c) => {
            const IconComponent = c.icon;

            return (
            <Pressable
                key={c.title}
                style={[styles.card, getCardTone(c.tone), { width: cardWidth }]}
                onPress={() => router.push(c.route)}
            >
                <View style={[styles.iconWrap, { backgroundColor: getSoftBackground(c.soft) }]}>
                {IconComponent ? <IconComponent width={24} height={24} /> : null}
                </View>

                <Text style={styles.title}>{c.title}</Text>
                <Text style={[styles.status, getStatusTone(c.tone)]}>{c.status}</Text>
            </Pressable>
            );
        })}
        </View>
    );
}

function getCardTone(tone) {
    if (tone === "active") {
        return {
        borderColor: "#bfdbfe",
        transform: [{ translateY: 4 }],
        };
    }

    return {
        borderColor: "transparent",
    };
}

function getStatusTone(tone) {
    if (tone === "done") return { color: "#16a34a" };
    if (tone === "active") return { color: "#ea580c" };
    return { color: "#64748b" };
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 18,
    },
    card: {
        minHeight: 160,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 16,
        marginBottom: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        shadowColor: "#000000",
        shadowOpacity: 0.10,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    iconWrap: {
        width: 58,
        height: 58,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: "800",
        color: "#000",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 6,
    },
    status: {
        fontSize: 13,
        fontWeight: "800",
        textAlign: "center",
    },
});