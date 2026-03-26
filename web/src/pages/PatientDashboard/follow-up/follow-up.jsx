import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./follow-up.css";

import alerticon from "../../../assets/circle-alert.svg"
import fileicon from "../../../assets/clipboard-list_blue.svg"
import pillicon from "../../../assets/pill.svg"
import checkicon from "../../../assets/check.svg"
import progressicon from "../../../assets/sparkles_white.svg"

export default function FollowUp() {
    const navigate = useNavigate();

    const [bp, setBp] = useState({ sys: 120, dia: 80, status: "طبيعي" });
    const [done, setDone] = useState({
        bp: true,
        med: true,
        pulse: false,
        doctor: false,
    });

    const progress = useMemo(() => {
        const total = Object.keys(done).length;
        const completed = Object.values(done).filter(Boolean).length;
        return {
        total,
        completed,
        percent: Math.round((completed / total) * 100),
        };
    }, [done]);

    const meds = [
        { id: 1, name: "بروفين 400 ملغ", dose: "حبة واحدة عند اللزوم", when: "بعد الأكل" },
        { id: 2, name: "أوميبرازول", dose: "حبة واحدة يومياً", when: "قبل الإفطار" },
    ];

    const tasks = [
        { id: "bp", title: "قياس ضغط الدم", time: "08:00 ص" },
        { id: "med", title: "تناول الدواء الصباحي", time: "08:30 ص" },
        { id: "pulse", title: "قياس النبض", time: "02:00 م" },
        { id: "doctor", title: "مراجعة الطبيب (عن بُعد)", time: "06:00 م" },
    ];

    const bpNote =
        "سيقوم النظام بتنبيه الطبيب (مثال: د. سامي خالد) تلقائياً في حال إدخالك لقراءات ضغط دم تتجاوز 140/90.";

    const handleToggleTask = (key) => {
        setDone((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="fu">
        <div className="fu__container">
            <div className="fu__topRow">
            

            <div className="fu__titleWrap">
                <div className="fu__kicker">
                <img src={fileicon} alt="File Icon" />
                خطة المتابعة الذكية
                </div>

                <h1 className="fu__title">متابعة ما بعد العلاج</h1>
                <p className="fu__subtitle">نحن هنا لضمان تعافيك الكامل والوقاية من المضاعفات.</p>
            </div>
            <button className="tele__back" onClick={() => navigate("/dashboard")}>
                العودة للوحة التحكم
            </button>
            </div>

            <div className="fu__grid">

            <div className="fu__colRight">

                <section className="fu__card fu__progressCard">
                    <img
                        src={progressicon}
                        alt=""
                        aria-hidden="true"
                        draggable="false"
                    />
                    <div className="fu__progressInner">
                        <div className="fu__progressRight">
                        <div className="fu__progressTitle">تقدم التعافي اليوم</div>
                        <div className="fu__progressSub">
                            أكملت {progress.completed} من أصل {progress.total} مهام صحية
                        </div>

                        <div className="fu__barWrap">
                            <div className="fu__progressPercentOnBar">{progress.percent}%</div>

                            <div className="fu__bar" role="progressbar" aria-valuenow={progress.percent} aria-valuemin={0} aria-valuemax={100}>
                            <div className="fu__barFill" style={{ width: `${progress.percent}%` }} />
                            </div>
                        </div>
                        </div>
                    </div>
                </section>

                <div className="fu__sectionHead">
                <h2 className="fu__sectionTitle">
                    <img src={pillicon} alt="Pill Icon" />
                    جدول الأدوية
                </h2>
                </div>

                <div className="fu__medsRow">
                {meds.map((m) => (
                    <article key={m.id} className="fu__card fu__medCard">
                        <div  className="fu__iconBtn">
                            <img src={pillicon} alt="Pill Icon" />
                        </div>
                    <div className="fu__medMain">
                        <div className="fu__medName">{m.name}</div>
                        <div className="fu__medDose">{m.dose}</div>
                        <span className="fu__chip">{m.when}</span>
                    </div>
                    </article>
                ))}
                </div>

                <div className="fu__sectionHead">
                <h2 className="fu__sectionTitle">المهام الصحية اليومية</h2>
                </div>

                <section className="fu__card fu__tasksCard">
                {tasks.map((t) => (
                    <div key={t.id} className="fu__taskRow">
                    
                    <div className="fu__taskCheck" aria-hidden="true">
                        {done[t.id] ? (
                        <div className="fu__check is-on">
                            <img src={checkicon} alt="Checked" />
                        </div>
                        ) : (
                        <span className="fu__check is-off" />
                        )}
                    </div>

                    <div className="fu__taskInfo">
                        <div className={`fu__taskTitle ${done[t.id] ? "is-done" : ""}`}>
                        {t.title}
                        </div>
                        <div className="fu__taskTime">{t.time}</div>
                    </div>
                    <button
                        type="button"
                        className="fu__taskUpdate"
                        onClick={() => handleToggleTask(t.id)}
                    >
                        تحديث
                    </button>
                    </div>
                ))}
                </section>
            </div>
            <div className="fu__colLeft">
                <section className="fu__card fu__alertCard">
                <div className="fu__alertHead">
                    <div className="fu__alertTitle">
                        <img src={alerticon} alt="Alert Icon" />
                        تنبيه الطبيب
                    </div>
                </div>

                <p className="fu__alertText">{bpNote}</p>

                <div className="fu__bpBox">
                    <div className="fu__bpMeta">
                    <div className="fu__bpLabel">آخر قراءة مدخلة</div>
                    <div className="fu__bpValue">
                        {bp.sys}/{bp.dia}
                    </div>
                    </div>

                    <span className={`fu__pill ${bp.status === "طبيعي" ? "is-ok" : "is-warn"}`}>
                    {bp.status}
                    </span>
                </div>

                <button className="fu__warnBtn" type="button">
                    إدخال قراءة جديدة
                </button>
                </section>

                <section className="fu__card fu__tipCard">
                <h3 className="fu__cardTitle">نصيحة اليوم</h3>
                <ul className="fu__tipList">
                    <li>المشي لمدة 15 دقيقة يساعد في تحسين الدورة الدموية.</li>
                    <li>تأكّد من شرب 8 أكواب من الماء للحفاظ على ترطيب الجسم.</li>
                </ul>
                </section>
            </div>
            </div>
        </div>
        </div>
    );
}