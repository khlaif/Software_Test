import "../Home.css";
import calendar_icon from "../../../assets/calendar.svg"
import brain_icon from "../../../assets/brain-circuit.svg";
import acticity_icon from "../../../assets/activity.svg";


export default function FeaturesSection() {
  const items = [
    {
      icon: <img src={calendar_icon} alt="Calendar Icon" />,
      title: "الجدولة الذكية",
      desc: "خوارزميات متقدمة لتوزيع الحالات وتجنب الازدحام في غرف الفحص.",
      color: "blue",
    },
    {
      icon: <img src={brain_icon} alt="Brain Icon" />,
      title: "تحليل الأعراض NLP",
      desc: "فهم عميق للشكوى الطبية وتوجيه المريض للفحوصات الصحيحة فوراً.",
      color: "purple",
    },
    {
      icon: <img src={acticity_icon} alt="Activity Icon" />,
      title: "التاريخ البصري",
      desc: "رؤية شاملة لتاريخك المرضي تساعد الطبيب في فهم حالتك بدقة.",
      color: "green",
    },
  ];

  return (
    <section className="section features" id="features">
      <div className="container">
        <div className="features__grid">
          {items.map((it) => (
            <article key={it.title} className="card featureCard">
              <div className={`featureCard__icon featureCard__icon--${it.color}`}>
                <span aria-hidden="true">{it.icon}</span>
              </div>

              <h3 className="featureCard__title">{it.title}</h3>
              <p className="featureCard__desc">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
