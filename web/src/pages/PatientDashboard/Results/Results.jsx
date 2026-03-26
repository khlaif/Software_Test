import React, { useMemo, useState } from "react";
import "./Results.css";

import downloadIcon from "../../../assets/download.svg";
import shareIcon from "../../../assets/share-2.svg";
import checkCircle from "../../../assets/circle-check.svg";
import warningIcon from "../../../assets/circle-alert.svg";
import fileicon from "../../../assets/file-text_blue.svg";
import reporticon from "../../../assets/clipboard-list.svg";

export default function Results() {
    const [openIndex, setOpenIndex] = useState(null);

    const stored = useMemo(() => {
        try {
        return JSON.parse(localStorage.getItem("ai_result") || "null");
        } catch {
        return null;
        }
    }, []);

    const viewModel = useMemo(() => {
        

        const fallback = {
        completedTag: "اكتمل المسار التشخيصي",
        title: "النتائج والتقارير النهائية",
        subtitle: "تمت مراجعة جميع الفحوصات من قبل الطبيب المختص.",
        finalDiagnosis:
            "بناءً على نتائج تخطيط القلب وفحوصات الدم، تبين وجود إجهاد عضلي بسيط. تم وصف الراحة التامة لمدة 3 أيام مع علاج (بروفين 400 ملغ) عند الضرورة.",
        followUp: [
            "الراحة التامة وتجنب المجهود البدني العنيف.",
            "شرب كميات وافرة من السوائل.",
            "مراجعة العيادة بعد أسبوع لإجراء فحص جهد.",
        ],
        warning:
            "في حال عودة الألم بشكل حاد أو الشعور بدوار مفاجئ، يرجى مراجعة الطوارئ فوراً وعدم الانتظار لموعد المتابعة.",
        tests: [
            {
            title: "تخطيط القلب (ECG)",
            summary: "طبيعي مع تسارع بسيط",
            date: "Feb 16",
            status: "طبيعي",
            details: ["لا توجد مؤشرات خطورة حالية", "متابعة عند اللزوم"],
            },
            {
            title: "فحص إنزيمات القلب",
            summary: "3.2 ng/mL (ضمن المدى)",
            date: "Feb 16",
            status: "طبيعي",
            details: ["النتيجة ضمن المدى المرجعي", "لا يلزم إجراء إضافي حالياً"],
            },
            {
            title: "أشعة سينية للصدر",
            summary: "طبيعي",
            date: "Feb 16",
            status: "طبيعي",
            details: ["لا توجد علامات التهاب", "لا توجد سوائل على الرئة"],
            },
        ],
        };

        if (!stored) return fallback;

        return {
        completedTag: stored.completedTag || fallback.completedTag,
        title: stored.title || fallback.title,
        subtitle: stored.subtitle || fallback.subtitle,
        finalDiagnosis: stored.finalDiagnosis || fallback.finalDiagnosis,
        followUp: Array.isArray(stored.followUp) ? stored.followUp : fallback.followUp,
        warning: stored.warning || fallback.warning,
        tests: Array.isArray(stored.tests) ? stored.tests : fallback.tests,
        };
    }, [stored]);

    const onDownloadPDF = () => {
        alert("قريباً: تنزيل التقرير PDF");
    };

    const onShare = async () => {
        const shareText = `${viewModel.title}\n\n${viewModel.finalDiagnosis}`;
        try {
        if (navigator.share) {
            await navigator.share({
            title: viewModel.title,
            text: shareText,
            });
        } else {
            await navigator.clipboard.writeText(shareText);
            alert("تم نسخ ملخص التقرير للحافظة للمشاركة.");
        }
        } catch (e) {
        console.error(e);
        alert("تعذر المشاركة حالياً.");
        }
    };

    return (
        <div className="results">
        <div className="results__container">
            <div className="results__topRow">
            <div className="results__titles">
                <div className="results__badge">
                <span className="results__badgeDot" aria-hidden="true">
                    <img src={checkCircle} alt="checkCircle" />
                </span>
                {viewModel.completedTag}
                </div>
                <h1 className="results__h1">{viewModel.title}</h1>
                <p className="results__sub">{viewModel.subtitle}</p>
            </div>

            <div className="results__actions">
                <button className="rbtn rbtn--primary" type="button" onClick={onDownloadPDF}>
                    <img src={downloadIcon} alt="downloadIcon" className="rbtn__icon" />
                    تحميل الكل (PDF)
                </button>

                <button className="rbtn rbtn--ghost" type="button" onClick={onShare}>
                    <img src={shareIcon} alt="shareIcon" className="rbtn__icon"/>
                مشاركة
                </button>
            </div>
            </div>

            <div className="results__grid">

            <div className="results__right">
                <div className="card card--diagnosis">
                <div className="card__headRow">
                    <h3 className="card__title">
                        <img src={reporticon} alt="report icon" />
                        التشخيص النهائي
                    </h3>
                </div>
                <p className="card__quote">“{viewModel.finalDiagnosis}”</p>
                </div>

                <div className="section">
                <h3 className="section__title">تفاصيل الفحوصات</h3>

                <div className="tests">
                    {viewModel.tests.map((t, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div className="test" key={idx}>
                        <button
                            type="button"
                            className="test__row"
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                        >
                            <div className="test__meta">
                            <div className="test__title">
                                <img src={fileicon} alt="file icon" />
                                {t.title}
                                </div>
                            <div className="test__summary">{t.summary}</div>
                            </div>

                            <div className="test__right">
                                <span className="test__date">{t.date}</span>
                                <span className={`status status--ok`}>{t.status}</span>
                            
                                <span className="chev" aria-hidden="true">
                                {isOpen ? "اغلاق" : "فتح"}
                                </span>
                            </div>
                        </button>

                        {isOpen && (
                            <div className="test__body">
                            {(t.details || []).map((d, i) => (
                                <div className="test__line" key={i}>
                                • {d}
                                </div>
                            ))}
                            </div>
                        )}
                        </div>
                    );
                    })}
                </div>
                </div>
            </div>
            <div className="results__left">
                <div className="card card--soft">
                <h3 className="card__title">تعليمات المتابعة</h3>
                <ol className="list">
                    {viewModel.followUp.map((t, i) => (
                    <li key={i} className="list__item">
                        <span className="list__num">{i + 1}</span>
                        <span className="list__text">{t}</span>
                    </li>
                    ))}
                </ol>
                </div>

                <div className="card card--warn">
                <h3 className="card__warning">
                    <img src={warningIcon} alt="warningIcon" /> 
                    متى يجب القلق؟
                </h3>
                <p className="card__p">{viewModel.warning}</p>
                </div>
            </div>



            </div>

        </div>
        </div>
    );
}