import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";

export default function ConfirmAppointmentModal({ appointment, onClose, onConfirm }) {
    return (
        <Modal visible transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Pressable style={styles.closeBtn} onPress={onClose}>
                        <Text style={styles.closeBtnText}>×</Text>
                    </Pressable>

                    <Text style={styles.title}>تأكيد موعد الفحص</Text>

                    <View style={[styles.box, styles.greenBox]}>
                        <Text style={styles.greenLabel}>نوع الفحص</Text>
                        <Text style={styles.greenStrong}>{appointment.title}</Text>
                    </View>

                    <View style={styles.rowInfo}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>التاريخ</Text>
                            <Text style={styles.infoStrong}>{appointment.date}</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>الوقت</Text>
                            <Text style={[styles.infoStrong, styles.blueStrong]}>
                                {appointment.time}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.box, styles.locationBox]}>
                        <Text style={styles.locationLabel}>الموقع</Text>
                        <Text style={styles.locationStrong}>{appointment.location}</Text>
                    </View>

                    <View style={[styles.box, styles.warningBox]}>
                        <Text style={styles.warningLabel}>إرشادات مهمة</Text>
                        <Text style={styles.warningText}>• احضر بطاقة الهوية الوطنية</Text>
                        <Text style={styles.warningText}>• تجنب الأكل قبل الفحص بساعة</Text>
                    </View>

                    <Pressable style={styles.confirmBtn} onPress={onConfirm}>
                        <Text style={styles.confirmBtnText}>تأكيد النهائي</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(15,23,42,0.6)",
        justifyContent: "center",
        padding: 16,
    },
    modal: {
        backgroundColor: "#f8fafc",
        borderRadius: 28,
        padding: 20,
    },
    closeBtn: {
        alignSelf: "flex-start",
        marginBottom: 0,
    },
    closeBtnText: {
        fontSize: 30,
        color: "#444",
    },
    title: {
        fontSize: 22,
        fontWeight: "900",
        color: "#0f172a",
        textAlign: "right",
        marginBottom: 16,
    },
    box: {
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
    },
    greenBox: {
        backgroundColor: "#eef9f0",
        borderWidth: 1,
        borderColor: "#ccebd8",
    },
    greenLabel: {
        color: "#16a34a",
        fontSize: 14,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 6,
    },
    greenStrong: {
        color: "#056f2c",
        fontSize: 18,
        fontWeight: "900",
        textAlign: "right",
    },
    rowInfo: {
        gap: 12,
        marginBottom: 14,
    },
    infoItem: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
    },
    infoLabel: {
        color: "#64748b",
        fontSize: 13,
        fontWeight: "700",
        textAlign: "right",
        marginBottom: 6,
    },
    infoStrong: {
        color: "#111827",
        fontSize: 16,
        fontWeight: "900",
        textAlign: "right",
    },
    blueStrong: {
        color: "#2563eb",
    },
    locationBox: {
        backgroundColor: "#eef4ff",
        borderWidth: 1,
        borderColor: "#dbe7ff",
    },
    locationLabel: {
        color: "#2563eb",
        fontSize: 14,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 6,
    },
    locationStrong: {
        color: "#2563eb",
        fontSize: 14,
        fontWeight: "800",
        textAlign: "right",
    },
    warningBox: {
        backgroundColor: "#fff8e8",
        borderWidth: 1,
        borderColor: "#f1dfb5",
    },
    warningLabel: {
        color: "#5f3802",
        fontSize: 14,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 6,
    },
    warningText: {
        color: "#9a5a00",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
        marginBottom: 4,
    },
    confirmBtn: {
        height: 52,
        borderRadius: 30,
        backgroundColor: "#16a34a",
        alignItems: "center",
        justifyContent: "center",
    },
    confirmBtnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "900",
    },
});