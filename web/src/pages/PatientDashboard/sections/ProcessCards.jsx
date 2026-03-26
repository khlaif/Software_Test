import { useNavigate } from "react-router-dom";
import activityIcon from "../../../assets/activity.svg"
import brainIcon from "../../../assets/brain-circuit.svg"
import calenderIcon from "../../../assets/calendar.svg"
import checkIcon from "../../../assets/check.svg"
import noteIcon from "../../../assets/notepad-text.svg"
import videoIcon from "../../../assets/video white.svg"

const cards = [
    { title: "إدخال الأعراض", icon: <img src={activityIcon} alt="" />, status: "مكتمل", tone: "done", route: "/symptoms", soft: "#2563eb" },
    { title: "تحليل الذكاء الاصطناعي", icon: <img src={brainIcon} alt="" />, status: "مكتمل", tone: "done", route: "/analysis", soft: "#8b5cf6" },
    { title: "الجدولة الذكية", icon: <img src={calenderIcon} alt="" />, status: "مكتمل", tone: "done", route: "/scheduling", soft: "#F97316" },
    { title: "النتائج النهائية", icon: <img src={checkIcon} alt="" />, status: "مكتمل", tone: "done", route: "/results", soft: "#10B981" },
    { title: "خطة المتابعة", icon: <img src={noteIcon} alt="" />, status: "قيد التنفيذ", tone: "active", route: "/follow-up", soft: "#2563EB" },
    { title: "العلاج عن بعد", icon: <img src={videoIcon} alt="" />, status: "انتظار", tone: "wait", route: "/telemed", soft: "#94A3B8" },
];

export default function ProcessCards() {
    const navigate = useNavigate();

    return (
        <div className="pcards">
        {cards.map((c) => (
            <button
                key={c.title}
                className={`pcard pcard--${c.tone}`}
                style={{ "--soft": c.soft }}
                onClick={() => navigate(c.route)}
                type="button"
            >
            <div className="pcard__icon">{c.icon}</div>
            <div className="pcard__title">{c.title}</div>
            <div className="pcard__status">{c.status}</div>
            </button>
        ))}
        </div>
    );
}
