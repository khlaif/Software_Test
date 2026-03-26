const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
});

async function testDbConnection() {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT NOW() as now");
        console.log("✅ DB connected:", res.rows[0].now);
    } finally {
        client.release();
    }
}

module.exports = { pool, testDbConnection };