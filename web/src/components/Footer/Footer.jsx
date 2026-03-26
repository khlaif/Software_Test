import "./Footer.css";
import brainIcon from "../../assets/brain-circuit.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__brand" aria-label="Vital Path">
            <span className="footer__mark" aria-hidden="true"><img src={brainIcon} alt="Brain Icon" /></span>
          <span className="footer__name">MedFlow AI</span>
          
        </div>

        <p className="footer__copy">
          جميع الحقوق مفوظة - MEDFLOW AI 2026 ©
        </p>

      </div>
    </footer>
  );
}
