import HomeScreen from "../src/screens/HomeScreen";
import SymptomsScreen from "../src/screens/patient/Symptoms/SymptomsScreen";
import PatientDashboard from "../src/screens/patient/PatientDashboard"
import HealthRecordScreen from "../src/screens/patient/health-record/HealthRecordScreen";
import DoctorDashboard from "../src/screens/DoctorDashboard/DoctorDashboard";


export default function Index() {
    return <DoctorDashboard  />;
    // return <SymptomsScreen />;
    // return <HomeScreen />;
    // return <PatientDashboard />;
}