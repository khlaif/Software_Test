require("dotenv").config();
const app = require("./src/app");
const { testDbConnection } = require("./src/config/db");

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    try {
        await testDbConnection();
    } catch (e) {
        console.error("DB connection failed:", e.message);
    }
});