const RED_FLAGS = {
    critical_breathing: [
        "ضيق تنفس شديد",
        "اختناق",
        "مش قادر أتنفس",
        "لا أستطيع التنفس",
        "شفايف زرق",
        "زرقة",
        "ازرقاق",
        "زرق",
    ],
    syncope: ["إغماء", "اغماء", "فقدان وعي", "دوخة قوية لدرجة وقعت"],
    severe_chest_pain: [
        "ألم صدر شديد",
        "وجع صدر قوي",
        "ضغط على الصدر",
        "ألم بالصدر قوي",
        "ألم ينتشر لليد",
        "ألم ينتشر للفك",
        "ألم في الصدر شديد",
    ],
    stroke_signs: [
        "ضعف مفاجئ",
        "شلل",
        "ميلان الوجه",
        "تأتأة",
        "صعوبة كلام",
        "تنميل شديد",
        "فقدان إحساس",
    ],
    severe_bleeding: ["نزيف شديد", "قيء دم", "براز أسود", "نزيف لا يتوقف"],
    anaphylaxis: [
        "تورم الوجه",
        "تورم الشفايف",
        "حساسية شديدة",
        "صعوبة بلع",
        "طفح مع ضيق نفس",
    ],
};

const GENERAL_SYMPTOMS = {
    pain: ["ألم", "يوجع", "وجع", "مؤلم", "تؤلمني", "أوجاع"],
    severe: ["شديد", "قوي", "لا يطاق", "كثير", "جداً", "جدا"],
    swelling: ["تورم", "انتفاخ", "ورم"],
    redness: ["احمرار", "محمر"],
    fever: ["حرارة", "سخونة", "حمى"],
    numbness: ["خدر", "تنميل", "فقدان إحساس"],
    injury: ["وقعت", "سقوط", "اصطدمت", "التواء", "كسر", "رضة", "ضربة"],
};

const BODY_PARTS = {
    foot: ["قدم", "قدمي", "رجلي", "كاحل", "الكاحل", "مشط", "أصابع القدم"],
    leg: ["ساق", "ركبة", "فخذ"],
    arm: ["يد", "ذراع", "كتف"],
    head: ["راس", "رأس", "صداع"],
};

function detectRedFlags(text) {
    const t = (text || "").toLowerCase();
    const hits = [];

    for (const [group, keywords] of Object.entries(RED_FLAGS)) {
        const found = keywords.filter((k) => t.includes(k.toLowerCase()));
        if (found.length) hits.push({ group, found });
    }
    return hits;
}

function hasWord(text, word) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(^|\\s|[.,;:!?،.])${escaped}($|\\s|[.,;:!?،.])`, "i");
    return re.test(text);
}

function detectGeneral(text) {
    const t = (text || "").toLowerCase();
    const found = [];

    for (const [key, words] of Object.entries(GENERAL_SYMPTOMS)) {
        if (words.some((w) => hasWord(t, w.toLowerCase()))) {
        found.push(key);
        }
    }

    for (const [part, words] of Object.entries(BODY_PARTS)) {
        if (words.some((w) => hasWord(t, w.toLowerCase()))) {
        found.push(`body:${part}`);
        }
    }

    return found;
}


function fallbackAnalyze(text) {
    const t = (text || "").toLowerCase();

    const redFlagHits = detectRedFlags(text);
    const generalHits = detectGeneral(text);

    let priority = "Medium";

    const criticalGroups = new Set([
        "critical_breathing",
        "syncope",
        "stroke_signs",
        "severe_bleeding",
        "anaphylaxis",
    ]);

    if (redFlagHits.some((h) => criticalGroups.has(h.group))) {
        priority = "Critical";
    } else if (redFlagHits.some((h) => h.group === "severe_chest_pain")) {
        priority = "High";
    }

    const matched = [
        ...new Set([
        ...redFlagHits.flatMap((h) => h.found),
        ...generalHits,
        ]),
    ];

    const hasFoot =
        BODY_PARTS.foot.some((w) => t.includes(w.toLowerCase())) ||
        t.includes("قدم") ||
        t.includes("قدمي");

    const hasInjury = GENERAL_SYMPTOMS.injury.some((w) =>
        t.includes(w.toLowerCase())
    );
    const hasSwelling = GENERAL_SYMPTOMS.swelling.some((w) =>
        t.includes(w.toLowerCase())
    );
    const hasFever = GENERAL_SYMPTOMS.fever.some((w) =>
        t.includes(w.toLowerCase())
    );

    let recommended_tests = [];

    if (priority !== "Medium") {
        recommended_tests = [
        {
            test_name: "ECG",
            reason: "لتقييم نشاط القلب ضمن إطار تنظيم المسار.",
            confidence: 0.7,
        },
        {
            test_name: "Troponin",
            reason: "مؤشر مخبري يُستخدم ضمن تقييم الأعراض الصدرية.",
            confidence: 0.65,
        },
        {
            test_name: "Chest X-ray",
            reason: "لتقييم أسباب تنفسية محتملة ضمن تنظيم المسار.",
            confidence: 0.6,
        },
        ];
    } else {
        if (hasFoot) {
        if (hasInjury) {
            recommended_tests = [
            {
                test_name: "Foot X-ray",
                reason: "لاستبعاد كسر أو إصابة عظمية محتملة ضمن تنظيم المسار.",
                confidence: 0.75,
            },
            ];
        } else if (hasSwelling) {
            recommended_tests = [
            {
                test_name: "Ultrasound",
                reason: "لتقييم الأنسجة الرخوة/تورم محتمل ضمن تنظيم المسار.",
                confidence: 0.7,
            },
            ];
        } else if (hasFever) {
            recommended_tests = [
            {
                test_name: "CBC",
                reason: "قد يساعد في تقييم مؤشرات الالتهاب ضمن إطار تنظيمي.",
                confidence: 0.6,
            },
            {
                test_name: "CRP",
                reason: "قد يساعد في تقييم وجود التهاب ضمن إطار تنظيمي.",
                confidence: 0.55,
            },
            ];
        } else {
            recommended_tests = [
            {
                test_name: "Clinical examination",
                reason: "الفحص السريري لتحديد سبب الألم الموضعي وتحديد الحاجة لفحوصات إضافية.",
                confidence: 0.65,
            },
            ];
        }
        } else {
        recommended_tests = [
            {
            test_name: "CBC",
            reason: "فحص عام يساعد في تنظيم القرار حول فحوصات إضافية.",
            confidence: 0.6,
            },
            {
            test_name: "CRP",
            reason: "قد يساعد في تقييم وجود التهاب ضمن إطار تنظيمي.",
            confidence: 0.55,
            },
        ];
        }
    }

    const summary =
        priority === "Critical"
        ? "تم رصد مؤشرات خطر تستدعي تقييماً عاجلاً. يُنصح بالتوجه للطوارئ فورًا لتنظيم المسار الطبي."
        : priority === "High"
        ? "الأعراض قد تتطلب تقييمًا عاجلًا لتنظيم المسار التشخيصي."
        : "تم استلام الأعراض وتنظيمها لاقتراح مسار فحوصات مبدئي.";

    return {
        priority_level: priority,
        summary,
        matched_symptoms: matched,
        recommended_tests,
        red_flags: redFlagHits.flatMap((h) => h.found),
    };
}

module.exports = { fallbackAnalyze };