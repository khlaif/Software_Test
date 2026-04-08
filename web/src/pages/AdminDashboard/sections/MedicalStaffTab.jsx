import "./MedicalStaffTab.css";

import doctoricon from "../../../assets/stethoscope.svg";
import usericon from "../../../assets/users-round.svg";
import clockicon from "../../../assets/clock_w.svg";
import activityicon from "../../../assets/activity.svg";
import AddResourceButton from "../components/AddResourceButton";

const getDoctorStatusClass = (statusType) => {
    if (statusType === "success") return "staff-mini-badge success";
    if (statusType === "warning") return "staff-mini-badge warning";
    if (statusType === "danger") return "staff-mini-badge danger";
    if (statusType === "info") return "staff-mini-badge info";
    return "staff-mini-badge neutral";
};

const MedicalStaffTab = ({ doctors = [], onOpenAddResource }) => {
    const sortedDoctors = [...doctors].sort((a, b) => b.patientsToday - a.patientsToday);

    return (
        <section className="medical-staff-tab" dir="rtl">
            <header className="medical-staff-page-header">
                <div className="medical-staff-page-title-wrap">
                    <h1>إدارة الكادر الطبي</h1>
                    <p>حالة الأطباء، المناوبات، وعبء العمل الحالي.</p>
                </div>

                <AddResourceButton onClick={onOpenAddResource} />
            </header>

            <section className="medical-staff-stats-grid">
                <article className="medical-staff-stat-card">
                    <div className="medical-staff-stat-icon blue">
                        <img src={doctoricon} alt="Doctor" />
                    </div>
                    <div className="medical-staff-stat-text">
                        <h3>أطباء على رأس العمل</h3>
                        <strong>42</strong>
                    </div>
                </article>

                <article className="medical-staff-stat-card">
                    <div className="medical-staff-stat-icon green">
                        <img src={usericon} alt="User" />
                    </div>
                    <div className="medical-staff-stat-text">
                        <h3>تمريض ومساعدين</h3>
                        <strong>128</strong>
                    </div>
                </article>

                <article className="medical-staff-stat-card">
                    <div className="medical-staff-stat-icon amber">
                        <img src={clockicon} alt="Clock" />
                    </div>
                    <div className="medical-staff-stat-text">
                        <h3>متوسط ساعات العمل</h3>
                        <strong>7.5 س</strong>
                    </div>
                </article>

                <article className="medical-staff-stat-card">
                    <div className="medical-staff-stat-icon purple">
                        <img src={activityicon} alt="Activity" />
                    </div>
                    <div className="medical-staff-stat-text">
                        <h3>معدل الإرهاق المقدر</h3>
                        <strong>24%</strong>
                    </div>
                </article>
            </section>

            <section className="medical-staff-table-card">
                <div className="medical-staff-table-header">
                    <div>الطبيب</div>
                    <div>التخصص / القسم</div>
                    <div>الحالة</div>
                    <div>عدد المرضى اليوم</div>
                    <div>أولوية التدخل</div>
                </div>

                <div className="medical-staff-table-body">
                    {sortedDoctors.map((doctor) => (
                        <div key={doctor.id} className="medical-staff-table-row">
                            <div className="doctor-main-cell">
                                <div className="doctor-avatar-circle">
                                    {doctor.avatar ? (
                                        <img src={doctor.avatar} alt={doctor.name} />
                                    ) : (
                                        <span>{doctor.avatarText || doctor.name?.charAt(0) || "ط"}</span>
                                    )}
                                </div>

                                <div className="doctor-name-wrap">
                                    <h4>{doctor.name}</h4>
                                </div>
                            </div>

                            <div className="doctor-specialty-cell">
                                <span>{doctor.specialty}</span>
                            </div>

                            <div className="doctor-status-cell">
                                <span className={getDoctorStatusClass(doctor.statusType)}>
                                    {doctor.status}
                                </span>
                            </div>

                            <div className="doctor-patients-cell">
                                <strong>{doctor.patientsToday}</strong>
                            </div>

                            <div className="doctor-priority-cell">
                                <span
                                    className={`intervention-badge ${
                                        doctor.priority === "تخفيف العبء مطلوب"
                                            ? "warning"
                                            : "neutral"
                                    }`}
                                >
                                    {doctor.priority}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default MedicalStaffTab;