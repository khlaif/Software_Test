const { runLLM } = require("../../services/ai.service.openai");
const { fallbackAnalyze } = require("../../services/fallback.service");

function isQuotaOrRateLimit(error) {
    const msg = String(error?.message || "").toLowerCase();
    const status = error?.status;

    return (
        status === 429 ||
        msg.includes("insufficient_quota") ||
        msg.includes("exceeded your current quota") ||
        msg.includes("rate limit")
    );
}

exports.analyzeSymptoms = async (req, res) => {
    const { symptoms_text } = req.body;

    if (!symptoms_text || !symptoms_text.trim()) {
        return res.status(400).json({ message: "symptoms_text is required" });
    }

    try {
        const llmResult = await runLLM(symptoms_text);

        return res.status(200).json({
        source: "openai",
        data: llmResult,
        });
    } catch (error) {
        if (isQuotaOrRateLimit(error)) {
        const fb = fallbackAnalyze(symptoms_text);

        return res.status(200).json({
            source: "fallback",
            warning:
            "OpenAI quota/rate-limit reached. Returned fallback analysis for demo continuity.",
            data: fb,
        });
        }

        console.error("AI Error:", error);

        return res.status(500).json({
        message: "AI failed",
        error: error?.message || "Unknown error",
        });
    }
};