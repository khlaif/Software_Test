import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";

// import closeIcon from "../../../assets/x.png";
// import userIcon from "../../../assets/user-round.png";
// import doctorIcon from "../../../assets/stethoscope_black.png";
// import adminIcon from "../../../assets/user-star.png";
// import shieldIcon from "../../../assets/shield-check.png";

export default function LoginModal({ open, onClose }) {
    const router = useRouter();

    const [tab, setTab] = useState("login");
    const [role, setRole] = useState(null);
    const [nationalId, setNationalId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const roleToRoute = (r) => {
        switch (String(r).toUpperCase()) {
        case "PATIENT":
        case "patient":
            return "/patient";
        case "DOCTOR":
        case "doctor":
            return "/doctor";
        case "ADMIN":
        case "admin":
            return "/admin";
        default:
            return "/";
        }
    };

    const handleLogin = async () => {
        setErrorMsg("");

        if (!role) return setErrorMsg("الرجاء اختيار نوع الحساب.");
        if (!nationalId.trim()) return setErrorMsg("الرجاء إدخال رقم الهوية.");
        if (!password) return setErrorMsg("الرجاء إدخال كلمة السر.");

        try {
        setLoading(true);

        const res = await fetch("http://172.20.10.2:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            role,
            nationalId: nationalId.trim(),
            password,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            setErrorMsg(data?.message || "فشل تسجيل الدخول.");
            return;
        }

        onClose?.();
        router.push(roleToRoute(data?.user?.role || role));
        } catch (error) {
        setErrorMsg("مشكلة اتصال بالسيرفر. تأكد من تشغيل الـ backend.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={onClose}
        >
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay}>
            <TouchableWithoutFeedback>
                <View style={styles.card}>
                <Pressable style={styles.closeBtn} onPress={onClose}>
                    {/* <Image source={closeIcon} style={styles.closeIcon} resizeMode="contain" /> */}
                </Pressable>

                <View style={styles.header}>
                    <Text style={styles.title}>أهلاً بك مجدداً</Text>
                    <Text style={styles.subtitle}>
                    سجل دخولك لمتابعة حالتك الصحية.
                    </Text>
                </View>

                <ScrollView
                    style={styles.body}
                    contentContainerStyle={styles.bodyContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.tabs}>
                    <Pressable
                        style={[styles.tabBtn, tab === "login" && styles.tabBtnActive]}
                        onPress={() => setTab("login")}
                    >
                        <Text
                        style={[styles.tabText, tab === "login" && styles.tabTextActive]}
                        >
                        دخول
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[styles.tabBtn, tab === "new" && styles.tabBtnActive]}
                        onPress={() => setTab("new")}
                    >
                        <Text
                        style={[styles.tabText, tab === "new" && styles.tabTextActive]}
                        >
                        جديد
                        </Text>
                    </Pressable>
                    </View>

                    {tab === "login" ? (
                    <>
                        <View style={styles.roles}>
                        <RoleCard
                            active={role === "doctor"}
                            label="طبيب"
                            // icon={doctorIcon}
                            onPress={() => setRole("doctor")}
                        />
                        <RoleCard
                            active={role === "patient"}
                            label="مريض"
                            // icon={userIcon}
                            onPress={() => setRole("patient")}
                        />
                        <RoleCard
                            active={role === "admin"}
                            label="الإدارة"
                            // icon={adminIcon}
                            onPress={() => setRole("admin")}
                        />
                        </View>

                        <Text style={styles.label}>رقم الهوية</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="أدخل رقم هويتك الوطني"
                        placeholderTextColor="#94a3b8"
                        keyboardType="numeric"
                        textAlign="right"
                        value={nationalId}
                        onChangeText={setNationalId}
                        />

                        <Text style={styles.label}>كلمة السر</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#94a3b8"
                        secureTextEntry
                        textAlign="right"
                        value={password}
                        onChangeText={setPassword}
                        />

                        {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

                        <Pressable
                        style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                        >
                        <Text style={styles.submitText}>
                            {loading ? "جارٍ التحقق..." : "دخول آمن"}
                        </Text>
                        </Pressable>
                    </>
                    ) : (
                    <>
                        <Text style={styles.label}>رقم الهوية</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="أرقام 9"
                        placeholderTextColor="#94a3b8"
                        keyboardType="numeric"
                        textAlign="right"
                        />

                        <Text style={styles.label}>الاسم الرباعي</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="كما هو في الهوية"
                        placeholderTextColor="#94a3b8"
                        textAlign="right"
                        />

                        <Text style={styles.label}>مكان السكن</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="المدينة، الحي"
                        placeholderTextColor="#94a3b8"
                        textAlign="right"
                        />

                        <View style={styles.note}>
                        <View style={styles.noteIconWrap}>
                            {/* <Image source={shieldIcon} style={styles.noteIcon} resizeMode="contain" /> */}
                        </View>
                        <Text style={styles.noteText}>
                            كلمة سرك هي رقم هويتك، سيطلب منك النظام تغييرها فور دخولك.
                        </Text>
                        </View>

                        <Pressable style={styles.submitBtn}>
                        <Text style={styles.submitText}>إنشاء الحساب</Text>
                        </Pressable>
                    </>
                    )}
                </ScrollView>
                </View>
            </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
        </Modal>
    );
}

function RoleCard({ active, label, icon, onPress }) {
    return (
        <Pressable
        style={[styles.roleCard, active && styles.roleCardActive]}
        onPress={onPress}
        >
        {icon && (
            <View style={styles.roleIconWrap}>
            <Image source={icon} style={styles.roleIcon} resizeMode="contain" />
            </View>
        )}
        <Text style={styles.roleText}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(15,23,42,0.35)",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
    },
    card: {
        width: "100%",
        maxWidth: 560,
        maxHeight: "85%",
        backgroundColor: "#fff",
        borderRadius: 24,
        overflow: "hidden",
    },
    closeBtn: {
        position: "absolute",
        top: 12,
        left: 12,
        width: 38,
        height: 38,
        borderRadius: 12,
        zIndex: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    closeIcon: {
        width: 18,
        height: 18,
        tintColor: "#0f172a",
    },
    header: {
        backgroundColor: COLORS.primary,
        paddingTop: 44,
        paddingHorizontal: 22,
        paddingBottom: 26,
    },
    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "900",
        textAlign: "right",
        marginBottom: 6,
    },
    subtitle: {
        color: "rgba(255,255,255,0.92)",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "right",
        lineHeight: 22,
    },
    body: {
        flexGrow: 0,
    },
    bodyContent: {
        padding: 18,
        paddingBottom: 24,
    },
    tabs: {
        flexDirection: "row-reverse",
        backgroundColor: "#f1f5ff",
        borderRadius: 16,
        padding: 6,
        marginBottom: 18,
        gap: 8,
    },
    tabBtn: {
        flex: 1,
        height: 42,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    tabBtnActive: {
        backgroundColor: "#fff",
    },
    tabText: {
        color: "#334155",
        fontWeight: "800",
    },
    tabTextActive: {
        color: "#0f172a",
    },
    roles: {
        flexDirection: "row-reverse",
        gap: 12,
        marginBottom: 18,
    },
    roleCard: {
        flex: 1,
        minHeight: 68,
        borderWidth: 2,
        borderColor: "rgba(15, 23, 42, 0.18)",
        borderRadius: 16,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 14,
    },
    roleCardActive: {
        borderColor: COLORS.primary,
        backgroundColor: "#f8fbff",
    },
    roleIconWrap: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },
    roleIcon: {
        width: 22,
        height: 22,
    },
    roleText: {
        color: "#0f172a",
        fontWeight: "900",
        fontSize: 15,
        textAlign: "center",
    },
    label: {
        color: "#0f172a",
        fontWeight: "900",
        marginBottom: 8,
        textAlign: "right",
    },
    input: {
        width: "100%",
        height: 52,
        borderRadius: 16,
        backgroundColor: "#f8fafc",
        paddingHorizontal: 16,
        color: "#000",
        fontWeight: "700",
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    error: {
        marginBottom: 12,
        padding: 10,
        borderRadius: 12,
        backgroundColor: "rgba(239,68,68,0.08)",
        color: "#b91c1c",
        fontWeight: "700",
        textAlign: "right",
    },
    submitBtn: {
        width: "100%",
        height: 56,
        borderRadius: 18,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    submitBtnDisabled: {
        opacity: 0.7,
    },
    submitText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "900",
    },
    note: {
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        gap: 10,
        marginTop: 4,
        marginBottom: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: "rgba(37,99,235,0.18)",
        borderRadius: 16,
        backgroundColor: "#f3f7ff",
    },
    noteIconWrap: {
        width: 28,
        height: 28,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    noteIcon: {
        width: 18,
        height: 18,
        tintColor: COLORS.primary,
    },
    noteText: {
        flex: 1,
        color: COLORS.primary,
        fontWeight: "700",
        lineHeight: 22,
        textAlign: "right",
    },
});