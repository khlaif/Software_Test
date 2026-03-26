import React from "react";
import "./health-record.css";
import { useNavigate } from "react-router-dom";

import hearticon from "../../../assets/heart.svg"
import circlealerticon from "../../../assets/circle-alert.svg"
import activityblueicon from "../../../assets/activity_blue.svg"
import activitygreenicon from "../../../assets/activity_green.svg"
import calendericon from "../../../assets/calendar_blue.svg"
import alertredicon from "../../../assets/circle-alert_red.svg"
import dnaicon from "../../../assets/dna.svg"
import historyicon from "../../../assets/history.svg"


const patientData = {
    patientId: "PAT-99283#",
    title: "الملف الطبي الشامل",
    breadcrumb: "السجل الصحي البصري",
    bloodType: "+O",
    allergy: "البنسلين",
    height: "175",
    weight: "80",
};

const vitalCards = [
    {
        id: 1,
        label: "فصيلة الدم",
        value: patientData.bloodType || "--",
        icon: hearticon,
        iconClass: "vitalCard__icon--blood",
    },
    {
        id: 2,
        label: "الحساسية",
        value: patientData.allergy || "--",
        icon: circlealerticon,
        iconClass: "vitalCard__icon--allergy",
    },
    {
        id: 3,
        label: "الطول",
        value: patientData.height ? `${patientData.height} سم` : "--",
        icon: activityblueicon,
        iconClass: "vitalCard__icon--height",
    },
    {
        id: 4,
        label: "الوزن",
        value: patientData.weight ? `${patientData.weight} كجم` : "--",
        icon: activitygreenicon,
        iconClass: "vitalCard__icon--weight",
    },
];

const geneticIndicators = [
    {
        id: 1,
        label: "قابلية الإصابة بالسكري",
        value: 82,
        colorClass: "bar-warning",
    },
    {
        id: 2,
        label: "صحة القلب",
        value: 96,
        colorClass: "bar-success",
    },
];

const alerts = [
    {
        id: 1,
        text: "تجنب أدوية السلفا (حساسية مسجلة)",
        type: "danger",
    },
    {
        id: 2,
        text: "موعد فحص السكري القادم: 15 مارس",
        type: "info",
    },
];

const timelineData = [
    {
        id: 1,
        date: "15 فبراير 2026",
        title: "بداية المسار الحالي",
        description: "ألم في الصدر وضيق تنفّس",
        status: "قيد المتابعة",
        featured: true,
    },
    {
        id: 2,
        date: "12 يناير 2026",
        title: "فحص دوري",
        description: "ضغط الدم والسكري - نتائج طبيعية",
    },
    {
        id: 3,
        date: "20 نوفمبر 2025",
        title: "عملية جراحية",
        description: "استئصال الزائدة الدودية",
    },
    {
        id: 4,
        date: "05 سبتمبر 2025",
        title: "تطعيم إنفلونزا",
        description: "الجرعة السنوية",
    },
];

const HealthRecord = () => {
    const navigator = useNavigate();
    return (
        <div className="healthRecord" dir="rtl">
            <div className="healthRecord__container">
                <header className="healthRecord__header">
                    <div className="healthRecord__titleBox">
                        <div className="healthRecord__breadcrumb">
                            <img src={historyicon} alt="" />
                            <span>{patientData.breadcrumb}</span>
                        </div>
                        <h1>{patientData.title}</h1>
                    </div>

                    <div className="healthRecord__leftActions">
                        <button className="tele__back" onClick={() => navigator("/dashboard")}>
                            العودة للوحة التحكم
                        </button>

                        {/* <button className="healthRecord__patientId">
                            {patientData.patientId}
                        </button> */}
                    </div>
                </header>

                <section className="healthRecord__vitals">
                    {vitalCards.map((card) => (
                        <div className="vitalCard" key={card.id}>

                            <div className="vitalCard__iconWrap">
                                <div className={`vitalCard__icon ${card.iconClass}`}>
                                    <img src={card.icon} alt={card.label} />
                                </div>
                            </div>

                            <div className="vitalCard__content">
                                <p className="vitalCard__label">{card.label}</p>
                                <h3 className="vitalCard__value">{card.value}</h3>
                            </div>

                            
                        </div>
                    ))}
                </section>

                <section className="healthRecord__content">


                    <main className="healthRecord__timelineSection">
                        <div className="timelineSection__header">
                            <div className="timelineSection__title">
                                <img src={calendericon} alt="Calender" />
                                <h2>الخط الزمني للصحة</h2>
                            </div>
                        </div>

                        <div className="timeline">
                            <div className="timeline__line" />

                            {timelineData.map((item) => (
                                <div
                                    key={item.id}
                                    className={`timelineItem ${item.featured ? "timelineItem--featured" : ""}`}
                                >
                                    <div className="timelineItem__dateWrap">
                                        <div className="timelineItem__date">{item.date}</div>
                                    </div>

                                    <div className="timelineItem__dotWrap">
                                        <div className="timelineItem__dot" />
                                    </div>

                                    <div className="timelineItem__card">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>


                                        {item.status && (
                                            <div className="timelineItem__footer">
                                                <span className="timelineItem__status">{item.status}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>





                    <aside className="healthRecord__sidebar">
                        <div className="sideCard sideCard--soft">
                            <div className="sideCard__title">
                                <div className="sideCard__titleText">
                                    <img src={dnaicon} alt="DNA" />
                                    <h3>المؤشرات الجينية</h3>
                                </div>
                            </div>

                            <div className="geneticList">
                                {geneticIndicators.map((item) => (
                                    <div className="geneticItem" key={item.id}>
                                        <div className="geneticItem__row">
                                            <span>{item.label}</span>
                                        </div>
                                        <div className="geneticItem__track">
                                            <div
                                                className={`geneticItem__bar ${item.colorClass}`}
                                                style={{ width: `${item.value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sideCard">
                            <div className="sideCard__title sideCard__title--danger">
                                <img src={alertredicon} alt="Alert" />
                                <h3>تنبيهات هامة</h3>
                            </div>

                            <div className="alertsList">
                                {alerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`alertBadge alertBadge--${alert.type}`}
                                >
                                    {alert.text}
                                </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    
                </section>
            </div>
        </div>
    );
};

export default HealthRecord;