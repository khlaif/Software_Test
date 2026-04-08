const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const ANALYZE_SYSTEM = `
You are a medical WORKFLOW decision-support assistant.
You MUST NOT diagnose diseases or prescribe treatment.
Return ONLY valid JSON with this schema:

{
    "priority_level": "Low|Medium|High|Critical",
    "summary": "string",
    "matched_symptoms": ["string"],
    "recommended_tests": [{"test_name":"string","reason":"string","confidence":0.0}],
    "red_flags": ["string"]
}
No markdown. No extra text.
Use Arabic in summary/reasons.
`;

const PRE_TEST_SYSTEM = `
You are a medical workflow assistant.
Your task is to generate general pre-test instructions for patients based on the requested medical tests.
You MUST NOT diagnose diseases or prescribe treatments.
You MUST return ONLY valid JSON in this schema:

{
    "instructions": [
        {
            "id": 1,
            "type": "warning|info",
            "text": "string"
        }
    ]
}

Rules:
- No markdown
- No extra text
- Use Arabic only
- Keep instructions practical, short, and patient-friendly
- Prefer 1-2 instructions per test
- Avoid repeating the same instruction
- If no special preparation is needed, return a helpful generic instruction
`;

function safeParse(raw) {
    try {
        return JSON.parse(raw);
    } catch {
        const cleaned = String(raw).replace(/```json|```/g, "").trim();
        try {
            return JSON.parse(cleaned);
        } catch {
            return null;
        }
    }
}

function normalize(data) {
    const allowed = new Set(["Low", "Medium", "High", "Critical"]);
    const out = data && typeof data === "object" ? data : {};

    if (!allowed.has(out.priority_level)) out.priority_level = "Medium";
    out.summary = String(out.summary || "").trim() || "تم تلخيص الأعراض لتنظيم المسار الطبي.";
    out.matched_symptoms = Array.isArray(out.matched_symptoms)
        ? out.matched_symptoms.slice(0, 12)
        : [];

    const recs = Array.isArray(out.recommended_tests) ? out.recommended_tests : [];
    out.recommended_tests = recs
        .slice(0, 6)
        .map((t) => ({
            test_name: String(t.test_name || "").trim(),
            reason: String(t.reason || "").trim(),
            confidence: Math.max(0, Math.min(1, Number(t.confidence ?? 0.65))),
        }))
        .filter((t) => t.test_name);

    out.red_flags = Array.isArray(out.red_flags) ? out.red_flags.slice(0, 8) : [];
    return out;
}

function normalizeInstructions(data) {
    const out = data && typeof data === "object" ? data : {};
    const instructions = Array.isArray(out.instructions) ? out.instructions : [];

    return {
        instructions: instructions
            .slice(0, 12)
            .map((item, index) => ({
                id: Number(item.id) || index + 1,
                type: item.type === "warning" ? "warning" : "info",
                text: String(item.text || "").trim(),
            }))
            .filter((item) => item.text),
    };
}

exports.runLLM = async (symptomsText) => {
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const resp = await client.chat.completions.create({
        model,
        temperature: 0.2,
        messages: [
            { role: "system", content: ANALYZE_SYSTEM },
            {
                role: "user",
                content: `الأعراض كما كتبها المريض:\n${symptomsText}\n\nأعد JSON فقط.`,
            },
        ],
    });

    const raw = resp.choices?.[0]?.message?.content || "{}";
    return normalize(safeParse(raw));
};

exports.runPreTestInstructions = async (tests = []) => {
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const safeTests = Array.isArray(tests)
        ? tests.map((t) => String(t || "").trim()).filter(Boolean).slice(0, 10)
        : [];

    const resp = await client.chat.completions.create({
        model,
        temperature: 0.2,
        messages: [
            { role: "system", content: PRE_TEST_SYSTEM },
            {
                role: "user",
                content: `الفحوصات المطلوبة للمريض:\n${safeTests.join("\n")}\n\nأعد JSON فقط.`,
            },
        ],
    });

    const raw = resp.choices?.[0]?.message?.content || "{}";
    return normalizeInstructions(safeParse(raw));
};