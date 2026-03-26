import React from "react";
import { useNavigate } from "react-router-dom";
import clockicon from "../../../assets/clock.svg";

const ConsultationTab = ({ consultations = [] }) => {
    const navigate = useNavigate();

    const handleStartConsultation = (item) => {
        navigate("/video-call-doctor", {
            state: { consultation: item },
        });
    };

    return (
        <div className="consultation-section">
            <h2 className="section-title">جدول الاستشارات عن بُعد</h2>

            <div className="consultation-list">
                {consultations.map((item) => (
                    <div className="consultation-card" key={item.id}>
                        <div className="consultation-info">
                            <h3>{item.patientName}</h3>
                            <p className="consultation-time">
                                <img src={clockicon} alt="" />
                                {item.time}
                            </p>
                            <p>موضوع: {item.topic}</p>
                            <p>المدة: {item.duration}</p>
                        </div>

                        <div className="consultation-status-wrapper">
                            <span className={`consultation-status ${item.statusType}`}>
                                {item.status}
                            </span>
                        </div>

                        <div className="consultation-day">
                            <span>{item.dayLabel}</span>
                        </div>

                        <div className="consultation-actions">
                            {item.canCall && (
                                <button
                                    className="consult-btn consult-btn-success"
                                    onClick={() => handleStartConsultation(item)}
                                >
                                    استقبال
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {consultations.length === 0 && (
                    <div className="tab-placeholder">
                        <h3>لا توجد استشارات حالياً</h3>
                        <p>سيتم عرض الحجوزات القادمة هنا عند توفرها.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultationTab;