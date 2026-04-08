import { useMemo } from "react";
import "./FinancialReportsTab.css";
import AddResourceButton from "../components/AddResourceButton";

const defaultInvoices = [
    {
        id: 1,
        invoiceNumber: "INV-2024-8992",
        patientName: "أحمد محمود",
        date: "15 أكتوبر 2024",
        insurance: "شركة التأمين الوطنية",
        amount: 466,
        status: "pending",
    },
    {
        id: 2,
        invoiceNumber: "INV-2024-8991",
        patientName: "سارة خليل",
        date: "14 أكتوبر 2024",
        insurance: "التأمين الصحي الحكومي",
        amount: 120,
        status: "paid",
    },
    {
        id: 3,
        invoiceNumber: "INV-2024-8990",
        patientName: "محمد قاسم",
        date: "14 أكتوبر 2024",
        insurance: "بدون تأمين",
        amount: 850,
        status: "pending",
    },
    {
        id: 4,
        invoiceNumber: "INV-2024-8989",
        patientName: "ليلى سعيد",
        date: "12 أكتوبر 2024",
        insurance: "شركة التأمين الوطنية",
        amount: 0,
        status: "paid",
    },
    {
        id: 5,
        invoiceNumber: "INV-2024-8988",
        patientName: "نور الهدى يوسف",
        date: "11 أكتوبر 2024",
        insurance: "التأمين العربي الموحد",
        amount: 235,
        status: "review",
    },
];

const operationalMetricsSeed = {
    totalExpenses: 8200,
    expensesChangeText: "2.1%-",
    revenueChangeText: "+8.5%",
};

const formatCurrency = (value) => {
    return `₪${Number(value || 0).toLocaleString("en-US")}`;
};

const normalizeArabicDate = (dateText) => {
    return String(dateText || "").trim();
};

const FinancialReportsTab = ({
    invoices = defaultInvoices,
    operationalMetrics = operationalMetricsSeed,
    selectedDateLabel = "اليوم",
    onOpenAddResource,
}) => {
    const reportsData = useMemo(() => {
        const safeInvoices = Array.isArray(invoices) ? invoices : [];

        const paidInvoices = safeInvoices.filter((invoice) => invoice.status === "paid");
        const paidRevenue = paidInvoices.reduce(
            (sum, invoice) => sum + Number(invoice.amount || 0),
            0
        );

        const todayReference =
            safeInvoices.length > 0
                ? normalizeArabicDate(safeInvoices[0].date)
                : "";

        const todayInvoices = safeInvoices.filter(
            (invoice) => normalizeArabicDate(invoice.date) === todayReference
        );

        const todayPaidRevenue = todayInvoices
            .filter((invoice) => invoice.status === "paid")
            .reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);

        const insuredPatientsCount = safeInvoices.filter(
            (invoice) =>
                invoice.insurance &&
                invoice.insurance !== "بدون تأمين" &&
                invoice.insurance.trim() !== ""
        ).length;

        const insuredRate =
            safeInvoices.length > 0
                ? Math.round((insuredPatientsCount / safeInvoices.length) * 100)
                : 0;

        return {
            paidRevenue,
            todayPaidRevenue,
            insuredRate,
            totalExpenses: Number(operationalMetrics?.totalExpenses || 0),
        };
    }, [invoices, operationalMetrics]);

    return (
        <section className="financial-reports-tab" dir="rtl">
            <header className="financial-reports-header">
                <div className="financial-reports-heading">
                    <h1>التقارير المالية والتشغيلية</h1>
                    <p>العوائد، التكاليف، وإحصائيات النمو.</p>
                </div>

                <AddResourceButton onClick={onOpenAddResource} />

            </header>

            <section className="financial-summary-grid">
                <article className="financial-summary-card">
                    <div className="summary-card-title-wrap">
                        <h3>الإيرادات اليومية</h3>
                    </div>

                    <div className="summary-card-value success">
                        {formatCurrency(reportsData.todayPaidRevenue)}
                    </div>

                    <div className="summary-card-foot success">
                        <span className="summary-change-text">
                            {operationalMetrics?.revenueChangeText || "+0%"}
                        </span>
                        <span className="summary-change-label">زيادة</span>
                        <span className="summary-change-arrow"></span>
                    </div>
                </article>

                <article className="financial-summary-card">
                    <div className="summary-card-title-wrap">
                        <h3>التكاليف التشغيلية</h3>
                    </div>

                    <div className="summary-card-value danger">
                        {formatCurrency(reportsData.totalExpenses)}
                    </div>

                    <div className="summary-card-foot danger">
                        <span className="summary-change-text">
                            {operationalMetrics?.expensesChangeText || "0%"}
                        </span>
                        <span className="summary-change-label">(ضمن المعدل)</span>
                        <span className="summary-change-arrow"></span>
                    </div>
                </article>

                <article className="financial-summary-card">
                    <div className="summary-card-title-wrap">
                        <h3>المرضى المؤمنين</h3>
                    </div>

                    <div className="summary-card-value primary">
                        {reportsData.insuredRate}%
                    </div>

                    <div className="summary-card-foot neutral single-line">
                        <span className="summary-secondary-text">
                            من إجمالي الحالات {selectedDateLabel}
                        </span>
                    </div>
                </article>
            </section>

            <section className="financial-main-panel">
                <div className="financial-chart-center">
                    <div className="financial-chart-icon-slot" aria-hidden="true"></div>
                    <h2>منطقة عرض المخططات البيانية</h2>
                    <p>سيتم دمج مكتبة رسوم بيانية (مثل Recharts) هنا قريباً.</p>
                </div>
            </section>
        </section>
    );
};

export default FinancialReportsTab;