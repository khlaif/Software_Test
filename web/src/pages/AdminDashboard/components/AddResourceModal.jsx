import { useEffect, useRef, useState } from "react";
import "./AddResourceModal.css";

const initialFormState = {
    departmentName: "",
    deviceName: "",
    departmentManager: "",
    priority: "عالية",
    dailyCapacity: 24,
};

const priorityOptions = ["حرجة", "عالية", "متوسطة"];

const AddResourceModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isClosing, setIsClosing] = useState(false);
    const priorityRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else if (shouldRender) {
            setIsClosing(true);
            document.body.style.overflow = "";
            document.body.style.touchAction = "";

            const timer = setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
                setIsPriorityOpen(false);
                setFormData(initialFormState);
            }, 280);

            return () => clearTimeout(timer);
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        };
    }, [isOpen, shouldRender]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (priorityRef.current && !priorityRef.current.contains(e.target)) {
                setIsPriorityOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.departmentName.trim() || !formData.departmentManager.trim()) {
            return;
        }

        onSubmit?.({
            ...formData,
            dailyCapacity: Number(formData.dailyCapacity),
        });

        onClose?.();
    };

    if (!shouldRender) return null;

    return (
        <div
            className={`resource-modal-overlay ${isClosing ? "closing" : "opening"}`}
            onClick={onClose}
        >
            <div
                className={`resource-modal-card ${isClosing ? "closing" : "opening"}`}
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
            >
                <button
                    type="button"
                    className="resource-modal-close"
                    onClick={onClose}
                    aria-label="إغلاق"
                >
                    ×
                </button>

                <div className="resource-modal-header">
                    <h2>إضافة مورد جديد للمستشفى</h2>
                </div>

                <form className="resource-modal-form" onSubmit={handleSubmit}>
                    <div className="resource-form-group">
                        <label htmlFor="departmentName">اسم القسم</label>
                        <input
                            id="departmentName"
                            type="text"
                            name="departmentName"
                            placeholder="مثلاً: قسم الرنين المغناطيسي"
                            value={formData.departmentName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="resource-form-group">
                        <label htmlFor="deviceName">اسم الجهاز (إن وجد)</label>
                        <input
                            id="deviceName"
                            type="text"
                            name="deviceName"
                            placeholder="مثلاً: Siemens Magnetom"
                            value={formData.deviceName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="resource-form-group">
                        <label htmlFor="departmentManager">مدير القسم</label>
                        <input
                            id="departmentManager"
                            type="text"
                            name="departmentManager"
                            placeholder="اسم مدير القسم"
                            value={formData.departmentManager}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="resource-form-row">
                        <div className="resource-form-group">
                            <label>الأولوية التشغيلية</label>

                            <div className="priority-select" ref={priorityRef}>
                                <button
                                    type="button"
                                    className={`priority-select-trigger ${isPriorityOpen ? "open" : ""}`}
                                    onClick={() => setIsPriorityOpen((prev) => !prev)}
                                >
                                    <span>{formData.priority}</span>
                                </button>

                                {isPriorityOpen && (
                                    <div className="priority-dropdown">
                                        {priorityOptions.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                className={`priority-option ${formData.priority === option ? "selected" : ""}`}
                                                onClick={() => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        priority: option,
                                                    }));
                                                    setIsPriorityOpen(false);
                                                }}
                                            >
                                                <span>{option}</span>
                                                {formData.priority === option && (
                                                    <span className="check-mark">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="resource-form-group">
                            <label htmlFor="dailyCapacity">السعة الاستيعابية اليومية</label>
                            <input
                                id="dailyCapacity"
                                type="number"
                                name="dailyCapacity"
                                min="1"
                                value={formData.dailyCapacity}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="resource-submit-btn">
                        إعتماد المورد
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddResourceModal;