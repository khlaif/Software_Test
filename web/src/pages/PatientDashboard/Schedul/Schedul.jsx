import React, { useState } from "react";
import "./Schedul.css";
import { useNavigate } from "react-router-dom";

import calendarIcon from "../../../assets/calendar-check.svg"
import clockIcon from "../../../assets/clock.svg"
import alertIcon from "../../../assets/circle-alert.svg"
import locationIcon from "../../../assets/map-pin.svg"
import doctorIcon from "../../../assets/stethoscope.svg"
import checkicon from "../../../assets/check_w.svg"
import penicon from "../../../assets/pen-line.svg"

import ChangeAppointmentModal from "./sections/ChangeAppointmentModal";
import ConfirmAppointmentModal from "./sections/ConfirmAppointmentModal";

const scheduleStats = {
    savedTime: 45,
    description:
        "بفضل التنسيق الذكي، قمت بتوفير 45 دقيقة من وقت الانتظار المتوقع.",
};

const instructions = [
    {
        id: 1,
        type: "warning",
        text: "لفحص الدم: يرجى الصيام لمدة 8 ساعات قبل الموعد.",
    },
    {
        id: 2,
        type: "info",
        text: "لتخطيط القلب: تجنب شرب الكافيين قبل ساعة من الفحص.",
    },
];

const initialAppointments = [
    {
        id: 1,
        title: "فحص دم شامل",
        location: "الطابق الأرضي | المختبر المركزي",
        doctor: null,
        date: "الأحد، 16 فبراير",
        time: "09:00 صباحاً",
        status: "suggested",
        statusLabel: "مقترح من النظام",
        actions: ["change", "confirm"],
    },
    {
        id: 2,
        title: "تخطيط القلب (ECG)",
        location: "الطابق الثاني - غرفة 204 | قسم الأشعة",
        doctor: null,
        date: "الأحد، 16 فبراير",
        time: "10:00 صباحاً",
        status: "pending",
        statusLabel: "قيد التأكيد",
        actions: ["change"],
    },
    {
        id: 3,
        title: "معاينة طبيب (مراجعة النتائج)",
        location: "الطابق الثالث - جناح A",
        doctor: "د. سامي خالد",
        date: "الأحد، 16 فبراير",
        time: "11:00 صباحاً",
        status: "confirmed",
        statusLabel: "مؤكد",
        actions: ["change"],
    },
];

function Schedul() {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [changeModalAppointment, setChangeModalAppointment] = useState(null);
    const [confirmModalAppointment, setConfirmModalAppointment] = useState(null);

    const navigate = useNavigate();

    const handleSaveNewAppointment = (appointmentId, updatedData) => {
        setAppointments((prev) =>
        prev.map((item) =>
            item.id === appointmentId ? { ...item, ...updatedData } : item
        )
        );
        setChangeModalAppointment(null);
    };

    const handleFinalConfirm = (appointmentId) => {
        setAppointments((prev) =>
        prev.map((item) =>
            item.id === appointmentId
            ? {
                ...item,
                status: "confirmed",
                statusLabel: "مؤكد",
                actions: ["change"],
                }
            : item
        )
        );
        setConfirmModalAppointment(null);
    };

    return (
        <div className="schedul-page">
            <div className="schedul-container">
                <div className="schedul-header">
                    
                    <div className="schedul-header__content">
                        <div className="schedul-header__top">
                            <span className="schedul-header__label">
                                <img src={calendarIcon} alt="calendar" />
                                إدارة المواعيد الذكية
                            </span>
                        </div>
                        <h1 className="schedul-header__title">جدول مواعيدك الشخصية</h1>
                        <p className="schedul-header__subtitle">
                            قام النظام بتنسيق هذه المواعيد لضمان أقل وقت انتظار ممكن وتجنب
                            التعارض بين الفحوصات.
                        </p>
                    </div>
                    <button className="tele__back" onClick={() => navigate("/dashboard")}>
                        العودة لوحة التحكم
                    </button>

                    
                </div>

                <div className="schedul-layout">
                    <main className="schedul-content">
                        <div className="schedul-sectionTitle">
                            <h2>مواعيد اليوم</h2>
                        </div>

                        <div className="schedul-appointments">
                            {appointments.map((appointment) => (
                                <div
                                    key={appointment.id}
                                    className={`appointment-card appointment-card--${appointment.status}`}
                                >
                                    <div className="appointment-card__timeBox">
                                        <span className="appointment-date">{appointment.date}</span>
                                        <strong className="appointment-time">{appointment.time}</strong>
                                    </div>

                                    <div className="appointment-card__body">
                                        <div className="appointment-info">
                                            <h3 className="appointment-info__title">{appointment.title}</h3>

                                            <div className="appointment-info__meta">
                                                <span>
                                                    <img src={locationIcon} alt="location" />
                                                    {appointment.location}
                                                </span>

                                                {appointment.doctor && (
                                                    <h2>
                                                        <img src={doctorIcon} alt="doctor" />
                                                        {appointment.doctor}
                                                    </h2>
                                                )}
                                            </div>
                                        </div>

                                        <div className="appointment-side">
                                            <div
                                                className={`appointment-badge appointment-badge--${appointment.status}`}
                                            >
                                                {appointment.statusLabel}
                                            </div>

                                            <div className="appointment-actions">
                                                {appointment.actions.includes("change") && (
                                                    <button
                                                        className="btn btn-outline"
                                                        onClick={() => setChangeModalAppointment(appointment)}
                                                    >
                                                        <img src={penicon} alt="Pen" />
                                                        تغيير الموعد
                                                    </button>
                                                )}

                                                {appointment.actions.includes("confirm") && (
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => setConfirmModalAppointment(appointment)}
                                                    >
                                                        <img src={checkicon} alt="Check" />
                                                        تأكيد الموعد
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>

                    <aside className="schedul-sidebar">
                        <div className="schedul-card schedul-card--summary">
                            <div className="schedul-card__titleRow">
                                <img src={clockIcon} alt="clock" />
                                <h3>توفير الوقت اليوم</h3>
                            </div>

                            <div className="schedul-summary__number">
                                {scheduleStats.savedTime} دقيقة
                            </div>

                            <p className="schedul-summary__text">{scheduleStats.description}</p>
                        </div>

                        <div className="schedul-card schedul-card--instructions">
                            <div className="schedul-card__titleRow">
                                <img src={alertIcon} alt="alert" />
                                <h3>إرشادات ما قبل الفحص</h3>
                            </div>

                            <div className="schedul-instructions">
                                {instructions.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`schedul-instruction schedul-instruction--${item.type}`}
                                    >
                                        <span className="schedul-instruction__bullet">•</span>
                                        <p>{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {changeModalAppointment && (
                <ChangeAppointmentModal
                appointment={changeModalAppointment}
                onClose={() => setChangeModalAppointment(null)}
                onSave={(updatedData) =>
                    handleSaveNewAppointment(changeModalAppointment.id, updatedData)
                }
                />
            )}

            {confirmModalAppointment && (
                <ConfirmAppointmentModal
                appointment={confirmModalAppointment}
                onClose={() => setConfirmModalAppointment(null)}
                onConfirm={() => handleFinalConfirm(confirmModalAppointment.id)}
                />
            )}
        </div>
    );
}

export default Schedul;