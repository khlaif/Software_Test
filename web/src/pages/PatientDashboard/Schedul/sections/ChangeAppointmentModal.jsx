import React, { useState } from "react";
import energyicon from "../../../../assets/zap.svg"

const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

function ChangeAppointmentModal({ appointment, onClose, onSave }) {
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
        <div className="schedul-modalOverlay" onClick={onClose}>
            <div className="schedul-modal" onClick={(e) => e.stopPropagation()} dir="rtl">
                
                <button className="schedul-modal__close" onClick={onClose}>
                    ×
                </button>
                <h2 className="schedul-modal__title">
                    <img src={energyicon} alt="Energy Icon" />
                    تغيير موعد الفحص
                </h2>

                

                <div className="schedul-modal__box schedul-modal__box--current">
                    <span className="schedul-modal__labelBlue">الفحص الحالي</span>
                    <strong>
                        {appointment.title} - {appointment.time}
                    </strong>
                </div>

                <label className="schedul-modal__label">اختر تاريخًا جديدًا</label>
                <input
                    type="date"
                    className="schedul-modal__input"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                />

                <label className="schedul-modal__label">اختر وقتًا جديدًا</label>
                <div className="schedul-timeGrid">
                    {availableTimes.map((time) => (
                        <button
                            key={time}
                            type="button"
                            className={`schedul-timeBtn ${selectedTime === time ? "active" : ""}`}
                            onClick={() => setSelectedTime(time)}
                            >
                            {time}
                        </button>
                    ))}
                </div>

                <div className="schedul-modal__note">
                    <span>ملاحظة</span>
                    <p>النظام يقترح عليك أقرب المواعيد المتاحة لتقليل وقت الانتظار</p>
                </div>

                <button className="schedul-modal__mainBtn" onClick={handleSave}>
                    حفظ الموعد الجديد
                </button>
            </div>
        </div>
    );
}

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

export default ChangeAppointmentModal;