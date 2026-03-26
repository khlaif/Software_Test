import "../Home.css";
import shield_icon from "../../../assets/shield-check.svg"
import glope_icon from "../../../assets/globe.svg"
import lock_icon from "../../../assets/lock.svg"
import stethoscope_icon from "../../../assets/stethoscope.svg"



export default function StatsSection() {
    const stats = [
        { icon: <img src={shield_icon} alt="Shield Icon" />, value: "98.5%", label: "دقة التحليل" },
        { icon: <img src={glope_icon} alt="Globe Icon" />, value: "+15", label: "مستشفيات مرتبطة" },
        { icon: <img src={stethoscope_icon} alt="Stethoscope Icon" />, value: "30%", label: "توفير وقت الطبيب" },
        { icon: <img src={lock_icon} alt="Lock Icon" />, value: "AES-256", label: "أمان البيانات" },
    ];

    return (
        <section className="section stats" id="stats">
        <div className="container">
            <div className="stats__grid">
            {stats.map((s) => (
                <article key={s.label} className="card statCard">
                <div className="statCard__icon" aria-hidden="true">{s.icon}</div>
                <div className="statCard__value">{s.value}</div>
                <div className="statCard__label">{s.label}</div>
                </article>
            ))}
            </div>

            <div className="stats__headline">
            <div className="stats__pill">المميزات الأساسية</div>
            <h2 className="stats__title">حلول طبية متكاملة</h2>
            <p className="stats__desc">نحن لا نقدم مجرد برنامج، نحن نقدم شريكاً ذكياً لصحتك.</p>
            </div>
        </div>
        </section>
    );
}
