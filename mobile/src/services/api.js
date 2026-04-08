// const BASE_URL = "http://172.20.10.2:5000"; // Iphone hotspot


const BASE_URL = "http://192.168.34.34:5000"; // zuheir

// const BASE_URL = "http://192.168.0.117:5000";
export async function analyzeSymptoms(symptomsText) {
    const response = await fetch(`${BASE_URL}/api/ai/analyze-symptoms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            symptoms_text: symptomsText,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "فشل تحليل الأعراض");
    }

    return data;
}

export async function getPreTestInstructions(testNames = []) {
    const response = await fetch(`${BASE_URL}/api/ai/pre-test-instructions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tests: testNames,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "فشل جلب إرشادات ما قبل الفحص");
    }

    return data;
}