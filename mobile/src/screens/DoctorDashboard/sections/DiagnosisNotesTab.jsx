import React, { useMemo, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Pressable,
    TextInput,
    ScrollView,
} from "react-native";
import styles from "../DoctorDashboardStyle";

const fallbackData = {
    initialDiagnosis: {
        title: "",
        symptoms: "",
        severity: "high",
    },
    treatmentPlan: [
        {
            id: 1,
            stepNumber: 1,
            title: "خطة العلاج الموصى به",
            note: "",
        },
    ],
};

const DiagnosisNotesTab = ({ diagnosisData }) => {
    const sourceData = diagnosisData || fallbackData;

    const [data, setData] = useState(sourceData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [hasDoctorUpdate, setHasDoctorUpdate] = useState(
        Boolean(
            sourceData?.initialDiagnosis?.title ||
            sourceData?.initialDiagnosis?.symptoms ||
            sourceData?.treatmentPlan?.[0]?.note
        )
    );

    const [formData, setFormData] = useState({
        finalDiagnosis: sourceData?.initialDiagnosis?.title || "",
        doctorNotes: sourceData?.initialDiagnosis?.symptoms || "",
        medications: sourceData?.treatmentPlan?.[0]?.note || "",
        severity: sourceData?.initialDiagnosis?.severity || "high",
    });

    useEffect(() => {
        const nextData = diagnosisData || fallbackData;
        setData(nextData);
        setHasDoctorUpdate(
            Boolean(
                nextData?.initialDiagnosis?.title ||
                nextData?.initialDiagnosis?.symptoms ||
                nextData?.treatmentPlan?.[0]?.note
            )
        );
        setFormData({
            finalDiagnosis: nextData?.initialDiagnosis?.title || "",
            doctorNotes: nextData?.initialDiagnosis?.symptoms || "",
            medications: nextData?.treatmentPlan?.[0]?.note || "",
            severity: nextData?.initialDiagnosis?.severity || "high",
        });
    }, [diagnosisData]);

    const severityConfig = useMemo(() => {
        switch (formData.severity) {
            case "medium":
                return {
                    label: "متوسطة",
                    style: styles.diagnosisSeverityMedium,
                };
            case "low":
                return {
                    label: "منخفضة",
                    style: styles.diagnosisSeverityLow,
                };
            case "high":
            default:
                return {
                    label: "مرتفعة",
                    style: styles.diagnosisSeverityHigh,
                };
        }
    }, [formData.severity]);

    const getDiagnosisCardStyle = (severity) => {
        switch (severity) {
            case "medium":
                return styles.diagnosisAlertMedium;
            case "low":
                return styles.diagnosisAlertLow;
            case "high":
            default:
                return styles.diagnosisAlertHigh;
        }
    };

    const getSeverityArabic = (severity) => {
        switch (severity) {
            case "medium":
                return "متوسطة";
            case "low":
                return "منخفضة";
            case "high":
            default:
                return "مرتفعة";
        }
    };

    const openModal = () => {
        setFormData({
            finalDiagnosis: data.initialDiagnosis?.title || "",
            doctorNotes: data.initialDiagnosis?.symptoms || "",
            medications: data.treatmentPlan?.[0]?.note || "",
            severity: data.initialDiagnosis?.severity || "high",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        const updatedData = {
            initialDiagnosis: {
                title: formData.finalDiagnosis.trim(),
                symptoms: formData.doctorNotes.trim(),
                severity: formData.severity,
            },
            treatmentPlan: [
                {
                    id: 1,
                    stepNumber: 1,
                    title: "خطة العلاج الموصى به",
                    note: formData.medications.trim(),
                },
            ],
        };

        setData(updatedData);

        const hasContent =
            updatedData.initialDiagnosis.title ||
            updatedData.initialDiagnosis.symptoms ||
            updatedData.treatmentPlan[0].note;

        setHasDoctorUpdate(Boolean(hasContent));
        setIsModalOpen(false);
    };

    return (
        <View style={styles.tabContentCard}>
            <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>ملاحظات التشخيص</Text>

                <TouchableOpacity
                    style={styles.diagnosisUpdateBtn}
                    activeOpacity={0.88}
                    onPress={openModal}
                >
                    <Text style={styles.diagnosisUpdateBtnText}>
                        تحديث البيانات الطبية
                    </Text>
                </TouchableOpacity>
            </View>

            {hasDoctorUpdate ? (
                <View style={styles.diagnosisWrapper}>
                    <View style={styles.diagnosisBlock}>
                        <Text style={styles.diagnosisSubtitle}>التشخيص النهائي</Text>

                        <View
                            style={[
                                styles.diagnosisAlertBox,
                                getDiagnosisCardStyle(data.initialDiagnosis?.severity),
                            ]}
                        >
                            <View style={styles.diagnosisSeverityRow}>
                                <View
                                    style={[
                                        styles.diagnosisSeverityBadge,
                                        data.initialDiagnosis?.severity === "high"
                                            ? styles.diagnosisSeverityHigh
                                            : data.initialDiagnosis?.severity === "medium"
                                                ? styles.diagnosisSeverityMedium
                                                : styles.diagnosisSeverityLow,
                                    ]}
                                >
                                    <Text style={styles.diagnosisSeverityBadgeText}>
                                        {getSeverityArabic(data.initialDiagnosis?.severity)}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.diagnosisTitleText}>
                                {data.initialDiagnosis?.title || "لم يتم إدخال تشخيص بعد"}
                            </Text>

                            <Text style={styles.diagnosisDescriptionText}>
                                {data.initialDiagnosis?.symptoms || "لا توجد ملاحظات سريرية"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.diagnosisBlock}>
                        <Text style={styles.diagnosisSubtitle}>خطة العلاج الموصى بها</Text>

                        <View style={styles.diagnosisTreatmentList}>
                            {data.treatmentPlan?.map((item) => (
                                <View key={item.id} style={styles.diagnosisTreatmentCard}>
                                    <View style={styles.diagnosisStepNumber}>
                                        <Text style={styles.diagnosisStepNumberText}>
                                            {item.stepNumber}
                                        </Text>
                                    </View>

                                    <View style={styles.diagnosisTreatmentInfo}>
                                        <Text style={styles.diagnosisTreatmentTitle}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.diagnosisTreatmentNote}>
                                            {item.note || "لا توجد خطة علاج مكتوبة"}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.diagnosisEmptyState}>
                    <Text style={styles.diagnosisEmptyTitle}>
                        لا توجد ملاحظات طبية محدثة
                    </Text>
                    <Text style={styles.diagnosisEmptyText}>
                        قم بإضافة التشخيص النهائي وملاحظات الطبيب وخطة العلاج من خلال زر
                        التحديث.
                    </Text>
                </View>
            )}

            <Modal
                visible={isModalOpen}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <Pressable style={styles.modalOverlay} onPress={closeModal}>
                    <Pressable
                        style={styles.diagnosisModalCard}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>تحديث الملاحظات الطبية</Text>

                            <TouchableOpacity onPress={closeModal}>
                                <Text style={styles.modalCloseText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.diagnosisModalScrollContent}
                        >
                            <View style={styles.diagnosisFormGroup}>
                                <Text style={styles.diagnosisInputLabel}>التشخيص النهائي</Text>
                                <TextInput
                                    value={formData.finalDiagnosis}
                                    onChangeText={(text) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            finalDiagnosis: text,
                                        }))
                                    }
                                    placeholder="أدخل التشخيص النهائي"
                                    placeholderTextColor="#94a3b8"
                                    style={styles.diagnosisTextInput}
                                    textAlign="right"
                                />
                            </View>

                            <View style={styles.diagnosisFormGroup}>
                                <Text style={styles.diagnosisInputLabel}>
                                    ملاحظات الطبيب السريرية
                                </Text>
                                <TextInput
                                    value={formData.doctorNotes}
                                    onChangeText={(text) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            doctorNotes: text,
                                        }))
                                    }
                                    placeholder="أدخل الملاحظات السريرية"
                                    placeholderTextColor="#94a3b8"
                                    style={[styles.diagnosisTextInput, styles.diagnosisTextArea]}
                                    textAlign="right"
                                    multiline
                                />
                            </View>

                            <View style={styles.diagnosisFormGroup}>
                                <Text style={styles.diagnosisInputLabel}>
                                    الأدوية الموصوفة / خطة العلاج
                                </Text>
                                <TextInput
                                    value={formData.medications}
                                    onChangeText={(text) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            medications: text,
                                        }))
                                    }
                                    placeholder="أدخل الأدوية أو خطة العلاج"
                                    placeholderTextColor="#94a3b8"
                                    style={[styles.diagnosisTextInput, styles.diagnosisTextAreaSmall]}
                                    textAlign="right"
                                    multiline
                                />
                            </View>

                            <View style={styles.diagnosisFormGroup}>
                                <Text style={styles.diagnosisInputLabel}>درجة الخطورة</Text>

                                <View style={styles.diagnosisSeverityOptions}>
                                    {["high", "medium", "low"].map((severity) => {
                                        const isActive = formData.severity === severity;

                                        return (
                                            <TouchableOpacity
                                                key={severity}
                                                activeOpacity={0.88}
                                                onPress={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        severity,
                                                    }))
                                                }
                                                style={[
                                                    styles.diagnosisSeverityOption,
                                                    isActive && styles.diagnosisSeverityOptionActive,
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.diagnosisSeverityOptionText,
                                                        isActive &&
                                                            styles.diagnosisSeverityOptionTextActive,
                                                    ]}
                                                >
                                                    {severity === "high"
                                                        ? "مرتفعة"
                                                        : severity === "medium"
                                                            ? "متوسطة"
                                                            : "منخفضة"}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>

                                <View
                                    style={[
                                        styles.diagnosisSeverityPreview,
                                        severityConfig.style,
                                    ]}
                                >
                                    <Text style={styles.diagnosisSeverityPreviewText}>
                                        الدرجة الحالية: {severityConfig.label}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.diagnosisSaveBtn}
                                activeOpacity={0.88}
                                onPress={handleSave}
                            >
                                <Text style={styles.diagnosisSaveBtnText}>حفظ التحديث</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

export default DiagnosisNotesTab;