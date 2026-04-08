import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";
import { useRouter } from "expo-router";

import SparkleIcon from "../../../../assets/images/sparkle.svg";
import VideoIcon from "../../../../assets/images/video.svg";
import UserIcon from "../../../../assets/images/user-round.svg";
import ReportIcon from "../../../../assets/images/file-text.svg";

export default function DashboardHeader({ userName }) {
    const router = useRouter();

    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <View style={styles.right}>
                    <View style={styles.smallRow}>
                        <SparkleIcon width={18} height={18} />
                        <Text style={styles.smallText}>لوحة المريض الذكية</Text>
                    </View>

                    <Text style={styles.helloText}>مرحباً {userName} 👋</Text>
                    <Text style={styles.subText}>
                        نحن نتابع مسارك التشخيصي والعلاجي بكل دقة.
                    </Text>
                </View>

                <View style={styles.left}>

                    <Pressable
                        style={styles.actionButton}
                        onPress={() => router.push("/health-record")}
                    >
                        <View style={styles.actionIconWrap}>
                            <ReportIcon width={18} height={18} />
                        </View>
                        <Text style={styles.actionText} numberOfLines={1}>
                        السجل الطبي
                        </Text>
                    </Pressable>
                    <Pressable
                        style={styles.iconButton}
                        onPress={() => router.push("/profile")}
                    >
                        <UserIcon width={20} height={20} />
                    </Pressable>

                    

                    {/* <Pressable
                        style={styles.actionButton}
                        onPress={() => router.push("/telemed")}
                    >
                        <View style={styles.actionIconWrap}>
                        <VideoIcon width={18} height={18} />
                        </View>
                        <Text style={styles.actionText} numberOfLines={1}>
                        استشارة فورية
                        </Text>
                    </Pressable> */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 18,
        shadowColor: "#0f172a",
        shadowOpacity: 0.07,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgba(15,23,42,0.06)",
    },
    container: {
        gap: 16,
    },
    right: {
        alignItems: "flex-end",
    },
    smallRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 8,
        gap: 6,
    },
    smallText: {
        color: "#2563eb",
        fontSize: 16,
        fontWeight: "700",
        textAlign: "right",
    },
    helloText: {
        fontSize: 28,
        fontWeight: "900",
        color: "#0f172a",
        textAlign: "right",
        marginBottom: 8,
    },
    subText: {
        color: "#64748b",
        fontSize: 15,
        lineHeight: 24,
        textAlign: "right",
    },
    left: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 8,
        width: "100%",
    },
    actionButton: {
        flex: 1,
        height: 50,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(15,23,42,0.10)",
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
    },
    actionIconWrap: {
        width: 22,
        height: 22,
        marginLeft: 6,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    actionText: {
        color: "#0f172a",
        fontSize: 13,
        fontWeight: "800",
        textAlign: "center",
        flexShrink: 1,
    },
    iconButton: {
        flex: 1,
        height: 50,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(15,23,42,0.10)",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },
});