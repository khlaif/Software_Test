import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PatientDashboard from "./pages/PatientDashboard/PatientDashboard";
import Symptoms from "./pages/PatientDashboard/Symptoms/Symptoms";
import Results from "./pages/PatientDashboard/Results/Results";
import FollowUp from "./pages/PatientDashboard/follow-up/follow-up";
import Telemedicine from "./pages/PatientDashboard/telemedicine/telemedicine";
import Schedul from "./pages/PatientDashboard/Schedul/Schedul";
import HealthRecord from "./pages/PatientDashboard/health-record/health-record";
import DoctorDashboard from "./pages/DoctorDashboard/DoctorDashboard";
import VideoCallDoctor from "./pages/DoctorDashboard/sections/ConsultationSession"
import LabReportView from "./pages/DoctorDashboard/sections/LabReportView"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/results" element={<Results />} />
        <Route path="/follow-up" element={<FollowUp />} />
        <Route path="/telemed" element={<Telemedicine />} />
        <Route path="/scheduling" element={<Schedul />} />
        <Route path="/health-record" element={<HealthRecord />} /> 
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/video-call-doctor" element={<VideoCallDoctor />} />
        <Route path="/lab-report/:id" element={<LabReportView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
