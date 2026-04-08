import "./DepartmentsManagementTab.css";
import { useEffect, useState } from "react";

import dataicon from "../../../assets/database.svg";
import seatchicon from "../../../assets/search.svg";
import AddResourceButton from "../components/AddResourceButton";

const statusOptions = [
    { label: "جميع الحالات", value: "all" },
    { label: "مزدحم", value: "warning" },
    { label: "طبيعي", value: "success" },
    { label: "حرج", value: "danger" },
];

const getDepartmentIconClass = (occupancy) => {
    if (occupancy >= 85) return "department-icon danger";
    if (occupancy >= 65) return "department-icon warning";
    return "department-icon success";
};

const getInitialDevices = (department) => [
    {
        id: `${department?.id || "dep"}-main`,
        name: "الجهاز الرئيسي",
        unit: "وحدة 1",
        status: "stopped", // active | stopped
        note: "متوقفة عن العمل - الجدولة معلقة",
        actionType: "stop",
    },
    {
        id: `${department?.id || "dep"}-sub`,
        name: "الجهاز الفرعي",
        unit: "وحدة 2",
        status: "rescheduled", // scheduled | rescheduled
        note: "تم تأجيل الصيانة للأسبوع القادم",
        actionType: "schedule",
    },
];

const DepartmentsManagementTab = ({
    departments = [],
    getStatusClass,
    getProgressClass,
    getProgressTextClass,
    onOpenAddResource,
}) => {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [activeModal, setActiveModal] = useState(null); // "devices" | "report" | null
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const [departmentDevices, setDepartmentDevices] = useState({});

    const selectedOption =
        statusOptions.find((option) => option.value === selectedStatus) || statusOptions[0];

    const filteredDepartments = departments.filter((department) => {
        const matchesSearch =
            department.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            department.manager?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            selectedStatus === "all" || department.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    const openModal = (type, department) => {
        setSelectedDepartment(department);
        setActiveModal(type);
        setIsClosing(false);

        if (type === "devices" && !departmentDevices[department.id]) {
            setDepartmentDevices((prev) => ({
                ...prev,
                [department.id]: getInitialDevices(department),
            }));
        }
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setActiveModal(null);
            setSelectedDepartment(null);
            setIsClosing(false);
        }, 280);
    };

    useEffect(() => {
        if (activeModal) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [activeModal]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && activeModal) {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [activeModal]);

    const updateDepartmentDevice = (departmentId, deviceId, updates) => {
        setDepartmentDevices((prev) => ({
            ...prev,
            [departmentId]: (prev[departmentId] || []).map((device) =>
                device.id === deviceId ? { ...device, ...updates } : device
            ),
        }));
    };

    const handleStopScheduling = (departmentId, deviceId) => {
        updateDepartmentDevice(departmentId, deviceId, {
            status: "stopped",
            note: "متوقفة عن العمل - الجدولة معلقة",
        });
    };

    const handleReactivateScheduling = (departmentId, deviceId) => {
        updateDepartmentDevice(departmentId, deviceId, {
            status: "active",
            note: "متوفرة عن العمل - الجدولة مفعلة",
        });
    };

    const handleReschedule = (departmentId, deviceId) => {
        updateDepartmentDevice(departmentId, deviceId, {
            status: "rescheduled",
            note: "تم تأجيل الصيانة للأسبوع القادم",
        });
    };

    const handleCancelReschedule = (departmentId, deviceId) => {
        updateDepartmentDevice(departmentId, deviceId, {
            status: "scheduled",
            note: "صيانة دورية مجدولة غدًا",
        });
    };

    const currentDevices =
        selectedDepartment && departmentDevices[selectedDepartment.id]
            ? departmentDevices[selectedDepartment.id]
            : [];

    return (
        <>
            <section className="departments-management-tab">
                <header className="departments-tab-header">
                    <div className="header-title-wrap">
                        <h1>إدارة الأقسام والأجهزة</h1>
                        <p>مراقبة الموارد، الأجهزة، والضغط التشغيلي لكل قسم.</p>
                    </div>

                    <AddResourceButton onClick={onOpenAddResource} />
                </header>

                <div className="departments-toolbar">
                    <div className="toolbar-search">
                        <span className="search-icon-placeholder">
                            <img src={seatchicon} alt="Search Icon" />
                        </span>

                        <input
                            type="text"
                            placeholder="ابحث عن قسم أو جهاز..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="toolbar-filter custom-dropdown">
                        <button
                            type="button"
                            className={`dropdown-trigger ${isDropdownOpen ? "open" : ""}`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span>{selectedOption.label}</span>
                            <span className="dropdown-arrow"></span>
                        </button>

                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                {statusOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        className={`dropdown-item ${
                                            selectedStatus === option.value ? "selected" : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedStatus(option.value);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        <span>{option.label}</span>
                                        {selectedStatus === option.value && (
                                            <span className="dropdown-check">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="departments-cards-grid">
                    {filteredDepartments.length > 0 ? (
                        filteredDepartments.map((department) => (
                            <article key={department.id} className="department-management-card">
                                <div className="department-card-top">
                                    <div className="department-card-title-block">
                                        <div className="department-icon-text-inline">
                                            <div className="department-device-icon-placeholder">
                                                <img
                                                    src={dataicon}
                                                    alt="Department Icon"
                                                    className={getDepartmentIconClass(department.occupancy)}
                                                />
                                            </div>

                                            <div className="department-title-meta">
                                                <h3>{department.name}</h3>
                                                <p>
                                                    المدير: <span>{department.manager}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="department-status-wrap">
                                        <span className={getStatusClass(department.status)}>
                                            {department.statusText}
                                        </span>
                                    </div>
                                </div>

                                <div className="department-stats-row">
                                    <div className="department-stat-box">
                                        <span className="stat-label">الضغط التشغيلي</span>
                                        <strong className={getProgressTextClass(department.occupancy)}>
                                            {department.occupancy}%
                                        </strong>
                                    </div>

                                    <div className="department-stat-box">
                                        <span className="stat-label">المرضى بالانتظار</span>
                                        <strong>{department.waiting}</strong>
                                    </div>

                                    <div className="department-stat-box">
                                        <span className="stat-label">الكفاءة</span>
                                        <strong className="efficiency-value">
                                            {department.efficiency ?? 88}%
                                        </strong>
                                    </div>
                                </div>

                                <div className="department-card-actions">
                                    <button
                                        className="department-primary-btn"
                                        type="button"
                                        onClick={() => openModal("devices", department)}
                                    >
                                        إدارة الأجهزة
                                    </button>

                                    <button
                                        className="department-outline-btn"
                                        type="button"
                                        onClick={() => openModal("report", department)}
                                    >
                                        تقرير تفصيلي
                                    </button>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>لا توجد نتائج مطابقة.</p>
                        </div>
                    )}
                </div>
            </section>

            {activeModal && selectedDepartment && (
                <div
                    className={`modal-overlay ${isClosing ? "closing" : "active"}`}
                    onClick={closeModal}
                >
                    <div
                        className={`custom-modal ${isClosing ? "closing" : "active"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="modal-close-btn"
                            onClick={closeModal}
                            aria-label="إغلاق"
                        >
                            ×
                        </button>

                        {activeModal === "devices" && (
                            <div className="devices-modal-content">
                                <div className="modal-header-row">
                                    <div className="modal-title-with-icon">
                                        <span className="modal-icon-slot">
                                            {/* ضع الأيقونة هنا لاحقًا */}
                                        </span>
                                        <h2>
                                            إدارة أجهزة {selectedDepartment.name} (
                                            {selectedDepartment.code || "MRI"})
                                        </h2>
                                    </div>
                                </div>

                                <div className="devices-list">
                                    {currentDevices.map((device) => (
                                        <div
                                            key={device.id}
                                            className={`device-row ${device.status}`}
                                        >
                                            <div className="device-info">
                                                <div className="device-name-line">
                                                    <span
                                                        className={`device-status-dot ${
                                                            device.status === "active" ||
                                                            device.status === "scheduled"
                                                                ? "success"
                                                                : device.status === "rescheduled"
                                                                ? "warning"
                                                                : "danger"
                                                        }`}
                                                    ></span>
                                                    <h3>
                                                        {device.name} ({device.unit})
                                                    </h3>
                                                </div>

                                                <p>{device.note}</p>
                                            </div>

                                            <div className="device-actions">
                                                {device.actionType === "stop" &&
                                                    device.status === "stopped" && (
                                                        <button
                                                            type="button"
                                                            className="device-outline-action red"
                                                            onClick={() =>
                                                                handleReactivateScheduling(
                                                                    selectedDepartment.id,
                                                                    device.id
                                                                )
                                                            }
                                                        >
                                                            إعادة التفعيل للجدولة
                                                        </button>
                                                    )}

                                                {device.actionType === "stop" &&
                                                    device.status === "active" && (
                                                        <button
                                                            type="button"
                                                            className="device-outline-action"
                                                            onClick={() =>
                                                                handleStopScheduling(
                                                                    selectedDepartment.id,
                                                                    device.id
                                                                )
                                                            }
                                                        >
                                                            إيقاف للجدولة
                                                        </button>
                                                    )}

                                                {device.actionType === "schedule" &&
                                                    device.status === "rescheduled" && (
                                                        <button
                                                            type="button"
                                                            className="device-light-action"
                                                            onClick={() =>
                                                                handleCancelReschedule(
                                                                    selectedDepartment.id,
                                                                    device.id
                                                                )
                                                            }
                                                        >
                                                            إلغاء التعديل
                                                        </button>
                                                    )}

                                                {device.actionType === "schedule" &&
                                                    device.status === "scheduled" && (
                                                        <button
                                                            type="button"
                                                            className="device-light-action"
                                                            onClick={() =>
                                                                handleReschedule(
                                                                    selectedDepartment.id,
                                                                    device.id
                                                                )
                                                            }
                                                        >
                                                            تعديل الموعد
                                                        </button>
                                                    )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button type="button" className="modal-wide-action light">
                                    طلب صيانة أو جهاز جديد
                                </button>
                            </div>
                        )}

                        {activeModal === "report" && (
                            <div className="report-modal-content">
                                <div className="modal-header-row">
                                    <div className="modal-title-with-icon">
                                        <span className="modal-icon-slot">
                                            {/* ضع الأيقونة هنا لاحقًا */}
                                        </span>
                                        <h2>
                                            التقرير التشغيلي: {selectedDepartment.name} (
                                            {selectedDepartment.code || "MRI"})
                                        </h2>
                                    </div>
                                </div>

                                <div className="report-stats-grid">
                                    <div className="report-stat-card purple">
                                        <span>الحالات المعالجة اليوم</span>
                                        <strong>145 حالة</strong>
                                    </div>

                                    <div className="report-stat-card blue">
                                        <span>متوسط وقت الانتظار الفعلي</span>
                                        <strong>22 دقيقة</strong>
                                    </div>
                                </div>

                                <div className="ai-insight-box">
                                    <div className="ai-insight-header">
                                        <span className="modal-icon-slot small">
                                            {/* ضع الأيقونة هنا لاحقًا */}
                                        </span>
                                        <h3>رؤى VITAL AI التحليلية</h3>
                                    </div>

                                    <div className="ai-insight-item success">
                                        <span className="insight-icon-slot">
                                            {/* ضع الأيقونة هنا لاحقًا */}
                                        </span>
                                        <p>
                                            يُنصح بزيادة كادر التمريض بنسبة 10% خلال فترة الذروة المتوقعة
                                            (10:00 ص - 02:00 م).
                                        </p>
                                    </div>

                                    <div className="ai-insight-item warning">
                                        <span className="insight-icon-slot"></span>
                                        <p>
                                            الجهاز رقم 2 يستغرق وقتًا أطول بـ 15% من المعدل الطبيعي، قد
                                            يحتاج لفحص فني مبكر.
                                        </p>
                                    </div>
                                </div>

                                <button type="button" className="modal-wide-action primary">
                                    تصدير التقرير كـ PDF
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentsManagementTab;