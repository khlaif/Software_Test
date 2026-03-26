import { useEffect, useState } from "react";
import "./Navbar.css";
import BrainLogo from "../../assets/brain-circuit.svg";
import LoginModal from "../LoginModal/LoginModal";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 5);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
        if (e.key === "Escape") setOpenLogin(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        fetch("/api/health")
            .then((res) => res.json())
            .then((data) => console.log("API health:", data))
            .catch((err) => console.error("API error:", err));
    }, []);

    return (
        <>
        <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar__container">
            <div className="navbar__brand">
                <div className="navbar__logo">
                <img src={BrainLogo} alt="" />
                </div>
                <div className="navbar__brandText">
                <div className="navbar__title">MedFlow AI</div>
                <div className="navbar__subtitle">SMART DIAGNOSTICS</div>
                </div>
            </div>

            <nav className="navbar__links" aria-label="Primary">
                <a href="#about">عن النظام</a>
                <a href="#sections">الأقسام المتاحة</a>
                <a href="#faq">أسئلة شائعة</a>
            </nav>

            <div className="navbar__actions">
                <button
                className="navbar__btn"
                type="button"
                onClick={() => setOpenLogin(true)}
                >
                دخول النظام
                </button>
            </div>
            </div>
        </header>

        <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
        </>
    );
}
