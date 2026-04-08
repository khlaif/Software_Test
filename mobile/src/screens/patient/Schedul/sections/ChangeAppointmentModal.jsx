import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
} from "react-native";

const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

function formatArabicDate(dateString) {
    const date = new Date(dateString);

    const days = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
    ];

    const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
    ];

    return `${days[date.getDay()]}، ${date.getDate()} ${months[date.getMonth()]}`;
}

function formatArabicTime(time24) {
    const [hourStr, minute] = time24.split(":");
    let hour = Number(hourStr);
    const period = hour >= 12 ? "مساءً" : "صباحاً";

    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;

    return `${String(hour).padStart(2, "0")}:${minute} ${period}`;
}

export default function ChangeAppointmentModal({ appointment, onClose, onSave }) {
    const [newDate, setNewDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const handleSave = () => {
        if (!newDate || !selectedTime) return;

        onSave({
            date: formatArabicDate(newDate),
            time: formatArabicTime(selectedTime),
        });
    };

    return (
        <Modal visible transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Pressable style={styles.closeBtn} onPress={onClose}>
                        <Text style={styles.closeBtnText}>×</Text>
                    </Pressable>

                    <Text style={styles.title}>تغيير موعد الفحص</Text>

                    <View style={[styles.box, styles.currentBox]}>
                        <Text style={styles.blueLabel}>الفحص الحالي</Text>
                        <Text style={styles.boxStrong}>
                            {appointment.title} - {appointment.time}
                        </Text>
                    </View>

                    <Text style={styles.label}>أدخل تاريخًا جديدًا (YYYY-MM-DD)</Text>
                    <TextInput
                        value={newDate}
                        onChangeText={setNewDate}
                        placeholder="2026-04-01"
                        placeholderTextColor="#94a3b8"
                        style={styles.input}
                        textAlign="right"
                    />

                    <Text style={styles.label}>اختر وقتًا جديدًا</Text>
                    <View style={styles.timeGrid}>
                        {availableTimes.map((time) => (
                            <Pressable
                                key={time}
                                style={[
                                    styles.timeBtn,
                                    selectedTime === time && styles.timeBtnActive,
                                ]}
                                onPress={() => setSelectedTime(time)}
                            >
                                <Text
                                    style={[
                                        styles.timeBtnText,
                                        selectedTime === time && styles.timeBtnTextActive,
                                    ]}
                                >
                                    {time}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.noteBox}>
                        <Text style={styles.noteTitle}>ملاحظة</Text>
                        <Text style={styles.noteText}>
                            النظام يقترح عليك أقرب المواعيد المتاحة لتقليل وقت الانتظار
                        </Text>
                    </View>

                    <Pressable style={styles.mainBtn} onPress={handleSave}>
                        <Text style={styles.mainBtnText}>حفظ الموعد الجديد</Text>
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
        marginBottom: 6,
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
    currentBox: {
        backgroundColor: "#eef4ff",
        borderWidth: 1,
        borderColor: "#dbe7ff",
    },
    blueLabel: {
        color: "#2563eb",
        fontSize: 14,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 6,
    },
    boxStrong: {
        color: "#111827",
        fontSize: 18,
        fontWeight: "900",
        textAlign: "right",
    },
    label: {
        color: "#111827",
        fontSize: 15,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: "#2563eb",
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        marginBottom: 14,
        color: "#111827",
    },
    timeGrid: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 14,
    },
    timeBtn: {
        width: "31%",
        height: 46,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: "#1e293b",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    timeBtnActive: {
        backgroundColor: "#2563eb",
        borderColor: "#2563eb",
    },
    timeBtnText: {
        color: "#111827",
        fontSize: 14,
        fontWeight: "700",
    },
    timeBtnTextActive: {
        color: "#fff",
    },
    noteBox: {
        backgroundColor: "#eef4ff",
        borderWidth: 1,
        borderColor: "#dbe7ff",
        borderRadius: 18,
        padding: 14,
        marginBottom: 16,
    },
    noteTitle: {
        color: "#2563eb",
        fontSize: 14,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 6,
    },
    noteText: {
        color: "#334155",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
    },
    mainBtn: {
        height: 52,
        borderRadius: 30,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
    },
    mainBtnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "900",
    },
});