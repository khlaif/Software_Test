import React, { useEffect, useState } from "react";
import "./DoctorDashboard.css";

import usericon from "../../assets/user.svg";
import doctoricon from "../../assets/stethoscope_w.svg";
import fileicon from "../../assets/file-search-corner.svg";
import checkicon from "../../assets/circle-check_w.svg";
import brainicon from "../../assets/brain-circuit.svg";
import clockicon from "../../assets/clock_w.svg";
import alerticon from "../../assets/shield-alert.svg";
import historyicon from "../../assets/history.svg";
import alertredicon from "../../assets/triangle-alert_r.svg"

import ConsultationTab from "./sections/ConsultationTab";
import ConsultationSession from "./sections/ConsultationSession";
import OfficeHoursTab from "./sections/OfficeHoursTab";
import DiagnosisNotesTab from "./sections/DiagnosisNotesTab";
import LabResultsTab from "./sections/LabResultsTab";

const DoctorDashboard = () => {
	const [activeTab, setActiveTab] = useState("lab");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedConsultation, setSelectedConsultation] = useState(null);
	const [showMedicalHistory, setShowMedicalHistory] = useState(false);
	const [showEndVisitModal, setShowEndVisitModal] = useState(false);

	const initialPatients = 
    [
        {
            id: 1,
            name: "سارة محمد",
            age: 45,
            gender: "أنثى",
            recordNumber: "1294/4#",
            status: "حالة حرجة",
            statusType: "danger",
            condition: "ضيق تنفس حاد",
            badge: "حالة طارئة",
            badgeType: "danger",
            waitTime: "5m",
            isCompleted: false,

            vitals: [
                { id: 1, label: "ضغط الدم", value: "140/90", type: "danger" },
                { id: 2, label: "النبض", value: "bpm 110", type: "danger" },
                { id: 3, label: "الأكسجين", value: "92%", type: "warning" },
                { id: 4, label: "الحرارة", value: "37.2°C", type: "success" },
            ],

            aiRecommendations: {
                risk: {
                    title: "قصور تنفسي",
                    percentage: 85,
                },
                urgentTests: ["غازات الدم الشرياني", "تصوير مقطعي (CT)"],
            },

            labResults: [
                {
                    id: 1,
                    testName: "تخطيط القلب (ECG)",
                    resultValue: "ST-Elevation",
                    status: "مكتمل",
                    statusType: "completed",
                    resultType: "critical",
                    reportLabel: "عرض التقرير",
                },
                {
                    id: 2,
                    testName: "إنزيمات القلب",
                    resultValue: "--",
                    status: "قيد الانتظار",
                    statusType: "pending",
                    resultType: "pending",
                    reportLabel: "عرض التقرير",
                },
            ],

            medicalHistory: {
                lastVisit: "12 يناير 2026",
                surgeriesCount: "2 عمليات سابقة",
                timeline: [
                    {
                        id: 1,
                        title: "عملية قسطرة قلبية",
                        date: "2025-11-20",
                        hospital: "مستشفى النجاح",
                    },
                    {
                        id: 2,
                        title: "فحص دوري شامل",
                        date: "2025-05-15",
                        hospital: "مستشفى المقاصد",
                    },
                ],
            },
        },
        {
            id: 2,
            name: "ياسين علي",
            age: 37,
            gender: "ذكر",
            recordNumber: "2231/7#",
            status: "قيد المراجعة",
            statusType: "review",
            condition: "ألم في البطن",
            badge: "بانتظار الفحوصات",
            badgeType: "muted",
            waitTime: "20m",
            isCompleted: false,

            vitals: [
                { id: 1, label: "ضغط الدم", value: "125/82", type: "normal" },
                { id: 2, label: "النبض", value: "bpm 84", type: "normal" },
                { id: 3, label: "الأكسجين", value: "98%", type: "success" },
                { id: 4, label: "الحرارة", value: "36.9°C", type: "success" },
            ],

            aiRecommendations: {
                risk: {
                    title: "اشتباه التهاب زائدة",
                    percentage: 62,
                },
                urgentTests: ["تحليل CBC", "تصوير Ultrasound"],
            },

            labResults: [
                {
                    id: 1,
                    testName: "CBC",
                    resultValue: "WBC مرتفع",
                    status: "مكتمل",
                    statusType: "completed",
                    resultType: "warning",
                    reportLabel: "عرض التقرير",
                },
                {
                    id: 2,
                    testName: "CRP",
                    resultValue: "--",
                    status: "قيد الانتظار",
                    statusType: "pending",
                    resultType: "pending",
                    reportLabel: "عرض التقرير",
                },
            ],

            medicalHistory: {
                lastVisit: "03 فبراير 2026",
                surgeriesCount: "لا يوجد",
                timeline: [
                    {
                        id: 1,
                        title: "مراجعة ألم بطني سابق",
                        date: "2026-02-03",
                        hospital: "مستشفى النجاح",
                    },
                ],
            },
        },
        {
            id: 3,
            name: "ليلى حسن",
            age: 29,
            gender: "أنثى",
            recordNumber: "7782/3#",
            status: "جاهزة للمراجعة",
            statusType: "ready",
            condition: "متابعة دورية",
            badge: "جاهزة للمراجعة",
            badgeType: "light",
            waitTime: "1h",
            isCompleted: false,

            vitals: [
                { id: 1, label: "ضغط الدم", value: "118/76", type: "success" },
                { id: 2, label: "النبض", value: "bpm 72", type: "success" },
                { id: 3, label: "الأكسجين", value: "99%", type: "success" },
                { id: 4, label: "الحرارة", value: "36.7°C", type: "success" },
            ],

            aiRecommendations: {
                risk: {
                    title: "استقرار عام",
                    percentage: 18,
                },
                urgentTests: ["لا توجد فحوصات عاجلة"],
            },

            labResults: [
                {
                    id: 1,
                    testName: "سكر صائم",
                    resultValue: "طبيعي",
                    status: "مكتمل",
                    statusType: "completed",
                    resultType: "normal",
                    reportLabel: "عرض التقرير",
                },
            ],

            medicalHistory: {
                lastVisit: "20 ديسمبر 2025",
                surgeriesCount: "1 عملية سابقة",
                timeline: [
                    {
                        id: 1,
                        title: "متابعة دورية",
                        date: "2025-12-20",
                        hospital: "المستشفى العربي التخصصي",
                    },
                ],
            },
        },
    ];

	const [waitingPatients, setWaitingPatients] = useState(initialPatients);
	const [currentPatient, setCurrentPatient] = useState(initialPatients[0] || null);
    const patientVitals = currentPatient?.vitals || [];
    const patientAiRisk = currentPatient?.aiRecommendations?.risk || null;
    const patientUrgentTests = currentPatient?.aiRecommendations?.urgentTests || [];
    const patientLabResults = currentPatient?.labResults || [];
    const patientMedicalHistory = currentPatient?.medicalHistory || null;


	useEffect(() => {
		const originalOverflow = document.body.style.overflow;

		if (showMedicalHistory || showEndVisitModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = originalOverflow;
		}

		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, [showMedicalHistory, showEndVisitModal]);


	const tabs = [
		{ id: "lab", label: "النتائج المخبرية" },
		{ id: "notes", label: "ملاحظات التشخيص" },
		{ id: "consultation", label: "الاستشارات عن بُعد" },
		{ id: "schedule", label: "الساعات المكتبية" },
	];

	const consultations = [
		{
			id: 1,
			patientName: "أحمد علي",
			time: "02:00 م",
			dayLabel: "اليوم",
			topic: "متابعة ضغط الدم",
			duration: "30 دقيقة",
			status: "نشط الآن",
			statusType: "active",
			canCall: true,
			canMessage: true,
		},
		{
			id: 2,
			patientName: "فاطمة محمود",
			time: "03:30 م",
			dayLabel: "اليوم",
			topic: "استشارة أولية",
			duration: "45 دقيقة",
			status: "مجدول",
			statusType: "scheduled",
			canCall: false,
			canMessage: true,
		},
		{
			id: 3,
			patientName: "محمد سالم",
			time: "10:00 ص",
			dayLabel: "غدًا",
			topic: "نتائج الفحوصات",
			duration: "20 دقيقة",
			status: "مجدول",
			statusType: "scheduled",
			canCall: false,
			canMessage: true,
		},
	];

	const filteredPatients = waitingPatients.filter(
		(item) =>
			item.name.includes(searchTerm) || item.condition.includes(searchTerm)
	);

	const handleStartConsultation = (consultation) => {
		setSelectedConsultation(consultation);
	};

	const handleCloseConsultation = () => {
		setSelectedConsultation(null);
	};

	const handleSelectPatient = (patientItem) => {
		setCurrentPatient(patientItem);
	};

	const handleConfirmEndVisit = () => {
		if (!currentPatient || currentPatient.isCompleted) return;

		const updatedPatients = waitingPatients.map((item) =>
			item.id === currentPatient.id
				? {
						...item,
						status: "تمت المعاينة",
                        statusType: "completed",
                        badge: "تمت المعاينة",
                        badgeType: "completed",
                        isCompleted: true,
				}
				: item
		);

		const sortedPatients = [
			...updatedPatients.filter((item) => !item.isCompleted),
			...updatedPatients.filter((item) => item.isCompleted),
		];

		const nextActivePatient =
			sortedPatients.find((item) => !item.isCompleted) || currentPatient;

		setWaitingPatients(sortedPatients);
		setCurrentPatient(nextActivePatient);
		setShowEndVisitModal(false);
	};

	const renderActiveTab = () => {
		if (activeTab === "consultation") {
			return (
				<ConsultationTab
					consultations={consultations}
					onStartConsultation={handleStartConsultation}
				/>
			);
		}

		if (activeTab === "schedule") {
			return <OfficeHoursTab />;
		}

		if (activeTab === "notes") {
			return <DiagnosisNotesTab />;
		}

		if (activeTab === "lab") {
            return <LabResultsTab labResultsData={patientLabResults} />;
        }

		return (
			<div className="tab-placeholder">
				<h3>محتوى {tabs.find((tab) => tab.id === activeTab)?.label}</h3>
				<p>سيتم تجهيز هذا القسم لاحقًا وربطه بالمحتوى الفعلي.</p>
			</div>
		);
	};

	if (selectedConsultation) {
		return (
			<ConsultationSession
				consultation={selectedConsultation}
				onClose={handleCloseConsultation}
			/>
		);
	}

	return (
		<div className="doctor-dashboard" dir="rtl">
			<aside className="doctor-sidebar">
				<div className="brand-box">
					<div className="icon-header">
						<img src={doctoricon} alt="" />
					</div>

					<div className="brand-text">
						<h2>مركز الطبيب</h2>
						<span>CLINICAL COMMAND</span>
					</div>
				</div>

				<div className="search-box">
					<input
						type="text"
						placeholder="بحث عن مريض بالاسم أو الهوية..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="sidebar-section">
					<p className="sidebar-title">المرضى الحاليين</p>

					<div className="patient-list">
						{filteredPatients.map((item) => (
							<div
								className={`patient-list-item ${
									currentPatient?.id === item.id ? "active" : ""
								} ${item.isCompleted ? "completed" : ""}`}
								key={item.id}
								onClick={() => handleSelectPatient(item)}
							>
								<div className="patient-content">
									<h4>{item.name}</h4>

									<div className="patient-meta">
										<span className="condition-text">{item.condition}</span>
										<span className={`status-badge ${item.badgeType}`}>
											{item.badge}
										</span>
									</div>
								</div>

								<div className="patient-time">{item.waitTime}</div>
							</div>
						))}

						{filteredPatients.length === 0 && (
							<div className="empty-state">لا يوجد نتائج مطابقة</div>
						)}
					</div>
				</div>
			</aside>

			<main className="doctor-main">
				<div className="top-actions">
					<section className="patient-header">
						<div className="patient-avatar">
							<img src={usericon} alt="" />
						</div>

						<div className="patient-header-info">
							<h1>
								{currentPatient?.name || "لا يوجد مريض حالي"}
								{currentPatient?.status && (
                                    <span className={`status-chip ${currentPatient?.statusType || "default"}`}>
                                        {currentPatient?.status}
                                    </span>
								)}
							</h1>

							{currentPatient ? (
								<p>
									{currentPatient.gender}، {currentPatient.age} عامًا | رقم السجل:{" "}
									<strong>{currentPatient.recordNumber}</strong>
								</p>
							) : (
								<p>لا يوجد مريض حالي في لوحة المعاينة</p>
							)}
						</div>
					</section>

					<div className="top-actions-buttons">
						<button
							className="btn btn-outline"
							onClick={() => setShowMedicalHistory(true)}
							disabled={!currentPatient}
						>
							<img src={fileicon} alt="" />
							التاريخ الطبي الكامل
						</button>

						<button
							className="btn btn-danger"
							onClick={() => setShowEndVisitModal(true)}
							disabled={!currentPatient || currentPatient.isCompleted}
						>
							<img src={checkicon} alt="" />
							إنهاء المعاينة
						</button>
					</div>
				</div>

				{currentPatient ? (
					<>
						<section className="dashboard-grid">
							<div className="ai-card">
								<img src={brainicon} alt="" className="brain-bg-icon" />

								<div className="ai-card-header">
									<img src={brainicon} alt="" />
									<h2>توصيات MEDFLOW AI</h2>
								</div>

								<div className="ai-card-content">
									<div className="ai-sub-card">
										<div className="sub-card-header">
											<img src={alerticon} alt="" />
											<h3>تحليل المخاطر</h3>
										</div>

										<div className="risk-row">
                                            <span className="risk-title">{patientAiRisk?.title || "لا توجد بيانات"}</span>
                                            <span className="risk-percentage">{patientAiRisk?.percentage || 0}%</span>
										</div>

										<div className="progress-bar">
											<div
												className="progress-fill"
												style={{ width: `${patientAiRisk?.percentage || 0}%` }}
											/>
										</div>
									</div>

									<div className="ai-sub-card urgent-tests-card">
										<div className="sub-card-header">
											<img src={clockicon} alt="" />
											<h3>الفحوصات العاجلة</h3>
										</div>

										<ul>
											{patientUrgentTests.map((test, index) => (
                                                <li key={index}>{test}</li>
                                            ))}
										</ul>
									</div>
								</div>
							</div>

							<div className="vitals-card">
								<h2>المؤشرات الحيوية</h2>
                                <div className="vitals-legend">
                                    <div className="legend-item">
                                        <span className="legend-dot danger"></span>
                                        <span>خطر مرتفع</span>
                                    </div>

                                    <div className="legend-item">
                                        <span className="legend-dot warning"></span>
                                        <span>يحتاج متابعة</span>
                                    </div>

                                    <div className="legend-item">
                                        <span className="legend-dot success"></span>
                                        <span>مستقر</span>
                                    </div>

                                    <div className="legend-item">
                                        <span className="legend-dot normal"></span>
                                        <span>طبيعي</span>
                                    </div>
                                </div>

								<div className="vitals-list">
									{patientVitals.map((item) => (
										<div className="vital-item" key={item.id}>
											<div className="vital-label">{item.label}</div>
											<div className={`vital-value ${item.type}`}>{item.value}</div>
										</div>
									))}
								</div>
							</div>
						</section>

						<section className="dashboard-tabs-section">
							<div className="dashboard-tabs">
								{tabs.map((tab) => (
									<button
										key={tab.id}
										className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
										onClick={() => setActiveTab(tab.id)}
									>
										<span>{tab.label}</span>
									</button>
								))}
							</div>

							{renderActiveTab()}
						</section>
					</>
				) : (
					<div className="empty-state large">لا يوجد مرضى حاليون في الانتظار</div>
				)}
			</main>

			{showMedicalHistory && currentPatient && (
				<div
					className="medical-history-overlay"
					onClick={() => setShowMedicalHistory(false)}
				>
					<div
						className="medical-history-modal"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="medical-history-close"
							onClick={() => setShowMedicalHistory(false)}
						>
							×
						</button>

						<div className="medical-history-header">
							<h2>
								<img src={historyicon} alt="" />
								السجل الطبي الشامل: {currentPatient.name}
							</h2>
						</div>

						<div className="medical-history-stats">
							<div className="history-stat-card">
								<span className="history-stat-label">آخر زيارة</span>
								<strong>{patientMedicalHistory?.lastVisit || "-"}</strong>
							</div>

							<div className="history-stat-card">
								<span className="history-stat-label">عدد العمليات</span>
								<strong>{patientMedicalHistory?.surgeriesCount || "-"}</strong>
							</div>
						</div>

						<div className="medical-history-body">
							<h3>التسلسل الزمني</h3>

							<div>
								{patientMedicalHistory?.timeline?.map((item) => (
									<div className="timeline-item" key={item.id}>
										<div className="timeline-dot"></div>

										<div className="timeline-content">
											<h4>{item.title}</h4>
											<p>
												<span>{item.date}</span>
												<span className="timeline-separator">•</span>
												<span>{item.hospital}</span>
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			{showEndVisitModal && (
				<div
					className="medical-history-overlay"
					onClick={() => setShowEndVisitModal(false)}
				>
					<div
						className="end-visit-modal"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="medical-history-close"
							onClick={() => setShowEndVisitModal(false)}
						>
							×
						</button>

						<div className="end-visit-icon-wrap">
							<div className="end-visit-icon">
                                <img src={alertredicon} alt="" />
                            </div>
						</div>

						<h2>تأكيد إنهاء العملية</h2>

						<p>
							هل أنت متأكد من رغبتك في إغلاق هذه الحالة التشخيصية وأرشفة
							البيانات؟ يمكنك التراجع عن هذا الإجراء لاحقًا.
						</p>

						<div className="end-visit-actions">
							<button
								className="btn btn-danger"
								onClick={handleConfirmEndVisit}
							>
								تأكيد الإغلاق
							</button>

							<button
								className="btn btn-outline"
								onClick={() => setShowEndVisitModal(false)}
							>
								إلغاء
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DoctorDashboard;