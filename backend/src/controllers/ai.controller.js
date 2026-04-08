const { runLLM, runPreTestInstructions } = require("../../services/ai.service.openai");
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

exports.getPreTestInstructions = async (req, res) => {
    const { tests } = req.body;

    if (!Array.isArray(tests) || tests.length === 0) {
        return res.status(400).json({ message: "tests array is required" });
    }

    try {
        const result = await runPreTestInstructions(tests);

        return res.status(200).json({
            source: "openai",
            instructions: result.instructions || [],
        });
    } catch (error) {
        if (isQuotaOrRateLimit(error)) {
            const fallbackInstructions = tests.map((test, index) => ({
                id: index + 1,
                type: "info",
                text: `يرجى مراجعة تعليمات التحضير الخاصة بفحص ${test} قبل الموعد، وقد تختلف المتطلبات حسب الجهة الطبية.`,
            }));

            return res.status(200).json({
                source: "fallback",
                warning:
                    "OpenAI quota/rate-limit reached. Returned fallback instructions for demo continuity.",
                instructions: fallbackInstructions,
            });
        }

        console.error("PRE_TEST_INSTRUCTIONS_ERROR:", error);

        return res.status(500).json({
            message: "Failed to generate pre-test instructions",
            error: error?.message || "Unknown error",
        });
    }
};