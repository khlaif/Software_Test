import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import MobileHeader from "../components/home/MobileHeader";
import LoginModal from "../components/home/LoginModal";
import { COLORS } from "../constants/colors";

export default function HomeScreen() {
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
        <MobileHeader />

        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <HeroSection onStartPress={() => setLoginOpen(true)} />
            <StatsSection />
            <FeaturesSection />
        </ScrollView>

        <LoginModal
            open={loginOpen}
            onClose={() => setLoginOpen(false)}
        />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        paddingBottom: 30,
    },
});