import { useEffect, useState } from "react";
import "./PatientDashboard.css";
import DashboardHeader from "./sections/DashboardHeader";
import ProcessCards from "./sections/ProcessCards";
import LoadPanel from "./sections/LoadPanel";
import AiRecommendations from "./sections/AiRecommendations";
import layoutIcon from "../../assets/layout-grid.svg";

export default function PatientDashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) setUser(JSON.parse(saved));
    }, []);

    return (
        <div className="dash">
        <div className="dash__container">
            <DashboardHeader userName={user?.fullName || "..." } />

            <div className="dash__titleRow">
            <div className="dash__titleIcon" aria-hidden="true">
                <img src={layoutIcon} alt="Layout Icon" />
            </div>
            <h2 className="dash__title">خارطة الطريق العلاجية والمتابعة</h2>
            </div>

            <ProcessCards />

            <div className="dash__grid2">
            <AiRecommendations />
            <LoadPanel />
            </div>
        </div>
        </div>
    );
}