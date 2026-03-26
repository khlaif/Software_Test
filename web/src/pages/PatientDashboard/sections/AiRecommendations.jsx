import React, { useEffect, useMemo, useState } from "react";
import sheildIcon from "../../../assets/shield-check.svg";
import brainIcon from "../../../assets/brain-circuit_blue.svg";

function badgeFromPriority(priority) {
    if (priority === "Critical") return { text: "طارئ جدًا", cls: "air__badge--urgent" };
    if (priority === "High") return { text: "عاجل", cls: "air__badge--urgent" };
    if (priority === "Medium") return { text: "متوسط", cls: "air__badge--info" };
    return { text: "منخفض", cls: "air__badge--info" };
}

export default function AiRecommendations() {
    const [aiPayload, setAiPayload] = useState(null);

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
                <button key={`${r.test_name}-${idx}`} className="air__item" type="button">
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
                    <button className="air__itemLeftBTN" type="button">
                        عرض الموعد {" > "}
                    </button>
                    </div>
                </button>
                ))
            )}
            </div>
        </div>
        </div>
    );
}