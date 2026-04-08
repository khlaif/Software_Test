import { useEffect, useMemo, useState } from "react";
import "./BillingManeger.css";
import AddResourceButton from "../components/AddResourceButton";

import fileicon from "../../../assets/file-text_blue.svg";
import settingsicon from "../../../assets/settings.svg";

const invoicesSeedData = [
    {
        id: 1,
        invoiceNumber: "INV-2024-8992",
        patientName: "أحمد محمود",
        date: "15 أكتوبر 2024",
        insurance: "شركة التأمين الوطنية",
        amount: 466,
        status: "pending",
        statusText: "بانتظار الدفع",
        canView: true,
    },
    {
        id: 2,
        invoiceNumber: "INV-2024-8991",
        patientName: "سارة خليل",
        date: "14 أكتوبر 2024",
        insurance: "التأمين الصحي الحكومي",
        amount: 120,
        status: "paid",
        statusText: "مكتملة",
        canView: true,
    },
    {
        id: 3,
        invoiceNumber: "INV-2024-8990",
        patientName: "محمد قاسم",
        date: "14 أكتوبر 2024",
        insurance: "بدون تأمين",
        amount: 850,
        status: "pending",
        statusText: "بانتظار الدفع",
        canView: false,
    },
    {
        id: 4,
        invoiceNumber: "INV-2024-8989",
        patientName: "ليلى سعيد",
        date: "12 أكتوبر 2024",
        insurance: "شركة التأمين الوطنية",
        amount: 0,
        status: "paid",
        statusText: "مكتملة",
        canView: true,
    },
    {
        id: 5,
        invoiceNumber: "INV-2024-8988",
        patientName: "نور الهدى يوسف",
        date: "11 أكتوبر 2024",
        insurance: "التأمين العربي الموحد",
        amount: 235,
        status: "review",
        statusText: "قيد المراجعة",
        canView: true,
    },
];

const filterOptions = [
    { id: "all", label: "جميع الحالات" },
    { id: "paid", label: "مكتملة" },
    { id: "pending", label: "بانتظار الدفع" },
    { id: "review", label: "قيد المراجعة" },
];

const serviceCategoriesSeed = [
    {
        id: "imaging",
        title: "الأشعة والتصوير",
        services: [
            { id: 1, name: "صورة رنين مغناطيسي MRI", price: 800 },
            { id: 2, name: "صورة طبقي CT", price: 650 },
            { id: 3, name: "صورة أشعة سينية X-Ray", price: 120 },
            { id: 4, name: "ألتراساوند Ultrasound", price: 180 },
            { id: 5, name: "تصوير الثدي Mammogram", price: 240 },
            { id: 6, name: "تصوير دوبلر للأوعية", price: 220 },
        ],
    },
    {
        id: "lab",
        title: "الفحوصات المخبرية",
        services: [
            { id: 7, name: "فحص دم شامل CBC", price: 120 },
            { id: 8, name: "فحص سكر الدم", price: 45 },
            { id: 9, name: "فحص وظائف الكبد", price: 140 },
            { id: 10, name: "فحص وظائف الكلى", price: 130 },
            { id: 11, name: "فحص دهون الدم", price: 95 },
            { id: 12, name: "فحص الغدة الدرقية TSH", price: 110 },
        ],
    },
    {
        id: "cardio",
        title: "القلب والتنفس",
        services: [
            { id: 13, name: "تخطيط قلب ECG", price: 200 },
            { id: 14, name: "إيكو القلب", price: 350 },
            { id: 15, name: "فحص الجهد", price: 300 },
            { id: 16, name: "فحص وظائف الرئة", price: 170 },
        ],
    },
    {
        id: "clinical",
        title: "خدمات سريرية وطوارئ",
        services: [
            { id: 17, name: "كشفية طوارئ", price: 150 },
            { id: 18, name: "كشفية اختصاص", price: 200 },
            { id: 19, name: "جلسة ملاحظة يومية", price: 250 },
            { id: 20, name: "تضميد وعناية جروح", price: 90 },
        ],
    },
];

const insuranceCompaniesSeed = [
    { id: 1, name: "شركة التأمين الوطنية", coverage: 71, active: true },
    { id: 2, name: "التأمين الصحي الحكومي", coverage: 100, active: true },
    { id: 3, name: "شركة تأمين الحياة", coverage: 0, active: false },
    { id: 4, name: "التأمين العربي الموحد", coverage: 80, active: true },
];

const getInvoiceStatusClass = (status) => {
    if (status === "paid") return "invoice-status-badge paid";
    if (status === "pending") return "invoice-status-badge pending";
    if (status === "review") return "invoice-status-badge review";
    return "invoice-status-badge neutral";
};

const formatCurrency = (amount) => {
    return `₪ ${amount}`;
};

const BillingManeger = ({ onOpenAddResource }) => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
    const [activePricingTab, setActivePricingTab] = useState("services");

    const [serviceCategories, setServiceCategories] = useState(serviceCategoriesSeed);
    const [insuranceCompanies, setInsuranceCompanies] = useState(insuranceCompaniesSeed);

    const filteredInvoices = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return invoicesSeedData.filter((invoice) => {
            const matchesFilter =
                selectedFilter === "all" ? true : invoice.status === selectedFilter;

            const matchesSearch =
                normalizedSearch === ""
                    ? true
                    : invoice.invoiceNumber.toLowerCase().includes(normalizedSearch) ||
                      invoice.patientName.toLowerCase().includes(normalizedSearch) ||
                      invoice.insurance.toLowerCase().includes(normalizedSearch);

            return matchesFilter && matchesSearch;
        });
    }, [selectedFilter, searchTerm]);

    const handleServicePriceChange = (categoryId, serviceId, value) => {
        const numericValue = value === "" ? "" : Number(value);

        setServiceCategories((prev) =>
            prev.map((category) =>
                category.id === categoryId
                    ? {
                          ...category,
                          services: category.services.map((service) =>
                              service.id === serviceId
                                  ? { ...service, price: numericValue }
                                  : service
                          ),
                      }
                    : category
            )
        );
    };

    const handleInsuranceCoverageChange = (companyId, value) => {
        let numericValue = value === "" ? "" : Number(value);

        if (numericValue !== "") {
            if (numericValue < 0) numericValue = 0;
            if (numericValue > 100) numericValue = 100;
        }

        setInsuranceCompanies((prev) =>
            prev.map((company) =>
                company.id === companyId
                    ? { ...company, coverage: numericValue }
                    : company
            )
        );
    };

    const closePricingModal = () => {
        setIsPricingModalOpen(false);
    };

    useEffect(() => {
        if (!isPricingModalOpen) return;

        const handleEsc = (event) => {
            if (event.key === "Escape") {
                closePricingModal();
            }
        };

        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [isPricingModalOpen]);

    return (
        <section className="billing-manager-page" dir="rtl">
            <header className="billing-manager-header">
                <div className="billing-manager-title-wrap">
                    <h1>نظام الفوترة والمحاسبة</h1>
                    <p>التحكم في فواتير المرضى وصلاحيات العرض.</p>
                </div>

                <AddResourceButton onClick={onOpenAddResource} />
            </header>

            <section className="billing-manager-toolbar">
                <div className="billing-toolbar-left">
                    <div className="billing-search-box">
                        <span className="billing-search-icon"></span>

                        <input
                            type="text"
                            className="billing-search-input"
                            placeholder="البحث برقم الملف، اسم المريض، أو رقم الفاتورة..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>

                    <div className="billing-filter-dropdown">
                        <button
                            type="button"
                            className={`billing-filter-trigger ${isFilterOpen ? "open" : ""}`}
                            onClick={() => setIsFilterOpen((prev) => !prev)}
                        >
                            <span className="billing-filter-trigger-text">
                                {filterOptions.find((option) => option.id === selectedFilter)?.label}
                            </span>

                            <span className={`billing-filter-arrow ${isFilterOpen ? "open" : ""}`}></span>
                        </button>

                        {isFilterOpen && (
                            <div className="billing-filter-menu">
                                {filterOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        className={`billing-filter-option ${
                                            selectedFilter === option.id ? "active" : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedFilter(option.id);
                                            setIsFilterOpen(false);
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="billing-records-card">
                <div className="billing-records-header">
                    <div className="billing-records-title-wrap">
                        <span className="billing-records-title-icon">
                            <img src={fileicon} alt="" />
                        </span>
                        <h2>سجل الفواتير</h2>
                    </div>

                    <button
                        className="billing-settings-button"
                        type="button"
                        onClick={() => {
                            setActivePricingTab("services");
                            setIsPricingModalOpen(true);
                        }}
                    >
                        <span className="billing-settings-icon">
                            <img src={settingsicon} alt="" />
                        </span>
                        <span>إعدادات التسعير والتأمين</span>
                    </button>
                </div>

                <div className="billing-list-wrap">
                    <div className="billing-list-grid billing-list-head">
                        <div className="billing-col invoice-col-number">رقم الفاتورة</div>
                        <div className="billing-col invoice-col-patient">المريض</div>
                        <div className="billing-col invoice-col-date">التاريخ</div>
                        <div className="billing-col invoice-col-insurance">التأمين</div>
                        <div className="billing-col invoice-col-amount">المبلغ المستحق</div>
                        <div className="billing-col invoice-col-status">الحالة</div>
                    </div>

                    <div className="billing-list-body">
                        {filteredInvoices.length > 0 ? (
                            filteredInvoices.map((invoice) => (
                                <div key={invoice.id} className="billing-list-grid billing-list-row">
                                    <div className="billing-col invoice-col-number invoice-number-cell">
                                        {invoice.invoiceNumber}
                                    </div>

                                    <div className="billing-col invoice-col-patient invoice-patient-cell">
                                        {invoice.patientName}
                                    </div>

                                    <div className="billing-col invoice-col-date invoice-date-cell">
                                        {invoice.date}
                                    </div>

                                    <div className="billing-col invoice-col-insurance invoice-insurance-cell">
                                        {invoice.insurance}
                                    </div>

                                    <div className="billing-col invoice-col-amount invoice-amount-cell">
                                        {formatCurrency(invoice.amount)}
                                    </div>

                                    <div className="billing-col invoice-col-status">
                                        <span className={getInvoiceStatusClass(invoice.status)}>
                                            {invoice.statusText}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="billing-empty-state">
                                لا توجد نتائج مطابقة للبحث الحالي.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {isPricingModalOpen && (
                <div className="pricing-modal-overlay" onClick={closePricingModal}>
                    <div
                        className="pricing-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="pricing-modal-close"
                            onClick={closePricingModal}
                            aria-label="إغلاق"
                        >
                            ×
                        </button>

                        <div className="pricing-modal-header">
                            <h3>إدارة تسعير الخدمات الطبية</h3>
                            <p>الأسعار الأساسية ونسب التغطية التأمينية لشركات التأمين المتعاقدة.</p>
                        </div>

                        <div className="pricing-modal-tabs">
                            <button
                                type="button"
                                className={`pricing-tab-button ${
                                    activePricingTab === "services" ? "active" : ""
                                }`}
                                onClick={() => setActivePricingTab("services")}
                            >
                                تسعير الخدمات
                            </button>

                            <button
                                type="button"
                                className={`pricing-tab-button ${
                                    activePricingTab === "insurance" ? "active" : ""
                                }`}
                                onClick={() => setActivePricingTab("insurance")}
                            >
                                شركات التأمين
                            </button>
                        </div>

                        <div className="pricing-modal-body">
                            {activePricingTab === "services" ? (
                                <div className="service-categories-wrap">
                                    {serviceCategories.map((category) => (
                                        <div key={category.id} className="service-category-card">
                                            <div className="service-category-header">
                                                <h4>{category.title}</h4>
                                            </div>

                                            <div className="service-fields-grid">
                                                {category.services.map((service) => (
                                                    <div
                                                        key={service.id}
                                                        className="service-field-item"
                                                    >
                                                        <label className="service-field-label">
                                                            {service.name}
                                                        </label>

                                                        <div className="service-price-input-wrap">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                className="service-price-input"
                                                                value={service.price}
                                                                onChange={(event) =>
                                                                    handleServicePriceChange(
                                                                        category.id,
                                                                        service.id,
                                                                        event.target.value
                                                                    )
                                                                }
                                                            />
                                                            <span className="currency-mark">₪</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="insurance-list-wrap">
                                    {insuranceCompanies.map((company) => (
                                        <div
                                            key={company.id}
                                            className={`insurance-row ${
                                                !company.active ? "inactive" : ""
                                            }`}
                                        >
                                            <div className="insurance-company-name">
                                                {company.name}
                                                {!company.active && (
                                                    <span className="insurance-company-note">
                                                        (عقد منتهي)
                                                    </span>
                                                )}
                                            </div>

                                            <div className="insurance-coverage-input-wrap">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    className="insurance-coverage-input"
                                                    value={company.coverage}
                                                    onChange={(event) =>
                                                        handleInsuranceCoverageChange(
                                                            company.id,
                                                            event.target.value
                                                        )
                                                    }
                                                    disabled={!company.active}
                                                />
                                                <span className="insurance-percent-mark">%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="pricing-modal-footer">
                            <button type="button" className="pricing-save-button">
                                {activePricingTab === "services"
                                    ? "حفظ التعديلات"
                                    : "تحديث نسب التغطية"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BillingManeger;