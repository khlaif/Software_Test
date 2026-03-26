import { useNavigate } from "react-router-dom"

import sparkleIcon from "../../../assets/sparkle.svg"
import videoIcon from "../../../assets/video.svg"
import userIcon from "../../../assets/user-round.svg"
import reportIcon from "../../../assets/file-text.svg"

export default function DashboardHeader({ userName }) {
    const navigate = useNavigate();

    return (
        <div className="hdr">

        <div className="hdr__right">
            <div className="hdr__small">
                <img src={sparkleIcon} alt="sparkle" />
                لوحة المريض الذكية</div>
            <div className="hdr__hello">مرحباً {userName} 👋</div>
            <div className="hdr__sub">نحن نتابع مسارك التشخيصي والعلاجي بكل دقة.</div>
        </div>

        <div className="hdr__left">
            <button className="hdr__btn" type="button" onClick={() => navigate("/telemed")}>
                <span className="hdr__btnIcon">
                    <img src={videoIcon} alt="Video" />
                </span>
                استشارة فورية
            </button>

            <button className="hdr__btn" type="button" onClick={() => navigate("/health-record")}>
                <span className="hdr__btnIcon">
                    <img src={reportIcon} alt="Report" />
                </span>
                السجل الطبي الشامل
            </button>

            <button className="hdr__iconBtn" title="الملف الشخصي" aria-label="الملف الشخصي">
                <img src={userIcon} alt="User Profile" />
            </button>
        </div>

        
        </div>
    );
}
