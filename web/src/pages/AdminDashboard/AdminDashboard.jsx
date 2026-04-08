import { useMemo, useState } from "react";
import "./AdminDashboard.css";

import DepartmentsManagementTab from "./sections/DepartmentsManagementTab";
import MedicalStaffTab from "./sections/MedicalStaffTab";
import AddResourceModal from "./components/AddResourceModal";
import AddResourceButton from "./components/AddResourceButton";
import BillingManeger from "./sections/BillingManeger";
import FinancialReportsTab from "./sections/FinancialReportsTab";

import activityicon from "../../assets/activity_b.svg";
import settingsicon from "../../assets/settings.svg";
import dataicon from "../../assets/database.svg";
import layouticon from "../../assets/layout-dashboard.svg";
import shieldicon from "../../assets/shield-check_g.svg";
import companyicon from "../../assets/building-2.svg";
import bedicon from "../../assets/bed-double.svg";
import usericon from "../../assets/users-round.svg";
import stethoscopeicon from "../../assets/stethoscope_black.svg";
import brainiconw from "../../assets/brain-circuit.svg";
import brainiconb from "../../assets/brain-circuit_blue.svg";
import clockicon from "../../assets/clock_g.svg";
import alerticon from "../../assets/circle-alert.svg";
import charticon from "../../assets/chart-pie.svg";
import receipticon from "../../assets/receipt.svg"

const statsData = [
    {
        img: usericon,
        id: 1,
        title: "إجمالي المرضى",
        value: "1,248",
        change: "+12%",
        trend: "up",
        color: "blue",
    },
    {
        img: brainiconb,
        id: 2,
        title: "كفاءة الذكاء الاصطناعي",
        value: "94%",
        change: "+5%",
        trend: "up",
        color: "purple",
    },
    {
        img: clockicon,
        id: 3,
        title: "متوسط وقت الانتظار",
        value: "18 دقيقة",
        change: "-25%",
        trend: "down",
        color: "green",
    },
    {
        img: bedicon,
        id: 4,
        title: "إشغال الأسرة",
        value: "82%",
        change: "+2%",
        trend: "up",
        color: "amber",
    },
];

const initialDepartmentsData = [
    {
        id: 1,
        name: "قسم الأشعة (MRI)",
        manager: "د. أحمد كمال",
        waiting: 14,
        occupancy: 92,
        efficiency: 88,
        status: "warning",
        statusText: "مزدحم",
    },
    {
        id: 2,
        name: "المختبر الكيميائي",
        manager: "د. سناء عبد الله",
        waiting: 4,
        occupancy: 45,
        efficiency: 96,
        status: "success",
        statusText: "طبيعي",
    },
    {
        id: 3,
        name: "قسم الطوارئ",
        manager: "د. خالد محمود",
        waiting: 22,
        occupancy: 98,
        efficiency: 75,
        status: "danger",
        statusText: "حرج",
    },
    {
        id: 4,
        name: "العيادات الخارجية",
        manager: "د. منى سعيد",
        waiting: 8,
        occupancy: 60,
        efficiency: 90,
        status: "success",
        statusText: "طبيعي",
    },
    {
        id: 5,
        name: "قسم العلاج الطبيعي",
        manager: "د. هدى صالح",
        waiting: 2,
        occupancy: 30,
        efficiency: 95,
        status: "success",
        statusText: "طبيعي",
    },
    {
        id: 6,
        name: "قسم العناية الحثيثة (ICU)",
        manager: "د. طارق زياد",
        waiting: 0,
        occupancy: 95,
        efficiency: 99,
        status: "warning",
        statusText: "مزدحم",
    },
];

const doctorsData = [
    {
        id: 1,
        name: "د. سامي خالد",
        specialty: "أخصائي قلب",
        department: "قسم القلب",
        role: "استشاري",
        status: "في العيادة",
        statusType: "info",
        patientsToday: 18,
        shiftHours: 7,
        fatigueLevel: 42,
        priority: "لا يوجد تدخل",
        avatar: "",
        avatarText: "س",
    },
    {
        id: 2,
        name: "د. ليلى حسن",
        specialty: "طوارئ",
        department: "قسم الطوارئ",
        role: "أخصائية طوارئ",
        status: "عملية جراحية",
        statusType: "warning",
        patientsToday: 12,
        shiftHours: 9,
        fatigueLevel: 66,
        priority: "مراقبة",
        avatar: "",
        avatarText: "ل",
    },
    {
        id: 3,
        name: "د. ياسر علي",
        specialty: "أشعة",
        department: "قسم الأشعة",
        role: "أخصائي أشعة",
        status: "متاح",
        statusType: "success",
        patientsToday: 25,
        shiftHours: 6,
        fatigueLevel: 35,
        priority: "تخفيف العبء مطلوب",
        avatar: "",
        avatarText: "ي",
    },
    {
        id: 4,
        name: "د. هدى صالح",
        specialty: "علاج طبيعي",
        department: "قسم العلاج الطبيعي",
        role: "أخصائية علاج طبيعي",
        status: "استراحة",
        statusType: "success",
        patientsToday: 8,
        shiftHours: 5,
        fatigueLevel: 28,
        priority: "لا يوجد تدخل",
        avatar: "",
        avatarText: "هـ",
    },
    {
        id: 5,
        name: "د. طارق زياد",
        specialty: "عناية حثيثة",
        department: "قسم العناية الحثيثة",
        role: "استشاري عناية حثيثة",
        status: "عملية جراحية",
        statusType: "danger",
        patientsToday: 3,
        shiftHours: 10,
        fatigueLevel: 81,
        priority: "مرتفع",
        avatar: "",
        avatarText: "ط",
    },
    {
        id: 6,
        name: "د. منى سعيد",
        specialty: "عيادات خارجية",
        department: "العيادات الخارجية",
        role: "أخصائية باطنية",
        status: "في العيادة",
        statusType: "info",
        patientsToday: 32,
        shiftHours: 8,
        fatigueLevel: 74,
        priority: "تخفيف العبء مطلوب",
        avatar: "",
        avatarText: "م",
    },
];

const sidebarMenu = [
    {
        img: layouticon,
        id: 1,
        label: "نظرة عامة",
        active: true,
    },
    {
        img: dataicon,
        id: 2,
        label: "إدارة الأقسام",
        active: false,
    },
    {
        img: stethoscopeicon,
        id: 3,
        label: "الكادر الطبي",
        active: false,
    },
    {
        img: receipticon,
        id: 4,
        label: "إدارة الفواتير",
        active: false,
    },
    {
        img: charticon,
        id: 5,
        label: "التقارير المالية",
        active: false,
    },
];

const getStatusClass = (status) => {
    if (status === "success") return "status-badge success";
    if (status === "warning") return "status-badge warning";
    if (status === "danger") return "status-badge danger";
    return "status-badge neutral";
};

const getDoctorStatusClass = (statusType) => {
    if (statusType === "success") return "mini-badge success";
    if (statusType === "warning") return "mini-badge warning";
    if (statusType === "info") return "mini-badge info";
    if (statusType === "danger") return "mini-badge danger";
    return "mini-badge neutral";
};

const getProgressClass = (value) => {
    if (value >= 85) return "progress-fill danger";
    if (value >= 65) return "progress-fill warning";
    return "progress-fill success";
};

const getProgressTextClass = (occupancy) => {
    if (occupancy >= 85) return "occupancy-value danger";
    if (occupancy >= 65) return "occupancy-value warning";
    return "occupancy-value success";
};

const getDepartmentStatusFromOccupancy = (occupancy) => {
    if (occupancy >= 85) {
        return { status: "danger", statusText: "حرج" };
    }
    if (occupancy >= 65) {
        return { status: "warning", statusText: "مزدحم" };
    }
    return { status: "success", statusText: "طبيعي" };
};

const AdminDashboard = () => {
    const [activeItem, setActiveItem] = useState(1);
    const [showAddResourceModal, setShowAddResourceModal] = useState(false);
    const [departmentLoadData, setDepartmentLoadData] = useState(initialDepartmentsData);

    const topThreeDoctors = useMemo(() => {
        return [...doctorsData]
            .sort((a, b) => b.patientsToday - a.patientsToday)
            .slice(0, 3);
    }, []);

    const handleOpenAddResource = () => {
        setShowAddResourceModal(true);
    };

    const handleCloseAddResource = () => {
        setShowAddResourceModal(false);
    };

    const handleSubmitResource = (formData) => {
        const occupancy = Math.min(
            100,
            Math.max(20, Math.floor(Math.random() * 60) + 30)
        );

        const efficiency = Math.min(
            99,
            Math.max(70, Math.floor(Math.random() * 20) + 80)
        );

        const waiting = Math.floor(Math.random() * 15);

        const { status, statusText } = getDepartmentStatusFromOccupancy(occupancy);

        const newDepartment = {
            id: Date.now(),
            name: formData.departmentName,
            manager: formData.departmentManager?.trim() || "لم يتم التعيين",
            waiting,
            occupancy,
            efficiency,
            status,
            statusText,
            deviceName: formData.deviceName,
            priority: formData.priority,
            dailyCapacity: formData.dailyCapacity,
        };

        setDepartmentLoadData((prev) => [newDepartment, ...prev]);
    };

    return (
        <div className="admin-dashboard-page" dir="rtl">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <div className="brand-logo">
                        <img src={companyicon} alt="" />
                    </div>

                    <div className="brand-text">
                        <h2>الإدارة العليا</h2>
                        <span>MEDFLOW AI</span>
                    </div>
                </div>

                <nav className="sidebar-menu">
                    {sidebarMenu.map((item) => (
                        <button
                            key={item.id}
                            className={`sidebar-menu-item ${activeItem === item.id ? "active" : ""}`}
                            type="button"
                            onClick={() => setActiveItem(item.id)}
                        >
                            <div className="icon-menu">
                                {item.img && <img src={item.img} alt="" />}
                                <span className="menu-label">{item.label}</span>
                            </div>
                        </button>
                    ))}
                </nav>

                <button className="settings-button" type="button">
                    <img src={settingsicon} alt="" />
                    <span>إعدادات النظام</span>
                    <span className="settings-icon"></span>
                </button>
            </aside>

            <main className="admin-main-content">
                {activeItem === 1 && (
                    <>
                        <header className="dashboard-header">
                            <div className="header-title-wrap">
                                <h1>مرحباً بك، مدير النظام</h1>
                                <p>نظرة شاملة على العمليات الحيوية لمنصة MEDFLOW AI.</p>
                            </div>

                            <AddResourceButton onClick={handleOpenAddResource} />
                        </header>

                        <section className="stats-grid">
                            {statsData.map((stat) => (
                                <article key={stat.id} className="stat-card">
                                    <div className="stat-card-top">
                                        <div className={`stat-icon-box ${stat.color}`}>
                                            <img src={stat.img} alt={stat.title} className="stat-icon" />
                                        </div>

                                        <span className={`trend-badge ${stat.trend === "up" ? "up" : "down"}`}>
                                            {stat.change}
                                        </span>
                                    </div>

                                    <div className="stat-card-body">
                                        <h3>{stat.value}</h3>
                                        <p>{stat.title}</p>
                                    </div>
                                </article>
                            ))}
                        </section>

                        <section className="dashboard-content-grid">
                            <article className="departments-card">
                                <div className="section-card-header departments-header">
                                    <h3>
                                        <img src={activityicon} alt="" />
                                        الضغط التشغيلي للأقسام
                                    </h3>

                                    <div className="departments-actions">
                                        <button
                                            className="outline-button"
                                            type="button"
                                            onClick={() => setActiveItem(2)}
                                        >
                                            عرض الكل
                                        </button>
                                    </div>
                                </div>

                                <div className="departments-list">
                                    {departmentLoadData.map((department) => (
                                        <div key={department.id} className="department-item">
                                            <div className="department-header">
                                                <div className="department-info">
                                                    <div className="department-title-group">
                                                        <h4>{department.name}</h4>

                                                        <span className={getStatusClass(department.status)}>
                                                            {department.statusText}
                                                        </span>
                                                    </div>

                                                    <div className="department-meta">
                                                        <span>
                                                            المدير: {department.manager} • {department.waiting} مرضى في الانتظار
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="department-progress-info">
                                                    <span className="occupancy-label">معدل الإشغال</span>

                                                    <strong className={getProgressTextClass(department.occupancy)}>
                                                        {department.occupancy}%
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="progress-bar">
                                                <div
                                                    className={getProgressClass(department.occupancy)}
                                                    style={{ width: `${department.occupancy}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </article>

                            <div className="left-column">
                                <article className="ai_card">
                                    <img src={brainiconw} alt="" className="ai_card-bg-icon" />

                                    <div className="ai_card-brand">
                                        <img src={shieldicon} alt="" />
                                        <h3>رؤى MEDFLOW AI</h3>
                                        <span className="shield-icon"></span>
                                    </div>

                                    <div className="ai-info-box">
                                        <span className="ai-box-title">الوقت الموفر اليوم</span>
                                        <strong>12.5 ساعة</strong>
                                        <p>عن طريق الجدولة التلقائية الذكية</p>
                                    </div>

                                    <div className="ai-alert-box">
                                        <div className="ai-alert-title">
                                            <img src={alerticon} alt="" />
                                            <span>تنبيه النظام</span>
                                            <span className="alert-icon"></span>
                                        </div>

                                        <p>
                                            يتوقع النظام زيادة الضغط على قسم الطوارئ بنسبة 40% خلال
                                            الساعتين القادمتين، تم إعادة توجيه 3 أطباء كإجراء احترازي.
                                        </p>
                                    </div>
                                </article>

                                <article className="doctors-card">
                                    <div className="section-card-header">
                                        <img src={stethoscopeicon} alt="" />
                                        <h3>أطباء المناوبة</h3>
                                        <span className="section-header-icon"></span>
                                    </div>

                                    <div className="doctors-list">
                                        {topThreeDoctors.map((doctor) => (
                                            <div key={doctor.id} className="doctor-item">
                                                <div className="doctor-avatar">
                                                    {doctor.avatar ? (
                                                        <img src={doctor.avatar} alt={doctor.name} />
                                                    ) : (
                                                        <span>{doctor.avatarText || doctor.name?.charAt(0) || "ط"}</span>
                                                    )}
                                                </div>

                                                <div className="doctor-info">
                                                    <h4>{doctor.name}</h4>
                                                    <p>{doctor.specialty}</p>
                                                </div>

                                                <span className={getDoctorStatusClass(doctor.statusType)}>
                                                    {doctor.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className="link-button"
                                        type="button"
                                        onClick={() => setActiveItem(3)}
                                    >
                                        عرض جميع الكادر المتاح
                                    </button>
                                </article>
                            </div>
                        </section>
                    </>
                )}

                {activeItem === 2 && (
                    <DepartmentsManagementTab
                        departments={departmentLoadData}
                        getStatusClass={getStatusClass}
                        getProgressClass={getProgressClass}
                        getProgressTextClass={getProgressTextClass}
                        onOpenAddResource={handleOpenAddResource}
                    />
                )}

                {activeItem === 3 && (
                    <MedicalStaffTab
                        doctors={doctorsData}
                        onOpenAddResource={handleOpenAddResource}
                    />
                )}

                {activeItem === 4 && (
                    <BillingManeger 
                        onOpenAddResource={handleOpenAddResource}
                    />
                )}

                {activeItem === 5 && (
                    <FinancialReportsTab
                        onOpenAddResource={handleOpenAddResource}
                    />

                )}

                <AddResourceModal
                    isOpen={showAddResourceModal}
                    onClose={handleCloseAddResource}
                    onSubmit={handleSubmitResource}
                />
            </main>
        </div>
    );
};

export default AdminDashboard;