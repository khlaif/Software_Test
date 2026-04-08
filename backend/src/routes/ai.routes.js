const router = require("express").Router();
const {
    analyzeSymptoms,
    getPreTestInstructions,
} = require("../controllers/ai.controller");

router.post("/analyze-symptoms", analyzeSymptoms);
router.post("/pre-test-instructions", getPreTestInstructions);

router.get("/ping-openai", async (req, res) => {
    try {
        const { runLLM } = require("../services/ai.service.openai");
        const out = await runLLM("اختبار بسيط: صداع خفيف");
        res.json({ ok: true, out });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

module.exports = router;