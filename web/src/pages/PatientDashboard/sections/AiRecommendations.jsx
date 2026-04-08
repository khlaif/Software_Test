import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import sheildIcon from "../../../assets/shield-check.svg";
import brainIcon from "../../../assets/brain-circuit_blue.svg";

function badgeFromPriority(priority) {
    if (priority === "Critical") return { text: "طارئ جدًا", cls: "air__badge--urgent" };
    if (priority === "High") return { text: "عاجل", cls: "air__badge--urgent" };
    if (priority === "Medium") return { text: "متوسط", cls: "air__badge--info" };
    return { text: "منخفض", cls: "air__badge--info" };
}

function formatArabicTime(time24) {
    const [hourStr, minute] = time24.split(":");
    let hour = Number(hourStr);
    const period = hour >= 12 ? "مساءً" : "صباحاً";

    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;

    return `${String(hour).padStart(2, "0")}:${minute} ${period}`;
}

function formatArabicDate(dateString) {
    const date = new Date(dateString);

    const days = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
    ];

    const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
    ];

    return `${days[date.getDay()]}، ${date.getDate()} ${months[date.getMonth()]}`;
}

// مؤقتًا لحين الربط مع الداتابيس
// لاحقًا الواجهة الخلفية سترجع:
// test appointments + doctor appointment + location + doctor الحقيقي
function buildScheduledAppointments(recommendedTests = [], priority = "Medium") {
    const today = new Date();

    // أوقات الفحوصات
    const testSlots = ["09:00", "10:00", "11:00", "14:00", "15:00"];
    // موعد الطبيب يكون بعد الفحوصات
    const doctorReviewTime = "17:00";

    const testAppointments = recommendedTests.map((test, index) => {
        const scheduleDate = new Date(today);
        scheduleDate.setDate(today.getDate() + Math.floor(index / testSlots.length));

        const time24 = testSlots[index % testSlots.length];

        return {
            id: Date.now() + index,
            title: test.test_name,
            location: "سيتم تحديد موقع الفحص من قاعدة البيانات",
            doctor: null,
            date: formatArabicDate(scheduleDate.toISOString()),
            time: formatArabicTime(time24),
            status: index === 0 ? "suggested" : "pending",
            statusLabel: index === 0 ? "مقترح من النظام" : "قيد التأكيد",
            actions: index === 0 ? ["change", "confirm"] : ["change"],
            reason: test.reason || "",
            appointmentType: "test",
            priority,
        };
    });

    // إذا لا يوجد فحوصات، لا نضيف موعد طبيب
    if (testAppointments.length === 0) return [];

    const lastTestDate = new Date(today);
    lastTestDate.setDate(today.getDate() + Math.floor((testAppointments.length - 1) / testSlots.length));

    const doctorAppointment = {
        id: Date.now() + 9999,
        title: "معاينة طبيب (مراجعة النتائج)",
        location: "سيتم تحديد العيادة من قاعدة البيانات",
        doctor: "سيتم تحديد الطبيب المسؤول من قاعدة البيانات",
        date: formatArabicDate(lastTestDate.toISOString()),
        time: formatArabicTime(doctorReviewTime),
        status: "pending",
        statusLabel: "قيد التأكيد",
        actions: ["change", "confirm"],
        reason: "موعد مراجعة بعد إتمام الفحوصات المقترحة من النظام",
        appointmentType: "doctor_review",
        priority,
    };

    return [...testAppointments, doctorAppointment];
}

export default function AiRecommendations() {
    const [aiPayload, setAiPayload] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const raw = localStorage.getItem("ai_result");
        if (raw) setAiPayload(JSON.parse(raw));
    }, []);

    const aiData = aiPayload?.data;
    const priority = aiData?.priority_level || "Medium";
    const badge = useMemo(() => badgeFromPriority(priority), [priority]);

    const recs = aiData?.recommended_tests || [];
    const redFlags = aiData?.red_flags || [];
    const summary = aiData?.summary || "لم يتم العثور على تحليل بعد.";

    const generatedAppointments = useMemo(() => {
        return buildScheduledAppointments(recs, priority);
    }, [recs, priority]);

    const handleViewAppointments = () => {
        localStorage.setItem("scheduled_appointments", JSON.stringify(generatedAppointments));
        navigate("/scheduling", {
            state: {
                appointments: generatedAppointments,
            },
        });
    };

    return (
        <div className="card">
            <div style={{ padding: 18 }}>
                <div className="air__top">
                    <div className="air__shield">
                        <img src={sheildIcon} alt="SheildIcon" />
                    </div>
                    <h3 className="air__title">توصيات المحرك الذكي MEDFLOW</h3>
                </div>

                <div className="air__callout">
                    <div className="air__callIcon">
                        <img src={brainIcon} alt="Brain" />
                    </div>
                    <div>
                        <div className="air__callTitle">
                            تحليل متقدم للأعراض
                            <span className={`air__badge ${badge.cls}`} style={{ marginInlineStart: 10 }}>
                                {badge.text}
                            </span>
                        </div>
                        <div className="air__callText">{summary}</div>

                        {aiPayload?.warning && (
                            <div className="air__callText" style={{ marginTop: 8, opacity: 0.8 }}>
                                ⚠ {aiPayload.warning}
                            </div>
                        )}
                    </div>
                </div>

                {redFlags.length > 0 && (
                    <div className="air__callout" style={{ marginTop: 12 }}>
                        <div>
                            <div className="air__callTitle">مؤشرات خطر (Red Flags)</div>
                            <div className="air__callText">
                                {redFlags.join("، ")}
                            </div>
                        </div>
                    </div>
                )}

                <div className="air__list">
                    {recs.length === 0 ? (
                        <div className="air__itemDesc">لا توجد توصيات حالياً.</div>
                    ) : (
                        recs.map((r, idx) => (
                            <div key={`${r.test_name}-${idx}`} className="air__item">
                                <div>
                                    <div className="air__itemTitle">
                                        {r.test_name}
                                        <span className={`air__badge ${badge.cls}`}>
                                            {badge.text}
                                        </span>
                                    </div>
                                    <div className="air__itemDesc">{r.reason}</div>
                                </div>

                                <div>
                                    <button
                                        className="air__itemLeftBTN"
                                        type="button"
                                        onClick={handleViewAppointments}
                                    >
                                        عرض الموعد {" > "}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}