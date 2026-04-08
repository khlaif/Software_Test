import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Pressable,
    TextInput,
    Switch,
    ScrollView,
} from "react-native";
import styles from "../DoctorDashboardStyle";

const OfficeHoursTab = () => {
    const [weeklySchedule, setWeeklySchedule] = useState([
        {
            id: 1,
            day: "السبت",
            enabled: true,
            from: "09:00",
            to: "12:00",
            sessionDuration: 60,
            bookedAppointments: 0,
        },
        {
            id: 2,
            day: "الأحد",
            enabled: true,
            from: "14:00",
            to: "17:00",
            sessionDuration: 60,
            bookedAppointments: 0,
        },
        {
            id: 3,
            day: "الاثنين",
            enabled: false,
            from: "",
            to: "",
            sessionDuration: 30,
            bookedAppointments: 0,
        },
        {
            id: 4,
            day: "الثلاثاء",
            enabled: true,
            from: "10:00",
            to: "13:00",
            sessionDuration: 90,
            bookedAppointments: 0,
        },
        {
            id: 5,
            day: "الأربعاء",
            enabled: true,
            from: "15:00",
            to: "18:00",
            sessionDuration: 60,
            bookedAppointments: 0,
        },
        {
            id: 6,
            day: "الخميس",
            enabled: false,
            from: "",
            to: "",
            sessionDuration: 30,
            bookedAppointments: 0,
        },
        {
            id: 7,
            day: "الجمعة",
            enabled: false,
            from: "",
            to: "",
            sessionDuration: 30,
            bookedAppointments: 0,
        },
    ]);

    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        enabled: false,
        from: "",
        to: "",
        sessionDuration: "30",
    });

    const convertTimeToMinutes = (time) => {
        if (!time) return 0;
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const convertMinutesToHoursText = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0 && mins > 0) return `${hours} ساعة و ${mins} دقيقة`;
        if (hours > 0) return `${hours} ساعة`;
        return `${mins} دقيقة`;
    };

    const calculateAvailableSlots = (day) => {
        if (!day.enabled || !day.from || !day.to || !day.sessionDuration) return 0;

        const start = convertTimeToMinutes(day.from);
        const end = convertTimeToMinutes(day.to);

        if (end <= start) return 0;

        const totalMinutes = end - start;
        return Math.floor(totalMinutes / day.sessionDuration);
    };

    const getDayDurationMinutes = (day) => {
        if (!day.enabled || !day.from || !day.to) return 0;

        const start = convertTimeToMinutes(day.from);
        const end = convertTimeToMinutes(day.to);

        if (end <= start) return 0;

        return end - start;
    };

    const getStatusLabel = (enabled) => (enabled ? "فعّال" : "معطّل");
    const getStatusTypeStyle = (enabled) =>
        enabled ? styles.officeStatusBadgeActive : styles.officeStatusBadgeInactive;

    const openEditModal = (day) => {
        setSelectedDay(day);
        setEditForm({
            enabled: day.enabled,
            from: day.from || "",
            to: day.to || "",
            sessionDuration: String(day.sessionDuration || 30),
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDay(null);
    };

    const handleSaveChanges = () => {
        if (!selectedDay) return;

        setWeeklySchedule((prev) =>
            prev.map((day) => {
                if (day.id !== selectedDay.id) return day;

                if (!editForm.enabled) {
                    return {
                        ...day,
                        enabled: false,
                        from: "",
                        to: "",
                        sessionDuration: 30,
                    };
                }

                return {
                    ...day,
                    enabled: true,
                    from: editForm.from,
                    to: editForm.to,
                    sessionDuration: Number(editForm.sessionDuration) || 30,
                };
            })
        );

        closeModal();
    };

    const weeklyStats = useMemo(() => {
        let totalMinutes = 0;
        let totalAvailableAppointments = 0;
        let totalBookedAppointments = 0;
        let activeDaysCount = 0;

        weeklySchedule.forEach((day) => {
            if (day.enabled) {
                activeDaysCount += 1;
                totalMinutes += getDayDurationMinutes(day);
                totalAvailableAppointments += calculateAvailableSlots(day);
                totalBookedAppointments += day.bookedAppointments || 0;
            }
        });

        const totalFreeAppointments = totalAvailableAppointments - totalBookedAppointments;
        const occupancyRate =
            totalAvailableAppointments > 0
                ? Math.round((totalBookedAppointments / totalAvailableAppointments) * 100)
                : 0;

        return [
            {
                id: 1,
                label: "معدل الإشغال",
                value: `${occupancyRate}%`,
                type: styles.officeStatPurple,
            },
            {
                id: 2,
                label: "المواعيد المحجوزة",
                value: `${totalBookedAppointments} مواعيد`,
                type: styles.officeStatOrange,
            },
            {
                id: 3,
                label: "المواعيد المتاحة",
                value: `${totalFreeAppointments} موعد`,
                type: styles.officeStatGreen,
            },
            {
                id: 4,
                label: "إجمالي الساعات",
                value: convertMinutesToHoursText(totalMinutes),
                type: styles.officeStatBlue,
            },
        ];
    }, [weeklySchedule]);

    return (
        <View style={styles.tabContentCard}>
            <Text style={styles.sectionTitle}>إدارة الساعات المكتبية</Text>

            <View style={styles.officeInfoCard}>
                <Text style={styles.officeInfoTitle}>عن الساعات المكتبية</Text>
                <Text style={styles.officeInfoText}>
                    حدد أوقات استقبال الاستشارات عن بُعد. سيتمكن المرضى من حجز
                    مواعيد خلال هذه الأوقات فقط.
                </Text>
            </View>

            <View style={styles.officeSectionBlock}>
                <Text style={styles.officeSubTitle}>جدول الاستقبال الأسبوعي</Text>

                {weeklySchedule.map((item) => {
                    const slots = calculateAvailableSlots(item);

                    return (
                        <View key={item.id} style={styles.officeDayCard}>
                            <View style={styles.officeDayMain}>
                                <View style={styles.officeDayHeaderRow}>
                                    <Text style={styles.officeDayName}>{item.day}</Text>
                                    <View style={[styles.officeStatusBadge, getStatusTypeStyle(item.enabled)]}>
                                        <Text style={styles.officeStatusBadgeText}>
                                            {getStatusLabel(item.enabled)}
                                        </Text>
                                    </View>
                                </View>

                                {item.enabled ? (
                                    <View style={styles.officeTimeRow}>
                                        <Text style={styles.officeTimeText}>🕒 {item.from}</Text>
                                        <Text style={styles.officeTimeSeparator}>-</Text>
                                        <Text style={styles.officeTimeText}>🕒 {item.to}</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.officeDisabledText}>
                                        لا يوجد استقبال في هذا اليوم
                                    </Text>
                                )}

                                {item.enabled && (
                                    <Text style={styles.officeSlotsText}>
                                        {slots} مواعيد متاحة • مدة الجلسة {item.sessionDuration} دقيقة
                                    </Text>
                                )}
                            </View>

                            <TouchableOpacity
                                style={styles.officeEditBtn}
                                activeOpacity={0.88}
                                onPress={() => openEditModal(item)}
                            >
                                <Text style={styles.officeEditBtnText}>تعديل</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>

            <View style={styles.officeSectionBlock}>
                <Text style={styles.officeSubTitle}>إحصائيات الأسبوع</Text>

                <View style={styles.officeStatsGrid}>
                    {weeklyStats.map((item) => (
                        <View key={item.id} style={[styles.officeStatCard, item.type]}>
                            <Text style={styles.officeStatLabel}>{item.label}</Text>
                            <Text style={styles.officeStatValue}>{item.value}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <Modal
                visible={isModalOpen}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <Pressable style={styles.modalOverlay} onPress={closeModal}>
                    <Pressable
                        style={styles.officeModalCard}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {selectedDay ? `تعديل ساعات ${selectedDay.day}` : "تعديل الساعات"}
                            </Text>

                            <TouchableOpacity onPress={closeModal}>
                                <Text style={styles.modalCloseText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.officeSwitchRow}>
                            <Text style={styles.officeSwitchLabel}>
                                تفعيل الاستقبال في هذا اليوم
                            </Text>
                            <Switch
                                value={editForm.enabled}
                                onValueChange={(value) =>
                                    setEditForm((prev) => ({
                                        ...prev,
                                        enabled: value,
                                        from:
                                            value && !prev.from
                                                ? "09:00"
                                                : value
                                                    ? prev.from
                                                    : prev.from,
                                        to:
                                            value && !prev.to
                                                ? "12:00"
                                                : value
                                                    ? prev.to
                                                    : prev.to,
                                        sessionDuration:
                                            value && !prev.sessionDuration
                                                ? "30"
                                                : prev.sessionDuration,
                                    }))
                                }
                            />
                        </View>

                        {editForm.enabled && (
                            <>
                                <View style={styles.officeFormGroup}>
                                    <Text style={styles.officeInputLabel}>وقت البداية</Text>
                                    <TextInput
                                        value={editForm.from}
                                        onChangeText={(text) =>
                                            setEditForm((prev) => ({ ...prev, from: text }))
                                        }
                                        placeholder="مثال: 09:00"
                                        placeholderTextColor="#94a3b8"
                                        style={styles.officeTextInput}
                                        textAlign="right"
                                    />
                                </View>

                                <View style={styles.officeFormGroup}>
                                    <Text style={styles.officeInputLabel}>وقت النهاية</Text>
                                    <TextInput
                                        value={editForm.to}
                                        onChangeText={(text) =>
                                            setEditForm((prev) => ({ ...prev, to: text }))
                                        }
                                        placeholder="مثال: 12:00"
                                        placeholderTextColor="#94a3b8"
                                        style={styles.officeTextInput}
                                        textAlign="right"
                                    />
                                </View>

                                <View style={styles.officeFormGroup}>
                                    <Text style={styles.officeInputLabel}>مدة الجلسة (دقائق)</Text>
                                    <TextInput
                                        value={editForm.sessionDuration}
                                        onChangeText={(text) =>
                                            setEditForm((prev) => ({
                                                ...prev,
                                                sessionDuration: text.replace(/[^0-9]/g, ""),
                                            }))
                                        }
                                        placeholder="30"
                                        placeholderTextColor="#94a3b8"
                                        keyboardType="numeric"
                                        style={styles.officeTextInput}
                                        textAlign="right"
                                    />
                                </View>
                            </>
                        )}

                        <View style={styles.officeModalActions}>
                            <TouchableOpacity
                                style={styles.officeSaveBtn}
                                activeOpacity={0.88}
                                onPress={handleSaveChanges}
                            >
                                <Text style={styles.officeSaveBtnText}>حفظ التغييرات</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.officeCancelBtn}
                                activeOpacity={0.88}
                                onPress={closeModal}
                            >
                                <Text style={styles.officeCancelBtnText}>إلغاء</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

export default OfficeHoursTab;