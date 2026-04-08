import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LabResultTab.css";

import clockIcon from "../../../assets/clock.svg";
import videoIcon from "../../../assets/video.svg";
import notesIcon from "../../../assets/file-text.svg";
// import labIcon from "../../../assets/flask-conical.svg";

const reports = [
    {
        id: 1,
        title: "تخطيط القلب(EGG)",
        value: "ST-Elevation",
        status: "مكتمل",
        statusType: "done",
        reportTitle: "التقرير الطبي الشامل",
        reportSubtitle: "فحص تخطيط القلب والبيانات السريرية",
        patient: {
            fullName: "سارة محمد علي",
            medicalId: "#12944",
            genderAge: "أنثى، 45 عاماً",
            birthDate: "15 مايو 1978",
        },
        examInfo: {
            examDate: "16 مارس 2026",
            labName: "قسم القلب",
            caseStatus: "مكتمل",
        },
        resultCards: [
            {
                id: 1,
                name: "معدل نبض القلب",
                statusLabel: "حرج",
                statusType: "critical",
                value: "122",
                unit: "bpm",
                normalRange: "60-100",
                icon: "warning",
            },
            {
                id: 2,
                name: "ارتفاع مقطع ST",
                statusLabel: "مرتفع",
                statusType: "warning",
                value: "موجود",
                unit: "",
                normalRange: "غير موجود",
                icon: "warning",
            },
        ],
        notes: [
            "أظهر التخطيط وجود ارتفاع في مقطع ST مما يستدعي المتابعة الفورية.",
            "معدل ضربات القلب أعلى من المعدل الطبيعي.",
        ],
        recommendations: {
            lifestyle: ["تقليل الجهد البدني إلى حين مراجعة الطبيب المختص."],
            followUp: ["مراجعة طبيب القلب بشكل عاجل."],
        },
        doctor: {
            name: "د. سامي خالد",
            specialty: "أخصائي أمراض القلب والأوعية الدموية",
            date: "16 مارس 2026",
            time: "14:30",
        },
    },
    {
        id: 2,
        title: "إنزيمات القلب",
        value: "--",
        status: "قيد الانتظار",
        statusType: "pending",
        reportTitle: "التقرير الطبي الشامل",
        reportSubtitle: "فحص إنزيمات القلب",
        patient: {
            fullName: "سارة محمد علي",
            medicalId: "#12944",
            genderAge: "أنثى، 45 عاماً",
            birthDate: "15 مايو 1978",
        },
        examInfo: {
            examDate: "16 مارس 2026",
            labName: "المختبر المركزي",
            caseStatus: "قيد الانتظار",
        },
        resultCards: [],
        notes: [
            "لم تصدر النتائج النهائية بعد.",
            "الحالة الحالية: قيد المعالجة داخل المختبر.",
        ],
        recommendations: {
            lifestyle: [],
            followUp: ["انتظار صدور النتائج النهائية ومراجعة الطبيب عند توفرها."],
        },
        doctor: {
            name: "د. سامي خالد",
            specialty: "أخصائي أمراض القلب والأوعية الدموية",
            date: "16 مارس 2026",
            time: "14:30",
        },
    },
];

const LabResultTab = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("lab");

    const openReport = (report) => {
        navigate(`/doctor/lab-report/${report.id}`, {
            state: { reportData: report },
        });
    };

    return (
        <div className="lab-tab-page" dir="rtl">

            {activeTab === "lab" && (
                <div className="lab-cards-grid">
                    {reports.map((report) => (
                        <div className="lab-result-card" key={report.id}>
                            <div className="lab-result-main">
                                <div className="lab-result-right">
                                    <h3>{report.title}</h3>
                                    <span
                                        className={`lab-status-badge ${
                                            report.statusType === "done" ? "done" : "pending"
                                        }`}
                                    >
                                        {report.status}
                                    </span>
                                </div>

                                <div className="lab-result-left">
                                    <strong
                                        className={
                                            report.statusType === "done"
                                                ? "lab-value danger"
                                                : "lab-value muted"
                                        }
                                    >
                                        {report.value}
                                    </strong>

                                    <button
                                        className="lab-report-link"
                                        type="button"
                                        onClick={() => openReport(report)}
                                    >
                                        عرض التقرير
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LabResultTab;