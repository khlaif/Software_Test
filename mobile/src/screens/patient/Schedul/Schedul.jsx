import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    Pressable,
    ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

import CalendarIcon from "../../../../assets/images/calendar-check.svg";
import ClockIcon from "../../../../assets/images/clock.svg";
import AlertIcon from "../../../../assets/images/circle-alert.svg";
import LocationIcon from "../../../../assets/images/map-pin.svg";
import DoctorIcon from "../../../../assets/images/stethoscope.svg";

import ChangeAppointmentModal from "./sections/ChangeAppointmentModal";
import ConfirmAppointmentModal from "./sections/ConfirmAppointmentModal";
import styles from "./SchedulStyle";

import { getPreTestInstructions } from "../../../services/api";

export default function Schedul() {
    const [appointments, setAppointments] = useState([]);
    const [changeModalAppointment, setChangeModalAppointment] = useState(null);
    const [confirmModalAppointment, setConfirmModalAppointment] = useState(null);

    const [instructions, setInstructions] = useState([]);
    const [instructionsLoading, setInstructionsLoading] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                const appointmentsFromParams = route.params?.appointments;

                if (appointmentsFromParams && Array.isArray(appointmentsFromParams)) {
                    setAppointments(appointmentsFromParams);
                    await AsyncStorage.setItem(
                        "scheduled_appointments",
                        JSON.stringify(appointmentsFromParams)
                    );
                    return;
                }

                const savedAppointments = await AsyncStorage.getItem("scheduled_appointments");
                if (savedAppointments) {
                    setAppointments(JSON.parse(savedAppointments));
                }
            } catch (error) {
                console.log("Error loading appointments:", error);
            }
        };

        loadAppointments();
    }, [route.params]);

    useEffect(() => {
        const loadInstructions = async () => {
            try {
                if (!appointments.length) {
                    setInstructions([]);
                    return;
                }

                const testNames = appointments
                    .filter((item) => item.appointmentType === "test")
                    .map((item) => item.title)
                    .filter(Boolean);

                if (!testNames.length) {
                    setInstructions([]);
                    return;
                }

                setInstructionsLoading(true);

                const response = await getPreTestInstructions(testNames);

                setInstructions(Array.isArray(response?.instructions) ? response.instructions : []);
            } catch (error) {
                console.log("Error loading pre-test instructions:", error);
                setInstructions([]);
            } finally {
                setInstructionsLoading(false);
            }
        };

        loadInstructions();
    }, [appointments]);

    const handleSaveNewAppointment = async (appointmentId, updatedData) => {
        const updatedAppointments = appointments.map((item) =>
            item.id === appointmentId
                ?{
                    ...item,
                    ...updatedData,
                    status: "pending",
                    statusLabel: "قيد التأكيد",
                    actions: ["change", "confirm"],
                }
                : item
        );

        setAppointments(updatedAppointments);
        await AsyncStorage.setItem(
            "scheduled_appointments",
            JSON.stringify(updatedAppointments)
        );
        setChangeModalAppointment(null);
    };

    const handleFinalConfirm = async (appointmentId) => {
        const updatedAppointments = appointments.map((item) =>
            item.id === appointmentId
                ?{
                    ...item,
                    status: "confirmed",
                    statusLabel: "مؤكد",
                    actions: ["change"],
                }
                : item
        );

        setAppointments(updatedAppointments);
        await AsyncStorage.setItem(
            "scheduled_appointments",
            JSON.stringify(updatedAppointments)
        );
        setConfirmModalAppointment(null);
    };

    const scheduleStats = useMemo(() => {
        const savedTime = appointments.length * 15;

        return {
            savedTime,
            description:
                appointments.length > 0
                    ? `بفضل التنسيق الذكي، تم ترتيب ${appointments.length} مواعيد بشكل متسلسل بعد تحليل الحالة وتجنب التعارض بينها.`
                    : "لا توجد مواعيد مجدولة حالياً.",
        };
    }, [appointments]);

    return (
        <View style={styles.page}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.headerTopRow}>
                        <View style={styles.headerTop}>
                            <CalendarIcon width={18} height={18} />
                            <Text style={styles.headerLabel}>إدارة المواعيد الذكية</Text>
                        </View>

                        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
                            <Text style={styles.backBtnText}>العودة</Text>
                        </Pressable>
                    </View>

                    <Text style={styles.headerTitle}>جدول مواعيدك الشخصية</Text>
                    <Text style={styles.headerSubtitle}>
                        قام النظام بتنسيق هذه المواعيد لضمان أقل وقت انتظار ممكن، مع جدولة
                        موعد الطبيب بعد الانتهاء من الفحوصات المطلوبة.
                    </Text>
                </View>

                <View style={styles.sectionTitleWrap}>
                    <Text style={styles.sectionTitle}>المواعيد المجدولة</Text>
                </View>

                <View style={styles.appointmentsList}>
                    {appointments.length === 0 ? (
                        <View style={styles.emptyCard}>
                            <Text style={styles.emptyCardText}>لا توجد مواعيد لعرضها حالياً.</Text>
                        </View>
                    ) : (
                        appointments.map((appointment) => (
                            <View
                                key={appointment.id}
                                style={[
                                    styles.appointmentCard,
                                    appointment.status === "confirmed" &&
                                        styles.appointmentCardConfirmed,
                                    appointment.status === "suggested" &&
                                        styles.appointmentCardSuggested,
                                ]}
                            >
                                <View style={styles.timeBox}>
                                    <Text style={styles.appointmentDate}>{appointment.date}</Text>
                                    <Text style={styles.appointmentTime}>{appointment.time}</Text>
                                </View>

                                <View style={styles.appointmentBody}>
                                    <View style={styles.titleRow}>
                                        <View
                                            style={[
                                                styles.badge,
                                                appointment.status === "confirmed" &&
                                                    styles.badgeConfirmed,
                                                appointment.status === "pending" &&
                                                    styles.badgePending,
                                                appointment.status === "suggested" &&
                                                    styles.badgeSuggested,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.badgeText,
                                                    appointment.status === "confirmed" &&
                                                        styles.badgeTextConfirmed,
                                                    appointment.status === "pending" &&
                                                        styles.badgeTextPending,
                                                    appointment.status === "suggested" &&
                                                        styles.badgeTextSuggested,
                                                ]}
                                            >
                                                {appointment.statusLabel}
                                            </Text>
                                        </View>

                                        <Text style={styles.appointmentTitle}>
                                            {appointment.title}
                                        </Text>
                                    </View>

                                    <View style={styles.metaRow}>
                                        <LocationIcon width={16} height={16} />
                                        <Text style={styles.metaText}>
                                            {appointment.location ||
                                                "سيتم تحديد الموقع من قاعدة البيانات"}
                                        </Text>
                                    </View>

                                    {appointment.doctor ? (
                                        <View style={styles.metaRow}>
                                            <DoctorIcon width={16} height={16} />
                                            <Text style={styles.doctorText}>
                                                {appointment.doctor}
                                            </Text>
                                        </View>
                                    ) : null}

                                    <View style={styles.actionsRow}>
                                        {appointment.actions?.includes("change") && (
                                            <Pressable
                                                style={styles.outlineBtn}
                                                onPress={() =>
                                                    setChangeModalAppointment(appointment)
                                                }
                                            >
                                                <Text style={styles.outlineBtnText}>
                                                    تغيير الموعد
                                                </Text>
                                            </Pressable>
                                        )}

                                        {appointment.actions?.includes("confirm") && (
                                            <Pressable
                                                style={styles.primaryBtn}
                                                onPress={() =>
                                                    setConfirmModalAppointment(appointment)
                                                }
                                            >
                                                <Text style={styles.primaryBtnText}>
                                                    تأكيد الموعد
                                                </Text>
                                            </Pressable>
                                        )}
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </View>

                <View style={[styles.card, styles.summaryCard]}>
                    <View style={styles.cardTitleRow}>
                        <ClockIcon width={18} height={18} />
                        <Text style={styles.cardTitle}>توفير الوقت اليوم</Text>
                    </View>

                    <Text style={styles.summaryNumber}>{scheduleStats.savedTime} دقيقة</Text>
                    <Text style={styles.summaryText}>{scheduleStats.description}</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardTitleRow}>
                        <AlertIcon width={18} height={18} />
                        <Text style={styles.cardTitle}>إرشادات ما قبل الفحص</Text>
                    </View>

                    <View style={styles.instructionsWrap}>
                        {instructionsLoading ? (
                            <Text style={styles.emptyInstructionText}>
                                جارِ تحميل الإرشادات...
                            </Text>
                        ) : instructions.length === 0 ? (
                            <Text style={styles.emptyInstructionText}>
                                لا توجد إرشادات متاحة حاليًا لهذه الفحوصات.
                            </Text>
                        ) : (
                            instructions.map((item, index) => (
                                <View
                                    key={item.id || index}
                                    style={[
                                        styles.instructionItem,
                                        item.type === "warning"
                                            ? styles.instructionWarning
                                            : styles.instructionInfo,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.instructionText,
                                            item.type === "warning"
                                                ? styles.instructionWarningText
                                                : styles.instructionInfoText,
                                        ]}
                                    >
                                        • {item.text}
                                    </Text>
                                </View>
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>

            {changeModalAppointment ? (
                <ChangeAppointmentModal
                    appointment={changeModalAppointment}
                    onClose={() => setChangeModalAppointment(null)}
                    onSave={(updatedData) =>
                        handleSaveNewAppointment(changeModalAppointment.id, updatedData)
                    }
                />
            ) : null}

            {confirmModalAppointment ? (
                <ConfirmAppointmentModal
                    appointment={confirmModalAppointment}
                    onClose={() => setConfirmModalAppointment(null)}
                    onConfirm={() => handleFinalConfirm(confirmModalAppointment.id)}
                />
            ) : null}
        </View>
    );
}