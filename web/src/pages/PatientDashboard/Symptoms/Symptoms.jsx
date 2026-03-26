import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeSymptoms } from "../../../services/api";
import "./Symptoms.css";

import brainIcon from "../../../assets/brain-circuit.svg";
import messageIcon from "../../../assets/message-square.svg";
import sparkleIcon from "../../../assets/sparkle.svg";
import plusIcon from "../../../assets/plus.svg";
import alertIcon from "../../../assets/circle-alert.svg";
import sentIcon from "../../../assets/send.svg";
import LoadingIcon from "../../../assets/activity.svg";

const QUICK_Symptoms = [
    "الم في الصدر",
    "ضيق تنفس",
    "صداع نصفي",
    "سعال جاف",
    "ارتفاع حرارة",
];

export default function Symptoms() {
    const [text, setText] = useState("");
    const [selected, setSelected] = useState(new Set());
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const navigate = useNavigate();
    const chips = useMemo(() => QUICK_Symptoms, []);
    const placeholder =
        "ابدا بالكتابة هنا... (مثال: اشعر بضيق في التنفس عند الصعود في السلالم)";

    const canAnalyze = text.trim().length > 0;

    const quickToText = (label) => {
        setText((t) => (t ? `${t} ،${label}` : `${label}`));
        setSelected((prev) => new Set(prev).add(label));
    };

    const handleAnalyze = async () => {
        if (!canAnalyze || isAnalyzing) return;

        try {
        setIsAnalyzing(true);

        const token = localStorage.getItem("token");
        const result = await analyzeSymptoms(text, token);

        // للتأكد أنه انحفظ
        localStorage.setItem("ai_result", JSON.stringify(result));
        console.log("Saved ai_result:", result);

        navigate("/dashboard");
        } catch (e) {
        console.error("Analyze error:", e);
        alert("صار خطأ أثناء تحليل الأعراض");
        } finally {
        setIsAnalyzing(false);
        }
    };

    return (
        <div className="symp">
        <header className="symp__header">
            <div className="symp__logoWrap" aria-hidden="true">
            <div className="symp__logoPulse">
                <img className="symp__logo" src={brainIcon} alt="" />
            </div>
            </div>

            <h1 className="symp__title">كيف تشعر اليوم؟</h1>
            <p className="symp__subtitle">
            أدخل أعراضك بدقّة وسيقوم محرّك{" "}
            <span className="symp__brand">MEDFLOW AI</span> بتحليلها لتنظيم مسارك الطبي.
            </p>
        </header>

        <main className="symp__main">
            <section className="sympCard">
            <div className="sympCard__head">
                <h2 className="sympCard__title">وصف الحالة الصحية</h2>
                <span className="sympCard__icon" aria-hidden="true">
                <img src={messageIcon} alt="Message Icon" />
                </span>
            </div>

            <div className="sympCard__box">
                <textarea
                className="sympCard__textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                />
            </div>

            <div className="sympCard__quickRow">
                <div className="sympCard__quickLabel">
                <span className="sympCard__spark" aria-hidden="true">
                    <img src={sparkleIcon} alt="SparkleIcon" />
                </span>
                <span>اختصارات سريعة</span>
                </div>

                <div className="sympCard__chips" role="list">
                {chips.map((c) => {
                    const active = selected.has(c);
                    return (
                    <button
                        key={c}
                        type="button"
                        className={`sympChip ${active ? "is-active" : ""}`}
                        onClick={() => quickToText(c)}
                    >
                        <span className="sympChip__plus" aria-hidden="true">
                        <img src={plusIcon} alt="plusIcon" />
                        </span>
                        <span>{c}</span>
                    </button>
                    );
                })}
                </div>
            </div>

            <button
                type="button"
                className={`sympBtn 
                ${!canAnalyze ? "is-disabled" : ""} 
                ${isAnalyzing ? "is-processing" : "is-active"}`}
                onClick={handleAnalyze}
                disabled={!canAnalyze || isAnalyzing}
            >
                <span className={`sympBtn__icon ${isAnalyzing ? "spin" : ""}`} aria-hidden="true">
                <img src={isAnalyzing ? LoadingIcon : sentIcon} alt="icon" />
                </span>

                {isAnalyzing ? "جاري تحليل الأعراض..." : "تحليل الأعراض بالذكاء الاصطناعي"}
            </button>

            <div className="sympAlert" role="note" aria-label="تنبيه طبي">
                <div className="sympAlert__top">
                <strong>تنبيه طبي</strong>
                <span className="sympAlert__dot" aria-hidden="true">
                    <img src={alertIcon} alt="alertIcon" />
                </span>
                </div>
                <p className="sympAlert__text">
                هذا النظام مصمّم للمساعدة في الجدولة والتنظيم فقط. إذا كنت تعاني من أعراض خطيرة
                تُهدِّد الحياة، يُرجى التوجّه فورًا لأقرب مستشفى.
                </p>
            </div>
            </section>
        </main>
        </div>
    );
}