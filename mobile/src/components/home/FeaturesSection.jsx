import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import FeatureCard from "./FeatureCard";

// import calendarIcon from "../../../../web/src/assets/calendar.svg";
// import brainIcon from "../../../../web/src/assets/brain-circuit.svg";
// import activityIcon from "../../../../web/src/assets/activity.svg";

export default function FeaturesSection() {
    const items = [
        {

        title: "الجدولة الذكية",
        desc: "خوارزميات متقدمة لتوزيع الحالات وتجنب الازدحام في غرف الفحص.",
        color: "blue",
        },
        {

        title: "تحليل الأعراض NLP",
        desc: "فهم عميق للشكوى الطبية وتوجيه المريض للفحوصات الصحيحة فوراً.",
        color: "purple",
        },
        {

        title: "التاريخ البصري",
        desc: "رؤية شاملة لتاريخك المرضي تساعد الطبيب في فهم حالتك بدقة.",
        color: "green",
        },
    ];

    return (
        <View style={styles.section}>
        <View style={styles.container}>
            {items.map((item) => (
            <View key={item.title} style={styles.cardWrap}>
                <FeatureCard
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                color={item.color}
                />
            </View>
            ))}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        paddingTop: 8,
        paddingBottom: 44,
        backgroundColor: COLORS.backgroundSoft,
    },
    container: {
        paddingHorizontal: 16,
        gap: 16,
    },
    cardWrap: {
        width: "100%",
    },
});