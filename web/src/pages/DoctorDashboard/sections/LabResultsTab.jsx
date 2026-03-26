import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./LabReportView.css";

const LabReportView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const reportData = location.state?.reportData;

    if (!reportData) {
        return (
            <div className="lab-report-page" dir="rtl">
                <div className="lab-report-empty">
                    <h2>لا توجد بيانات تقرير</h2>
                    <p>لم يتم تمرير بيانات التقرير لهذه الصفحة.</p>
                    <button onClick={() => navigate("/doctor")}>العودة</button>
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

    return (
        <div className="lab-report-page" dir="rtl">
            <div className="lab-report-container">
                <div className="lab-report-header">
                    <button
                        className="lab-report-back-btn"
                        onClick={() => navigate("/doctor")}
                    >
                        العودة
                    </button>

                    <div className="lab-report-title-wrap">
                        <h1>{reportTitle || "التقرير الطبي الشامل"}</h1>
                        <p>{reportSubtitle || `تفاصيل التقرير رقم ${id}`}</p>
                    </div>
                </div>

                <div className="lab-report-body">
                    <section className="report-section">
                        <h2 className="report-section-title">بيانات المريض</h2>
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
                        <h2 className="report-section-title">معلومات الفحص</h2>
                        <div className="report-info-grid three-cols">
                            <div className="report-info-card">
                                <span>تاريخ الفحص</span>
                                <strong>{examInfo?.examDate || "-"}</strong>
                            </div>
                            <div className="report-info-card">
                                <span>المختبر / القسم</span>
                                <strong>{examInfo?.labName || "-"}</strong>
                            </div>
                            <div className="report-info-card">
                                <span>الحالة</span>
                                <strong>{examInfo?.caseStatus || "-"}</strong>
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
                                            <span className={getBadgeClass(result.statusType)}>
                                                {result.statusLabel}
                                            </span>
                                            <h3>{result.name}</h3>
                                        </div>

                                        <div className="report-result-content">
                                            <div className="report-result-icon">
                                                {result.icon === "warning" ? "⚠" : "✓"}
                                            </div>

                                            <div className="report-result-meta">
                                                <div>
                                                    <span>النطاق الطبيعي</span>
                                                    <strong>{result.normalRange || "-"}</strong>
                                                </div>
                                                <div>
                                                    <span>القيمة</span>
                                                    <strong>
                                                        {result.value}{" "}
                                                        {result.unit && <small>{result.unit}</small>}
                                                    </strong>
                                                </div>
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
                        <h2 className="report-section-title">ملاحظات الطبيب</h2>
                        <div className="report-notes-box">
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
                        <h2 className="report-section-title">التوصيات</h2>
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
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>لا توجد توصيات متابعة حالياً.</p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="report-section report-footer-signature">
                        <div className="report-sign-box">
                            <span>توقيع الطبيب</span>
                            <strong>{doctor?.name || "-"}</strong>
                            <p>{doctor?.specialty || "-"}</p>
                        </div>

                        <div className="report-sign-box">
                            <span>تاريخ التوقيع</span>
                            <strong>{doctor?.date || "-"}</strong>
                            <p>الساعة: {doctor?.time || "-"}</p>
                        </div>
                    </section>

                    <div className="report-actions">
                        <button className="secondary-btn" onClick={() => navigate("/doctor")}>
                            مراجعة المريض
                        </button>
                        <button className="outline-btn" type="button" onClick={() => window.print()}>
                            طباعة
                        </button>
                        <button className="primary-btn" type="button">
                            تحميل PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabReportView;