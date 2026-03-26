const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

const allowedRoles = new Set(["PATIENT", "DOCTOR", "ADMIN"]);

exports.login = async (req, res) => {
    try {
        const { role, nationalId, password } = req.body;

        if (!role || !nationalId || !password) {
        return res.status(400).json({ message: "الرجاء إدخال الدور، رقم الهوية، وكلمة السر." });
        }

        const roleUpper = String(role).toUpperCase();
        if (!allowedRoles.has(roleUpper)) {
        return res.status(400).json({ message: "الدور المختار غير صحيح." });
        }

        const sql = `
        SELECT
            u.user_id,
            u.national_id,
            u.password_hash,
            u.first_login,
            u.is_active,
            p.full_name,
            EXISTS (
            SELECT 1
            FROM user_role ur
            WHERE ur.user_id = u.user_id
                AND ur.role = $2
            ) AS has_role
        FROM users u
        JOIN person p ON p.national_id = u.national_id
        WHERE u.national_id = $1
        LIMIT 1;
        `;

        const { rows } = await pool.query(sql, [nationalId, roleUpper]);

        if (!rows.length) {
        return res.status(401).json({ message: "رقم الهوية أو كلمة السر غير صحيحة." });
        }

        const user = rows[0];

        if (!user.is_active) {
        return res.status(403).json({ message: "هذا الحساب غير مفعل. راجع الإدارة." });
        }

        if (!user.has_role) {
        return res.status(403).json({ message: "هذا الحساب لا يملك صلاحية الدور المختار." });
        }

        const ok = String(password) === String(user.password_hash);
        if (!ok) {
        return res.status(401).json({ message: "رقم الهوية أو كلمة السر غير صحيحة." });
        }

        await pool.query(`UPDATE users SET last_login_at = NOW() WHERE user_id = $1`, [user.user_id]);

        const token = jwt.sign(
        { userId: user.user_id, role: roleUpper, nationalId: user.national_id },
        process.env.JWT_SECRET || "dev_secret",
        { expiresIn: "7d" }
        );

        return res.json({
        token,
        user: {
            userId: user.user_id,
            nationalId: user.national_id,
            fullName: user.full_name,
            role: roleUpper,
            firstLogin: user.first_login,
        },
        });
    } catch (err) {
        console.error("LOGIN_ERROR:", err);
        return res.status(500).json({ message: "خطأ في السيرفر." });
    }
};