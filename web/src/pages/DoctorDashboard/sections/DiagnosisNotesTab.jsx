import React, { useState } from "react";

const fallbackData = {
    initialDiagnosis: {
        title: "",
        symptoms: "",
        severity: "high",
    },
    treatmentPlan: [
        {
        id: 1,
        stepNumber: 1,
        title: "خطة العلاج الموصى به",
        note: "",
        },
    ],
};

const DiagnosisNotesTab = ({ diagnosisData }) => {
    const [data, setData] = useState(diagnosisData || fallbackData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [hasDoctorUpdate, setHasDoctorUpdate] = useState(
        Boolean(
        diagnosisData?.initialDiagnosis?.title ||
            diagnosisData?.initialDiagnosis?.symptoms ||
            diagnosisData?.treatmentPlan?.[0]?.note
        )
    );

    const [formData, setFormData] = useState({
        finalDiagnosis: diagnosisData?.initialDiagnosis?.title || "",
        doctorNotes: diagnosisData?.initialDiagnosis?.symptoms || "",
        medications: diagnosisData?.treatmentPlan?.[0]?.note || "",
        severity: diagnosisData?.initialDiagnosis?.severity || "high",
    });

    const getDiagnosisClass = (severity) => {
        switch (severity) {
        case "high":
            return "diagnosis-alert-high";
        case "medium":
            return "diagnosis-alert-medium";
        case "low":
            return "diagnosis-alert-low";
        default:
            return "diagnosis-alert-high";
        }
    };

    const openModal = () => {
        setFormData({
        finalDiagnosis: data.initialDiagnosis?.title || "",
        doctorNotes: data.initialDiagnosis?.symptoms || "",
        medications: data.treatmentPlan?.[0]?.note || "",
        severity: data.initialDiagnosis?.severity || "high",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSave = () => {
        const updatedData = {
        initialDiagnosis: {
            title: formData.finalDiagnosis.trim(),
            symptoms: formData.doctorNotes.trim(),
            severity: formData.severity,
        },
        treatmentPlan: [
            {
            id: 1,
            stepNumber: 1,
            title: "خطة العلاج الموصى به",
            note: formData.medications.trim(),
            },
        ],
        };

        setData(updatedData);

        const hasContent =
        updatedData.initialDiagnosis.title ||
        updatedData.initialDiagnosis.symptoms ||
        updatedData.treatmentPlan[0].note;

        setHasDoctorUpdate(Boolean(hasContent));
        setIsModalOpen(false);
    };

    return (
        <div className="diagnosis-notes-section">
        <div className="diagnosis-header-row">
            <h2 className="section-title">ملاحظات التشخيص</h2>

            <button className="luxury-update-btn" onClick={openModal}>
            تحديث البيانات الطبية
            </button>
        </div>

        {hasDoctorUpdate && (
            <div className="diagnosis-wrapper">
            <div className="diagnosis-block">
                <h3 className="diagnosis-subtitle">التشخيص النهائي</h3>

                <div
                className={`diagnosis-alert-box ${getDiagnosisClass(
                    data.initialDiagnosis?.severity
                )}`}
                >
                <h4>{data.initialDiagnosis?.title}</h4>
                <p>{data.initialDiagnosis?.symptoms}</p>
                </div>
            </div>

            <div className="diagnosis-block">
                <h3 className="diagnosis-subtitle">خطة العلاج الموصى بها</h3>

                <div className="diagnosis-treatment-list">
                {data.treatmentPlan?.map((item) => (
                    <div className="diagnosis-treatment-card" key={item.id}>
                    <div className="diagnosis-step-number">
                        {item.stepNumber}
                    </div>

                    <div className="diagnosis-treatment-info">
                        <h4>{item.title}</h4>
                        <p>{item.note}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        )}

        {isModalOpen && (
            <div className="medical-modal-overlay" onClick={closeModal}>
            <div
                className="medical-modal-card"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="office-modal-close" onClick={closeModal}>
                ×
                </button>

                <h2 className="medical-modal-title">تحديث الملاحظات الطبية</h2>

                <div className="medical-form-group">
                <label>التشخيص النهائي</label>
                <input
                    type="text"
                    name="finalDiagnosis"
                    value={formData.finalDiagnosis}
                    onChange={handleChange}
                    placeholder="أدخل التشخيص النهائي"
                />
                </div>

                <div className="medical-form-group">
                <label>ملاحظات الطبيب السريرية</label>
                <textarea
                    name="doctorNotes"
                    value={formData.doctorNotes}
                    onChange={handleChange}
                    placeholder="أدخل الملاحظات السريرية"
                    rows="4"
                />
                </div>

                <div className="medical-form-group">
                <label>الأدوية الموصوفة / خطة العلاج</label>
                <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    placeholder="أدخل الأدوية أو خطة العلاج"
                    rows="3"
                />
                </div>

                <div className="medical-form-group">
                <label>درجة الخطورة</label>
                <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="medical-select"
                >
                    <option value="high">مرتفعة</option>
                    <option value="medium">متوسطة</option>
                    <option value="low">منخفضة</option>
                </select>
                </div>

                <button className="luxury-save-btn" onClick={handleSave}>
                حفظ التحديث
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default DiagnosisNotesTab;