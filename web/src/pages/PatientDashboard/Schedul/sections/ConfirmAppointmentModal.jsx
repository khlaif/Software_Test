import React from "react";
import checkicon from "../../../../assets/circle-check.svg"

function ConfirmAppointmentModal({ appointment, onClose, onConfirm }) {
    return (
        <div className="schedul-modalOverlay" onClick={onClose}>
            <div className="schedul-modal" onClick={(e) => e.stopPropagation()} dir="rtl">
                <button className="schedul-modal__close" onClick={onClose}>
                    ×
                </button>

                <h2 className="schedul-modal__title">
                    <img src={checkicon} alt="" />
                    تأكيد موعد الفحص
                </h2>

                <div className="schedul-modal__box schedul-modal__box--green">
                    <span className="schedul-modal__labelGreen">نوع الفحص</span>
                    <strong>{appointment.title}</strong>
                </div>

                <div className="schedul-modal__rowInfo">
                    <div>
                        <span>التاريخ</span>
                        <strong>{appointment.date}</strong>
                    </div>

                    <div>
                        <span>الوقت</span>
                        <strong className="blue">{appointment.time}</strong>
                    </div>
                </div>

                <div className="schedul-modal__box schedul-modal__box--location">
                    <span>الموقع </span>
                    <strong>{appointment.location}</strong>
                </div>

                <div className="schedul-modal__box schedul-modal__box--warning">
                    <span>إرشادات مهمة</span>
                    <ul>
                        <li>احضر بطاقة الهوية الوطنية</li>
                        <li>تجنب الأكل قبل الفحص بساعة</li>
                    </ul>
                </div>

                <button className="schedul-modal__confirmBtn" onClick={onConfirm}>
                    تأكيد النهائي
                </button>
            </div>
        </div>
    );
}

export default ConfirmAppointmentModal;