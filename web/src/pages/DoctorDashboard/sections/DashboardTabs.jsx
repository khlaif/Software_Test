// import React from "react";

// const DashboardTabs = ({ activeTab, setActiveTab }) => {
//     const tabs = [
//         { id: "lab", label: "النتائج المخبرية" },
//         { id: "notes", label: "ملاحظات التشخيص" },
//         { id: "consultation", label: "الاستشارات عن بُعد" },
//         { id: "schedule", label: "الساعات المكتبية" },
//     ];

//     return (
//         <div className="dashboard-tabs">
//         {tabs.map((tab) => (
//             <button
//             key={tab.id}
//             className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
//             onClick={() => setActiveTab(tab.id)}
//             >
//             <span>{tab.label}</span>
//             </button>
//         ))}
//         </div>
//     );
// };

// export default DashboardTabs;