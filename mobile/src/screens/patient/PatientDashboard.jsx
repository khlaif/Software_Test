import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DashboardHeader from "./sections/DashboardHeader";
import ProcessCards from "./sections/ProcessCards";
import AiRecommendations from "./sections/AiRecommendations";
import LoadPanel from "./sections/LoadPanel";

export default function PatientDashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
        try {
            const saved = await AsyncStorage.getItem("user");
            if (saved) setUser(JSON.parse(saved));
        } catch (error) {
            console.log("Error loading user:", error);
        }
        };

        loadUser();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <DashboardHeader userName={user?.fullName || "..."} />

                <View style={styles.titleRow}>
                    <Text style={styles.title}>خارطة الطريق العلاجية والمتابعة</Text>
                </View>

                <ProcessCards />

                <View style={styles.sectionsWrap}>
                    <AiRecommendations />
                    <LoadPanel />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff6f6",
    },
    container: {
        flex: 1,
        backgroundColor: "#f6f9ff",
    },
    content: {
        padding: 16,
        paddingBottom: 30,
    },
    titleRow: {
        marginTop: 18,
        marginBottom: 14,
        alignItems: "flex-end",
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
    },
    sectionsWrap: {
        gap: 16,
    },
});