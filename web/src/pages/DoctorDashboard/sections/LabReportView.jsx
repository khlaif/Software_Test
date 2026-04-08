import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./LabReportView.css";

import fileicon from "../../../assets/file-text_w.svg";
import usericon from "../../../assets/user_blue.svg";
import calendericon from "../../../assets/calendar_blue.svg";
import alerticon from "../../../assets/triangle-alert.svg";
import checkicon from "../../../assets/check_b.svg";
import lefticon from "../../../assets/arrow-left.svg";
import recomandationicon from "../../../assets/briefcase.svg";

const mockReports = {
    1: {
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
            "التوصية: تقييم قلبي عاجل وربط النتائج بالأعراض السريرية الحالية.",
        ],
        recommendations: {
            lifestyle: [
                "تقليل الجهد البدني إلى حين مراجعة الطبيب المختص.",
                "الالتزام بالأدوية الموصوفة إن وجدت.",
            ],
            followUp: [
                "مراجعة طبيب القلب بشكل عاجل.",
                "إعادة التخطيط أو استكمال الفحوصات حسب التقييم السريري.",
            ],
        },
        doctor: {
            name: "د. سامي خالد",
            specialty: "أخصائي أمراض القلب والأوعية الدموية",
            date: "16 مارس 2026",
            time: "14:30",
        },
    },

    2: {
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
};

const LabReportView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const reportData = location.state?.reportData || mockReports[id];

    const getCardClass = (statusType) => {
        switch (statusType) {
            case "normal":
                return "report-result-card normal";
            case "warning":
                return "report-result-card warning";
            case "critical":
                return "report-result-card critical";
            case "pending":
                return "report-result-card pending";
            default:
                return "report-result-card";
        }
    };

    const getBadgeClass = (statusType) => {
        switch (statusType) {
            case "normal":
                return "report-badge normal";
            case "warning":
                return "report-badge warning";
            case "critical":
                return "report-badge critical";
            case "pending":
                return "report-badge pending";
            default:
                return "report-badge";
        }
    };

    if (!reportData) {
        return (
            <div className="lab-report-page" dir="rtl">
                <div className="lab-report-empty">
                    <h2>لا توجد بيانات تقرير</h2>
                    <p>لم يتم العثور على تقرير مطابق لهذا المعرف.</p>
                    <button onClick={() => navigate("/doctor")}>
                        <img src={lefticon} alt="" />
                        العودة
                    </button>
                </div>
            </div>
        );
    }

    const {
        reportTitle,
        reportSubtitle,
        patient,
        examInfo,
        resultCards = [],
        notes = [],
        recommendations = {},
        doctor,
    } = reportData;

    return (
        <div className="lab-report-page" dir="rtl">
            <div className="lab-report-shell">
                <button
                    className="lab-report-back-btn no-print"
                    onClick={() => navigate("/doctor")}
                >
                    <img src={lefticon} alt="" />
                    العودة
                </button>

                <div className="lab-report-container">
                    <div className="lab-report-header">
                        <div className="lab-report-title-wrap">
                            <h1>
                                <img src={fileicon} alt="" />
                                {reportTitle}
                            </h1>
                            <p>{reportSubtitle}</p>
                        </div>
                    </div>

                    <div className="lab-report-body">
                        <section className="report-section">
                            <h2 className="report-section-title">
                                <img src={usericon} alt="" />
                                بيانات المريض
                            </h2>
                            <div className="report-info-grid two-cols">
                                <div className="report-info-card">
                                    <span>الاسم الكامل</span>
                                    <strong>{patient?.fullName || "-"}</strong>
                                </div>
                                <div className="report-info-card">
                                    <span>رقم السجل الطبي</span>
                                    <strong>{patient?.medicalId || "-"}</strong>
                                </div>
                                <div className="report-info-card">
                                    <span>تاريخ الميلاد</span>
                                    <strong>{patient?.birthDate || "-"}</strong>
                                </div>
                                <div className="report-info-card">
                                    <span>الجنس والعمر</span>
                                    <strong>{patient?.genderAge || "-"}</strong>
                                </div>
                            </div>
                        </section>

                        <section className="report-section">
                            <h2 className="report-section-title">
                                <img src={calendericon} alt="" />
                                معلومات الفحص
                            </h2>
                            <div className="report-info-grid three-cols">
                                <div className="report-info-card text_color">
                                    <span>تاريخ الفحص</span>
                                    <strong>{examInfo?.examDate || "-"}</strong>
                                </div>
                                <div className="report-info-card text_color">
                                    <span>المختبر / القسم</span>
                                    <strong>{examInfo?.labName || "-"}</strong>
                                </div>
                                <div className="report-info-card">
                                    <span>الحالة</span>
                                    <div className="text_status">
                                        <strong>{examInfo?.caseStatus || "-"}</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="report-section">
                            <h2 className="report-section-title">نتائج التحليل</h2>

                            {resultCards.length > 0 ? (
                                <div className="report-results-list">
                                    {resultCards.map((result) => (
                                        <div className={getCardClass(result.statusType)} key={result.id}>
                                            <div className="report-result-topline">
                                                <h3>{result.name}</h3>
                                                <span className={getBadgeClass(result.statusType)}>
                                                    {result.statusLabel}
                                                </span>
                                            </div>

                                            <div className="report-result-content">
                                                <div className="report-result-meta">
                                                    <div>
                                                        <span>القيمة</span>
                                                        <strong>
                                                            {result.value}{" "}
                                                            {result.unit && <small>{result.unit}</small>}
                                                        </strong>
                                                    </div>

                                                    <div>
                                                        <span>النطاق الطبيعي</span>
                                                        <strong>{result.normalRange || "-"}</strong>
                                                    </div>
                                                </div>

                                                <div className="report-result-icon">
                                                    {result.icon === "warning" ? (
                                                        <img src={alerticon} alt="" />
                                                    ) : (
                                                        <img src={checkicon} alt="" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="report-empty-state">
                                    لا توجد نتائج تفصيلية متاحة حالياً لهذا التقرير.
                                </div>
                            )}
                        </section>

                        <section className="report-section">
                            <div className="report-notes-box">
                                <h2 className="report-section-title text_color">ملاحظات الطبيب</h2>
                                {notes.length > 0 ? (
                                    <ul>
                                        {notes.map((note, index) => (
                                            <li key={index}>{note}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>لا توجد ملاحظات مضافة.</p>
                                )}
                            </div>
                        </section>

                        <section className="report-section">
                            <h2 className="report-section-title">
                                <img src={recomandationicon} alt="" />
                                التوصيات
                            </h2>
                            <div className="report-recommendations-grid">
                                <div className="report-recommendation-card green">
                                    <h3>نمط الحياة</h3>
                                    {recommendations?.lifestyle?.length ? (
                                        <ul>
                                            {recommendations.lifestyle.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>لا توجد توصيات حالياً.</p>
                                    )}
                                </div>

                                <div className="report-recommendation-card blue">
                                    <h3>المتابعة</h3>
                                    {recommendations?.followUp?.length ? (
                                        <ul>
                                            {recommendations.followUp.map((item, index) => (
                                                <li className="blue" key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>لا توجد توصيات متابعة حالياً.</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section className="report-section report-footer-signature">
                            <div className="report-sign-box report-sign-box-doctor">
                                <span className="report-sign-label">توقيع الطبيب</span>
                                <div className="report-sign-line"></div>

                                <strong>{doctor?.name || "-"}</strong>
                                <p>{doctor?.specialty || "-"}</p>
                                <p>الختم الرسمي للمستشفى</p>
                            </div>

                            <div className="report-sign-box report-sign-box-date">
                                <span className="report-sign-label">تاريخ التوقيع</span>
                                <div className="report-sign-line"></div>

                                <strong>{doctor?.date || "-"}</strong>
                                <p>الساعة: {doctor?.time || "-"}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div className="report-actions no-print">
                <button className="secondary-btn" onClick={() => navigate("/doctor")}>
                    مراجعة المريض
                </button>
                <button className="primary-btn" type="button" onClick={() => window.print()}>
                    طباعة
                </button>
            </div>
        </div>
    );
};

export default LabReportView;