const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function analyzeSymptoms(symptoms_text, token) {
    const res = await fetch(`${API_BASE}/api/ai/analyze-symptoms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ symptoms_text }),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data?.message || "Request failed");
    }
    return data;
}

export async function getPreTestInstructions(testNames, token) {
    const cleanedTests = Array.isArray(testNames)
        ? testNames.filter(Boolean)
        : [];

    const res = await fetch(`${API_BASE}/api/ai/pre-test-instructions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ tests: cleanedTests }),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch pre-test instructions");
    }
    return data;
}