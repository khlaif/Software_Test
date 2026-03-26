import React, { useMemo, useState } from "react";
import penicon from "../../../assets/pen-line.svg";
import clockiconblue from "../../../assets/clock.svg"

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
        sessionDuration: 30,
    });

    const convertTimeToMinutes = (time) => {
        if (!time) return 0;
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const convertMinutesToHoursText = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0 && mins > 0) {
            return `${hours} ساعة و ${mins} دقيقة`;
        }
        if (hours > 0) {
            return `${hours} ساعة`;
        }
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
    const getStatusType = (enabled) => (enabled ? "active" : "inactive");

    const openEditModal = (day) => {
        setSelectedDay(day);
        setEditForm({
            enabled: day.enabled,
            from: day.from || "",
            to: day.to || "",
            sessionDuration: day.sessionDuration || 30,
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
                    sessionDuration: Number(editForm.sessionDuration),
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
                type: "purple",
            },
            {
                id: 2,
                label: "المواعيد المحجوزة",
                value: `${totalBookedAppointments} مواعيد`,
                type: "orange",
            },
            {
                id: 3,
                label: "المواعيد المتاحة",
                value: `${totalFreeAppointments} موعد`,
                type: "green",
            },
            {
                id: 4,
                label: "إجمالي الساعات",
                value: convertMinutesToHoursText(totalMinutes),
                type: "blue",
            },
        ];
    }, [weeklySchedule]);

    return (
        <div className="office-hours-section">
            <h2 className="section-title">إدارة الساعات المكتبية</h2>

            <div className="office-hours-wrapper">
                <div className="office-hours-info-card">
                    <h3>عن الساعات المكتبية</h3>
                    <p>
                        حدد أوقات استقبال الاستشارات عن بُعد. سيتمكن المرضى من حجز
                        مواعيد خلال هذه الأوقات فقط.
                    </p>
                </div>

                <div className="office-hours-schedule">
                    <h3 className="office-subtitle">جدول الاستقبال الأسبوعي</h3>

                    <div className="office-days-list">
                        {weeklySchedule.map((item) => {
                            const slots = calculateAvailableSlots(item);

                            return (
                                <div className="office-day-card" key={item.id}>
                                    <div className="office-day-main">
                                        <div className="office-day-title-row">
                                            <h4>{item.day}</h4>
                                            <span className={`office-status-badge ${getStatusType(item.enabled)}`}>
                                                {getStatusLabel(item.enabled)}
                                            </span>
                                        </div>

                                        {item.enabled && (
                                            <div className="office-day-time-row">
                                                <span>
                                                    <img src={clockiconblue} alt="" />
                                                    {item.from}
                                                </span>
                                                <span className="office-time-separator">-</span>
                                                <span>
                                                    <img src={clockiconblue} alt="" />
                                                    {item.to}
                                                </span>
                                                <span className="office-slots-text">
                                                    ({slots} مواعيد متاحة)
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className="office-edit-btn"
                                        onClick={() => openEditModal(item)}
                                    >
                                        <img src={penicon} alt="" />
                                        تعديل
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="office-stats-section">
                    <h3 className="office-subtitle office-stats-title">إحصائيات الأسبوع</h3>

                    <div className="office-stats-grid">
                        {weeklyStats.map((item) => (
                            <div className={`office-stat-card ${item.type}`} key={item.id}>
                                <p>{item.label}</p>
                                <h4>{item.value}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && selectedDay && (
                <div className="office-modal-overlay" onClick={closeModal}>
                    <div
                        className="office-modal-box"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="office-modal-close" onClick={closeModal}>
                            ×
                        </button>

                        <h2 className="office-modal-title">
                            تعديل ساعات {selectedDay.day}
                        </h2>

                        {!selectedDay.enabled ? (
                            <>
                                <div className="office-modal-toggle-row">
                                    <label className="office-checkbox-row">
                                        <span>تفعيل الاستقبال في هذا اليوم</span>
                                        <input
                                            type="checkbox"
                                            checked={editForm.enabled}
                                            onChange={(e) =>
                                                setEditForm((prev) => ({
                                                    ...prev,
                                                    enabled: e.target.checked,
                                                    from: "09:00",
                                                    to: "12:00",
                                                    sessionDuration: 30,
                                                }))
                                            }
                                        />
                                    </label>
                                </div>

                                <div className="office-modal-actions">
                                    <button
                                        className="office-save-btn"
                                        onClick={handleSaveChanges}
                                    >
                                        حفظ التغييرات
                                    </button>
                                    <button
                                        className="office-cancel-btn"
                                        onClick={closeModal}
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="office-modal-toggle-row">
                                    <label className="office-checkbox-row">
                                        <span>تفعيل الاستقبال في هذا اليوم</span>
                                        <input
                                            type="checkbox"
                                            checked={editForm.enabled}
                                            onChange={(e) =>
                                                setEditForm((prev) => ({
                                                    ...prev,
                                                    enabled: e.target.checked,
                                                }))
                                            }
                                        />
                                    </label>
                                </div>

                                {editForm.enabled && (
                                    <>
                                        <div className="office-form-group">
                                            <label>وقت البداية</label>
                                            <input
                                                type="time"
                                                value={editForm.from}
                                                onChange={(e) =>
                                                    setEditForm((prev) => ({
                                                        ...prev,
                                                        from: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>

                                        <div className="office-form-group">
                                            <label>وقت النهاية</label>
                                            <input
                                                type="time"
                                                value={editForm.to}
                                                onChange={(e) =>
                                                    setEditForm((prev) => ({
                                                        ...prev,
                                                        to: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>

                                        <div className="office-form-group">
                                            <label>مدة الجلسة (دقائق)</label>
                                            <input
                                                type="number"
                                                min="15"
                                                step="5"
                                                value={editForm.sessionDuration}
                                                onChange={(e) =>
                                                    setEditForm((prev) => ({
                                                        ...prev,
                                                        sessionDuration: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="office-modal-actions">
                                    <button
                                        className="office-save-btn"
                                        onClick={handleSaveChanges}
                                    >
                                        حفظ التغييرات
                                    </button>
                                    <button
                                        className="office-cancel-btn"
                                        onClick={closeModal}
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OfficeHoursTab;