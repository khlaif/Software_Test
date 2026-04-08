import React, { useMemo } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import styles, { isSmallMobile } from "./health-recordStyle";

// SVG imports
import HeartIcon from "../../../../assets/images/heart.svg";
import CircleAlertIcon from "../../../../assets/images/circle-alert.svg";
import ActivityBlueIcon from "../../../../assets/images/activity_blue.svg";
import ActivityGreenIcon from "../../../../assets/images/activity_green.svg";
import CalendarIcon from "../../../../assets/images/calendar_blue.svg";
import AlertRedIcon from "../../../../assets/images/circle-alert_red.svg";
import DnaIcon from "../../../../assets/images/dna.svg";
import HistoryIcon from "../../../../assets/images/history.svg";

const defaultData = {
    patientId: "PAT-99283#",
    title: "الملف الطبي الشامل",
    breadcrumb: "السجل الصحي البصري",
    bloodType: "+O",
    allergy: "البنسلين",
    height: "175",
    weight: "80",
    geneticIndicators: [
        {
            id: 1,
            label: "قابلية الإصابة بالسكري",
            value: 82,
            color: "warning",
        },
        {
            id: 2,
            label: "صحة القلب",
            value: 96,
            color: "success",
        },
    ],
    alerts: [
        {
            id: 1,
            text: "تجنب أدوية السلفا (حساسية مسجلة)",
            type: "danger",
        },
        {
            id: 2,
            text: "موعد فحص السكري القادم: 15 مارس",
            type: "info",
        },
    ],
    timeline: [
        {
            id: 1,
            date: "15 فبراير 2026",
            title: "بداية المسار الحالي",
            description: "ألم في الصدر وضيق تنفّس",
            status: "قيد المتابعة",
            featured: true,
        },
        {
            id: 2,
            date: "12 يناير 2026",
            title: "فحص دوري",
            description: "ضغط الدم والسكري - نتائج طبيعية",
            featured: false,
        },
        {
            id: 3,
            date: "20 نوفمبر 2025",
            title: "عملية جراحية",
            description: "استئصال الزائدة الدودية",
            featured: false,
        },
        {
            id: 4,
            date: "05 سبتمبر 2025",
            title: "تطعيم إنفلونزا",
            description: "الجرعة السنوية",
            featured: false,
        },
    ],
};

const VitalCard = ({ label, value, iconType }) => {
    const renderIcon = () => {
        switch (iconType) {
            case "blood":
                return <HeartIcon width={24} height={24} />;
            case "allergy":
                return <CircleAlertIcon width={24} height={24} />;
            case "height":
                return <ActivityBlueIcon width={24} height={24} />;
            case "weight":
                return <ActivityGreenIcon width={24} height={24} />;
            default:
                return null;
        }
    };

    const getIconWrapperStyle = () => {
        switch (iconType) {
            case "blood":
                return styles.iconBlood;
            case "allergy":
                return styles.iconAllergy;
            case "height":
                return styles.iconHeight;
            case "weight":
                return styles.iconWeight;
            default:
                return styles.iconDefault;
        }
    };

    return (
        <View style={styles.vitalCard}>
            <View style={[styles.vitalIconWrap, getIconWrapperStyle()]}>
                {renderIcon()}
            </View>

            <View style={styles.vitalTextWrap}>
                <Text style={styles.vitalLabel}>{label}</Text>
                <Text style={styles.vitalValue}>{value || "--"}</Text>
            </View>
        </View>
    );
};

const GeneticBar = ({ label, value, color }) => {
    return (
        <View style={styles.geneticItem}>
            <View style={styles.geneticTopRow}>
                <Text style={styles.geneticLabel}>{label}</Text>
                <Text style={styles.geneticPercent}>{value}%</Text>
            </View>

            <View style={styles.geneticTrack}>
                <View
                    style={[
                        styles.geneticFill,
                        color === "success"
                            ? styles.geneticFillSuccess
                            : styles.geneticFillWarning,
                        { width: `${value}%` },
                    ]}
                />
            </View>
        </View>
    );
};

const AlertItem = ({ text, type }) => {
    return (
        <View
            style={[
                styles.alertBadge,
                type === "danger" ? styles.alertDanger : styles.alertInfo,
            ]}
        >
            <Text
                style={[
                    styles.alertText,
                    type === "danger" ? styles.alertDangerText : styles.alertInfoText,
                ]}
            >
                {text}
            </Text>
        </View>
    );
};

const TimelineItem = ({ item, isLast }) => {
    return (
        <View style={styles.timelineItemRow}>
            <View style={styles.timelineAxis}>
                <View
                    style={[
                        styles.timelineDot,
                        item.featured && styles.timelineDotFeatured,
                    ]}
                />
                {!isLast && <View style={styles.timelineLine} />}
            </View>

            <View style={styles.timelineContent}>
                <View style={styles.timelineDateBadge}>
                    <Text style={styles.timelineDateText}>{item.date}</Text>
                </View>

                <View
                    style={[
                        styles.timelineCard,
                        item.featured && styles.timelineCardFeatured,
                    ]}
                >
                    <Text
                        style={[
                            styles.timelineTitle,
                            item.featured && styles.timelineTitleFeatured,
                        ]}
                    >
                        {item.title}
                    </Text>

                    <Text
                        style={[
                            styles.timelineDescription,
                            item.featured && styles.timelineDescriptionFeatured,
                        ]}
                    >
                        {item.description}
                    </Text>

                    {item.status ? (
                        <View style={styles.timelineFooter}>
                            <View
                                style={[
                                    styles.timelineStatusBadge,
                                    item.featured && styles.timelineStatusBadgeFeatured,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.timelineStatusText,
                                        item.featured && styles.timelineStatusTextFeatured,
                                    ]}
                                >
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>
        </View>
    );
};

const SectionTitle = ({ icon, title, danger = false }) => {
    return (
        <View style={styles.sectionTitleWrap}>
            {icon}
            <Text
                style={[
                    styles.sectionTitleText,
                    danger && styles.sectionTitleDanger,
                ]}
            >
                {title}
            </Text>
        </View>
    );
};

const HealthRecordScreen = ({ route }) => {
    const navigation = useNavigation();

    const data = route?.params?.healthRecordData || defaultData;

    const vitalCards = useMemo(
        () => [
            {
                id: 1,
                label: "فصيلة الدم",
                value: data?.bloodType || "--",
                iconType: "blood",
            },
            {
                id: 2,
                label: "الحساسية",
                value: data?.allergy || "--",
                iconType: "allergy",
            },
            {
                id: 3,
                label: "الطول",
                value: data?.height ? `${data.height} سم` : "--",
                iconType: "height",
            },
            {
                id: 4,
                label: "الوزن",
                value: data?.weight ? `${data.weight} كجم` : "--",
                iconType: "weight",
            },
        ],
        [data]
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <View style={styles.titleBox}>
                            <View style={styles.breadcrumbWrap}>
                                <HistoryIcon width={18} height={18} />
                                <Text style={styles.breadcrumbText}>{data?.breadcrumb}</Text>
                            </View>

                            <Text style={styles.pageTitle}>
                                {data?.title}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.backButton}
                            activeOpacity={0.85}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.backButtonText}>العودة</Text>
                        </TouchableOpacity>
                    </View>

                    {!!data?.patientId && (
                        <View style={styles.patientIdBadge}>
                            <Text style={styles.patientIdText}>{data.patientId}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.vitalsGrid}>
                    {vitalCards.map((card) => (
                        <VitalCard
                            key={card.id}
                            label={card.label}
                            value={card.value}
                            iconType={card.iconType}
                        />
                    ))}
                </View>

                <View style={styles.sideCardSoft}>
                    <SectionTitle
                        icon={<DnaIcon width={22} height={22} />}
                        title="المؤشرات الجينية"
                    />

                    <View style={styles.geneticList}>
                        {(data?.geneticIndicators || []).map((item) => (
                            <GeneticBar
                                key={item.id}
                                label={item.label}
                                value={item.value}
                                color={item.color}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.sideCard}>
                    <SectionTitle
                        icon={<AlertRedIcon width={22} height={22} />}
                        title="تنبيهات هامة"
                        danger
                    />

                    <View style={styles.alertsList}>
                        {(data?.alerts || []).map((alert) => (
                            <AlertItem
                                key={alert.id}
                                text={alert.text}
                                type={alert.type}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.timelineSection}>
                    <SectionTitle
                        icon={<CalendarIcon width={22} height={22} />}
                        title="الخط الزمني للصحة"
                    />

                    <View style={styles.timelineList}>
                        {(data?.timeline || []).map((item, index, arr) => (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                isLast={index === arr.length - 1}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HealthRecordScreen;