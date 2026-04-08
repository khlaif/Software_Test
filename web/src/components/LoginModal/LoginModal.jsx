import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./LoginModal.css";

import closeicon from "../../assets/x.svg";
import userIcon from "../../assets/user-round.svg";
import doctorIcon from "../../assets/stethoscope_black.svg";
import adminIcom from "../../assets/user-star.svg";
import shieldIcon from "../../assets/shield-check.svg";

export default function LoginModal({ open, onClose }) {
    const navigate = useNavigate();

    const [tab, setTab] = useState("login");
    const [birthDate, setBirthDate] = useState(null);

    const [role, setRole] = useState(null); 
    const [nationalId, setNationalId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const genderOptions = [
        { value: "m", label: "ذكر" },
        { value: "f", label: "أنثى" },
    ];
    const [gender, setGender] = useState(null);

    useEffect(() => {
        if (!open) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
        document.body.style.overflow = prev;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        setErrorMsg("");
        setLoading(false);
    }, [open, tab]);

    if (!open) return null;

    const stopPropagation = (e) => e.stopPropagation();

    const roleToRoute = (r) => {
        switch (r) {
        case "PATIENT":
            return "/symptoms";
        case "DOCTOR":
            return "/doctor-dashboard";
        case "ADMIN":
            return "/admin-dashboard";
        default:
            return "/";
        }
    };

    const handleLogin = async () => {
        setErrorMsg("");

        if (!role) return setErrorMsg("الرجاء اختيار نوع الحساب (طبيب/مريض/إدارة).");
        if (!nationalId.trim()) return setErrorMsg("الرجاء إدخال رقم الهوية.");
        if (!password) return setErrorMsg("الرجاء إدخال كلمة السر.");

        try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
            role,
            nationalId: nationalId.trim(),
            password,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            setErrorMsg(data?.message || "فشل تسجيل الدخول.");
            return;
        }

        if (data?.token) localStorage.setItem("token", data.token);
        if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

        onClose?.();
        navigate(roleToRoute(data.user.role));
        } catch (err) {
        setErrorMsg("مشكلة اتصال بالسيرفر. تأكد أن الـ backend شغال.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="modal" onClick={onClose} role="dialog" aria-modal="true">
        <div className="modal__card" onClick={stopPropagation}>
            <button className="modal__close" onClick={onClose} aria-label="إغلاق">
            <img src={closeicon} alt="Close" />
            </button>

            <div className="modal__header">
            <h2 className="modal__title">أهلاً بك مجدداً</h2>
            <p className="modal__subtitle">سجل دخولك لمتابعة حالتك الصحية.</p>
            </div>

            <div className="modal__body">
            <div className="modal__tabs">
                <button
                type="button"
                className={`modal__tab ${tab === "login" ? "modal__tab--active" : ""}`}
                onClick={() => setTab("login")}
                >
                دخول
                </button>

                <button
                type="button"
                className={`modal__tab ${tab === "new" ? "modal__tab--active" : ""}`}
                onClick={() => setTab("new")}
                >
                جديد
                </button>
            </div>

            {tab === "login" ? (
                <>
                <div className="modal__roles">
                    <button
                    className={`modal__role ${role === "doctor" ? "is-active" : ""}`}
                    type="button"
                    onClick={() => setRole("doctor")}
                    >
                    <span className="modal__roleIcon">
                        <img src={doctorIcon} alt="Doctor" />
                    </span>
                    <span className="modal__roleText">طبيب</span>
                    </button>

                    <button
                    className={`modal__role ${role === "patient" ? "is-active" : ""}`}
                    type="button"
                    onClick={() => setRole("patient")}
                    >
                    <span className="modal__roleIcon">
                        <img src={userIcon} alt="Patient" />
                    </span>
                    <span className="modal__roleText">مريض</span>
                    </button>

                    <button
                    className={`modal__role ${role === "admin" ? "is-active" : ""}`}
                    type="button"
                    onClick={() => setRole("admin")}
                    >
                    <span className="modal__roleIcon">
                        <img src={adminIcom} alt="Admin" />
                    </span>
                    <span className="modal__roleText">الادارة</span>
                    </button>
                </div>

                <label className="modal__label">رقم الهوية</label>
                <input
                    className="modal__input"
                    placeholder="أدخل رقم هويتك الوطني"
                    inputMode="numeric"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                />

                <label className="modal__label">كلمة السر</label>
                <input
                    className="modal__input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {errorMsg && <div className="modal__error">{errorMsg}</div>}

                <button
                    className="modal__submit"
                    type="button"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "جارٍ التحقق..." : "دخول آمن"}
                </button>
                </>
            ) : (
                <>
                <label className="modal__label">رقم الهوية</label>
                <input className="modal__input" placeholder="أرقام 9" inputMode="numeric" />

                <label className="modal__label">الاسم الرباعي</label>
                <input className="modal__input" placeholder="كما هو في الهوية" />

                <div className="modal__row">
                    <div>
                    <label className="modal__label">تاريخ الميلاد</label>
                    <DatePicker
                        selected={birthDate}
                        onChange={(date) => setBirthDate(date)}
                        placeholderText="mm/dd/yyyy"
                        dateFormat="MM/dd/yyyy"
                        className="modal__input"
                        popperPlacement="bottom-start"
                    />
                    </div>

                    <div>
                    <label className="modal__label">الجنس</label>
                    <Select
                        value={gender}
                        onChange={setGender}
                        options={genderOptions}
                        placeholder="اختر"
                        isSearchable={false}
                        classNamePrefix="ms"
                    />
                    </div>
                </div>

                <label className="modal__label">مكان السكن</label>
                <input className="modal__input" placeholder="المدينة، الحي" />

                <div className="modal__note">
                    <span className="modal__noteIcon">
                    <img src={shieldIcon} alt="Shiedl Icon" />
                    </span>
                    <span>كلمة سرك هي رقم هويتك، سيطلب منك النظام تغييرها فور دخولك.</span>
                </div>

                <button className="modal__submit" type="button">
                    إنشاء الحساب
                </button>
                </>
            )}
            </div>
        </div>
        </div>
    );
}