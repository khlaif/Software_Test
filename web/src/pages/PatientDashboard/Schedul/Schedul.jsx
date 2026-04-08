import React, { useEffect, useMemo, useState } from "react";
import "./Schedul.css";
import { useLocation, useNavigate } from "react-router-dom";

import calendarIcon from "../../../assets/calendar-check.svg";
import clockIcon from "../../../assets/clock.svg";
import alertIcon from "../../../assets/circle-alert.svg";
import locationIcon from "../../../assets/map-pin.svg";
import doctorIcon from "../../../assets/stethoscope.svg";
import checkicon from "../../../assets/check_w.svg";
import penicon from "../../../assets/pen-line.svg";

import ChangeAppointmentModal from "./sections/ChangeAppointmentModal";
import ConfirmAppointmentModal from "./sections/ConfirmAppointmentModal";

import { getPreTestInstructions } from "../../../services/api";

function Schedul() {
    const [appointments, setAppointments] = useState([]);
    const [changeModalAppointment, setChangeModalAppointment] = useState(null);
    const [confirmModalAppointment, setConfirmModalAppointment] = useState(null);

    const [instructions, setInstructions] = useState([]);
    const [instructionsLoading, setInstructionsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const appointmentsFromState = location.state?.appointments;

        if (appointmentsFromState && Array.isArray(appointmentsFromState)) {
            setAppointments(appointmentsFromState);
            localStorage.setItem("scheduled_appointments", JSON.stringify(appointmentsFromState));
            return;
        }

        const savedAppointments = localStorage.getItem("scheduled_appointments");
        if (savedAppointments) {
            setAppointments(JSON.parse(savedAppointments));
        }
    }, [location.state]);

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

    const handleSaveNewAppointment = (appointmentId, updatedData) => {
        setAppointments((prev) => {
            const updatedAppointments = prev.map((item) =>
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

            localStorage.setItem("scheduled_appointments", JSON.stringify(updatedAppointments));
            return updatedAppointments;
        });

        setChangeModalAppointment(null);
    };

    const handleFinalConfirm = (appointmentId) => {
        setAppointments((prev) => {
            const updatedAppointments = prev.map((item) =>
                item.id === appointmentId
                    ?{
                        ...item,
                        status: "confirmed",
                        statusLabel: "مؤكد",
                        actions: ["change"],
                    }
                    : item
            );

            localStorage.setItem("scheduled_appointments", JSON.stringify(updatedAppointments));
            return updatedAppointments;
        });

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
                            قام النظام بتنسيق هذه المواعيد لضمان أقل وقت انتظار ممكن، مع
                            جدولة موعد الطبيب بعد الانتهاء من الفحوصات المطلوبة.
                        </p>
                    </div>

                    <button className="tele__back" onClick={() => navigate("/dashboard")}>
                        العودة لوحة التحكم
                    </button>
                </div>

                <div className="schedul-layout">
                    <main className="schedul-content">
                        <div className="schedul-sectionTitle">
                            <h2>المواعيد المجدولة</h2>
                        </div>

                        <div className="schedul-appointments">
                            {appointments.length === 0 ? (
                                <div className="schedul-card">
                                    <p style={{ margin: 0, fontSize: "15px", color: "#6b7280" }}>
                                        لا توجد مواعيد لعرضها حالياً.
                                    </p>
                                </div>
                            ) : (
                                appointments.map((appointment) => (
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
                                                <h3 className="appointment-info__title">
                                                    {appointment.title}
                                                </h3>

                                                <div className="appointment-info__meta">
                                                    <span>
                                                        <img src={locationIcon} alt="location" />
                                                        {appointment.location || "سيتم تحديد الموقع من قاعدة البيانات"}
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
                                                    {appointment.actions?.includes("change") && (
                                                        <button
                                                            className="btn btn-outline"
                                                            onClick={() => setChangeModalAppointment(appointment)}
                                                        >
                                                            <img src={penicon} alt="Pen" />
                                                            تغيير الموعد
                                                        </button>
                                                    )}

                                                    {appointment.actions?.includes("confirm") && (
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
                                ))
                            )}
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
                                {instructionsLoading ? (
                                    <div className="schedul-instruction schedul-instruction--info">
                                        <span className="schedul-instruction__bullet">•</span>
                                        <p>جارِ تحميل الإرشادات...</p>
                                    </div>
                                ) : instructions.length === 0 ? (
                                    <div className="schedul-instruction schedul-instruction--info">
                                        <span className="schedul-instruction__bullet">•</span>
                                        <p>لا توجد إرشادات متاحة حاليًا لهذه الفحوصات.</p>
                                    </div>
                                ) : (
                                    instructions.map((item, index) => (
                                        <div
                                            key={item.id || index}
                                            className={`schedul-instruction schedul-instruction--${
                                                item.type === "warning" ? "warning" : "info"
                                            }`}
                                        >
                                            <span className="schedul-instruction__bullet">•</span>
                                            <p>{item.text}</p>
                                        </div>
                                    ))
                                )}
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