import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Follow-upStyle";

import Alerticon from "../../../../assets/images/circle-alert.svg";
import Fileicon from "../../../../assets/images/clipboard-list_blue.svg";
import Pillicon from "../../../../assets/images/pill.svg";
import Checkicon from "../../../../assets/images/check.svg";
import Progressicon from "../../../../assets/images/sparkles_white.svg";

export default function FollowUp() {
    const navigation = useNavigation();

    const [bp, setBp] = useState({
        sys: 120,
        dia: 80,
        status: "طبيعي",
    });

    const [done, setDone] = useState({
        bp: true,
        med: true,
        pulse: false,
        doctor: false,
    });

    const progress = useMemo(() => {
        const total = Object.keys(done).length;
        const completed = Object.values(done).filter(Boolean).length;

        return {
            total,
            completed,
            percent: Math.round((completed / total) * 100),
        };
    }, [done]);

    const meds = [
        {
            id: 1,
            name: "بروفين 400 ملغ",
            dose: "حبة واحدة عند اللزوم",
            when: "بعد الأكل",
        },
        {
            id: 2,
            name: "أوميبرازول",
            dose: "حبة واحدة يومياً",
            when: "قبل الإفطار",
        },
    ];

    const tasks = [
        {
            id: "bp",
            title: "قياس ضغط الدم",
            time: "08:00 ص",
        },
        {
            id: "med",
            title: "تناول الدواء الصباحي",
            time: "08:30 ص",
        },
        {
            id: "pulse",
            title: "قياس النبض",
            time: "02:00 م",
        },
        {
            id: "doctor",
            title: "مراجعة الطبيب (عن بُعد)",
            time: "06:00 م",
        },
    ];

    const bpNote =
        "سيقوم النظام بتنبيه الطبيب (مثال: د. سامي خالد) تلقائياً في حال إدخالك لقراءات ضغط دم تتجاوز 140/90.";

    const handleToggleTask = (key) => {
        setDone((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleGoBack = () => {
        navigation.navigate("PatientDashboard");
    };

    const handleAddNewReading = () => {
        setBp({
            sys: 145,
            dia: 92,
            status: "مرتفع",
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.screen}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topSection}>
                    <View style={styles.topRow}>
                        

                        <View style={styles.titleWrap}>
                            <View style={styles.kickerRow}>
                                <Fileicon width={20} height={20} />
                                <Text style={styles.kickerText}>خطة المتابعة الذكية</Text>
                            </View>

                            <Text style={styles.title}>متابعة ما بعد العلاج</Text>
                        </View>

                        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                            <Text style={styles.backButtonText}>العودة للوحة التحكم</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subtitle}>
                        نحن هنا لضمان تعافيك الكامل والوقاية من المضاعفات.
                    </Text>
                </View>

                <View style={styles.progressCard}>
                    <Progressicon width={86} height={86} style={styles.progressBgIcon} />
                    <View style={styles.progressContent}>
                        <View style={styles.progressHeaderRow}>
                            <View style={styles.progressTextWrap}>
                                <Text style={styles.progressTitle}>تقدم التعافي اليوم</Text>
                                <Text style={styles.progressSub}>
                                    أكملت {progress.completed} من أصل {progress.total} مهام صحية
                                </Text>
                            </View>

                            <Text style={styles.progressPercent}>{progress.percent}%</Text>
                        </View>

                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressBarFill,
                                    { width: `${progress.percent}%` },
                                ]}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <Pillicon width={20} height={20} />
                        <Text style={styles.sectionTitle}>جدول الأدوية</Text>
                    </View>
                </View>

                <View style={styles.medsGrid}>
                    {meds.map((m) => (
                        <View key={m.id} style={styles.medCard}>
                            <View style={styles.medIconBox}>
                                <Pillicon width={20} height={20} />
                            </View>

                            <View style={styles.medInfo}>
                                <Text style={styles.medName}>{m.name}</Text>
                                <Text style={styles.medDose}>{m.dose}</Text>
                                <View style={styles.chip}>
                                    <Text style={styles.chipText}>{m.when}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>المهام الصحية اليومية</Text>
                </View>

                <View style={styles.tasksCard}>
                    {tasks.map((t) => (
                        <View key={t.id} style={styles.taskRow}>
                            <View style={styles.taskRight}>
                                <View
                                    style={[
                                        styles.checkCircle,
                                        done[t.id] ? styles.checkCircleOn : styles.checkCircleOff,
                                    ]}
                                >
                                    {done[t.id] && (
                                        <Checkicon width={15} height={15} />
                                    )}
                                </View>

                                <View style={styles.taskInfo}>
                                    <Text
                                        style={[
                                            styles.taskTitle,
                                            done[t.id] && styles.taskTitleDone,
                                        ]}
                                    >
                                        {t.title}
                                    </Text>
                                    <Text style={styles.taskTime}>{t.time}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.taskUpdateButton}
                                onPress={() => handleToggleTask(t.id)}
                            >
                                <Text style={styles.taskUpdateButtonText}>تحديث</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <View style={styles.alertCard}>
                    <View style={styles.alertHead}>
                        <View style={styles.alertTitleRow}>
                            <Alerticon width={20} height={20} />
                            <Text style={styles.alertTitle}>تنبيه الطبيب</Text>
                        </View>
                    </View>

                    <Text style={styles.alertText}>{bpNote}</Text>

                    <View style={styles.bpBox}>
                        <View style={styles.bpMeta}>
                            <Text style={styles.bpLabel}>آخر قراءة مدخلة</Text>
                            <Text style={styles.bpValue}>
                                {bp.sys}/{bp.dia}
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.statusPill,
                                bp.status === "طبيعي"
                                    ? styles.statusPillOk
                                    : styles.statusPillWarn,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusPillText,
                                    bp.status === "طبيعي"
                                        ? styles.statusPillTextOk
                                        : styles.statusPillTextWarn,
                                ]}
                            >
                                {bp.status}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.warnButton}
                        onPress={handleAddNewReading}
                    >
                        <Text style={styles.warnButtonText}>إدخال قراءة جديدة</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tipCard}>
                    <Text style={styles.cardTitle}>نصيحة اليوم</Text>

                    <View style={styles.tipItem}>
                        <Text style={styles.tipBullet}>•</Text>
                        <Text style={styles.tipText}>
                            المشي لمدة 15 دقيقة يساعد في تحسين الدورة الدموية.
                        </Text>
                    </View>

                    <View style={styles.tipItem}>
                        <Text style={styles.tipBullet}>•</Text>
                        <Text style={styles.tipText}>
                            تأكّد من شرب 8 أكواب من الماء للحفاظ على ترطيب الجسم.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}