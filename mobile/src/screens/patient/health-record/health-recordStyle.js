import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const isSmallMobile = width < 380;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f3f6fb",
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 30,
    },

    header: {
        marginBottom: 18,
    },

    headerTop: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },

    titleBox: {
        flex: 1,
        alignItems: "flex-end",
    },

    breadcrumbWrap: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 6,
        marginBottom: 8,
    },

    breadcrumbText: {
        color: "#2563eb",
        fontSize: 14,
        fontFamily: "Cairo-Regular",
        textAlign: "right",
    },

    pageTitle: {
        color: "#020817",
        fontSize: isSmallMobile ? 26 : 30,
        fontFamily: "Cairo-Bold",
        textAlign: "right",
        lineHeight: isSmallMobile ? 38 : 42,
    },

    backButton: {
        backgroundColor: "#2563eb",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        alignSelf: "flex-start",
        minWidth: 86,
    },

    backButtonText: {
        color: "#ffffff",
        fontSize: 14,
        fontFamily: "Cairo-SemiBold",
        textAlign: "center",
    },

    patientIdBadge: {
        marginTop: 14,
        alignSelf: "flex-end",
        borderWidth: 1,
        borderColor: "#c9d7f6",
        backgroundColor: "#e0eafc",
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },

    patientIdText: {
        color: "#2563eb",
        fontSize: 14,
        fontFamily: "Cairo-SemiBold",
        textAlign: "center",
    },

    vitalsGrid: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    vitalCard: {
        width: "48%",
        backgroundColor: "#ffffff",
        borderRadius: 22,
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 14,
        borderWidth: 1,
        borderColor: "#edf1f7",
        shadowColor: "#0f172a",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
        marginBottom: 12,
    },

    vitalIconWrap: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },

    iconBlood: {
        backgroundColor: "#fff1f2",
    },

    iconAllergy: {
        backgroundColor: "#fff7e8",
    },

    iconHeight: {
        backgroundColor: "#eef4ff",
    },

    iconWeight: {
        backgroundColor: "#eefdf3",
    },

    iconDefault: {
        backgroundColor: "#f8fafc",
    },

    vitalTextWrap: {
        flex: 1,
        alignItems: "flex-end",
    },

    vitalLabel: {
        color: "#94a3b8",
        fontSize: 13,
        fontFamily: "Cairo-Regular",
        marginBottom: 2,
        textAlign: "right",
    },

    vitalValue: {
        color: "#020817",
        fontSize: 18,
        fontFamily: "Cairo-Bold",
        textAlign: "right",
    },

    sideCard: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 18,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#e8edf6",
        shadowColor: "#0f172a",
        shadowOpacity: 0.05,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },

    sideCardSoft: {
        backgroundColor: "#dfe9fd",
        borderRadius: 24,
        padding: 18,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#dfe9fd",
        shadowColor: "#0f172a",
        shadowOpacity: 0.04,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },

    sectionTitleWrap: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
    },

    sectionTitleText: {
        color: "#0b1b47",
        fontSize: 18,
        fontFamily: "Cairo-SemiBold",
        textAlign: "right",
    },

    sectionTitleDanger: {
        color: "#ef4444",
    },

    geneticList: {
        gap: 16,
    },

    geneticItem: {
        gap: 8,
    },

    geneticTopRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
    },

    geneticLabel: {
        color: "#334155",
        fontSize: 14,
        fontFamily: "Cairo-SemiBold",
        flex: 1,
        textAlign: "right",
        marginLeft: 10,
    },

    geneticPercent: {
        color: "#64748b",
        fontSize: 13,
        fontFamily: "Cairo-SemiBold",
    },

    geneticTrack: {
        width: "100%",
        height: 10,
        backgroundColor: "#f4f7fb",
        borderRadius: 999,
        overflow: "hidden",
        flexDirection: "row-reverse",
    },

    geneticFill: {
        height: "100%",
        borderRadius: 999,
    },

    geneticFillSuccess: {
        backgroundColor: "#22c55e",
    },

    geneticFillWarning: {
        backgroundColor: "#f59e0b",
    },

    alertsList: {
        gap: 12,
    },

    alertBadge: {
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 14,
    },

    alertDanger: {
        backgroundColor: "#fff1f2",
    },

    alertInfo: {
        backgroundColor: "#edf3ff",
    },

    alertText: {
        fontSize: 14,
        fontFamily: "Cairo-Regular",
        textAlign: "right",
        lineHeight: 22,
    },

    alertDangerText: {
        color: "#ef4444",
    },

    alertInfoText: {
        color: "#2563eb",
    },

    timelineSection: {
        backgroundColor: "transparent",
        marginBottom: 8,
    },

    timelineList: {
        marginTop: 4,
        gap: 0,
    },

    timelineItemRow: {
        flexDirection: "row-reverse",
        alignItems: "flex-start",
    },

    timelineAxis: {
        width: 28,
        alignItems: "center",
        position: "relative",
        paddingTop: 8,
    },

    timelineDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#2563eb",
        borderWidth: 3,
        borderColor: "#dfe9ff",
        zIndex: 2,
    },

    timelineDotFeatured: {
        backgroundColor: "#0f3d91",
    },

    timelineLine: {
        position: "absolute",
        top: 24,
        bottom: -24,
        width: 3,
        backgroundColor: "#d8e3fb",
        borderRadius: 999,
    },

    timelineContent: {
        flex: 1,
        paddingRight: 10,
        paddingBottom: 18,
    },

    timelineDateBadge: {
        alignSelf: "flex-end",
        backgroundColor: "#edf3ff",
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginBottom: 10,
    },

    timelineDateText: {
        color: "#2563eb",
        fontSize: 13,
        fontFamily: "Cairo-Bold",
        textAlign: "center",
    },

    timelineCard: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 16,
        borderWidth: 1,
        borderColor: "#edf1f7",
        shadowColor: "#0f172a",
        shadowOpacity: 0.04,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },

    timelineCardFeatured: {
        backgroundColor: "#2563eb",
        borderColor: "#2563eb",
    },

    timelineTitle: {
        color: "#020817",
        fontSize: 17,
        fontFamily: "Cairo-Bold",
        textAlign: "right",
        marginBottom: 6,
    },

    timelineTitleFeatured: {
        color: "#ffffff",
    },

    timelineDescription: {
        color: "#64748b",
        fontSize: 14,
        fontFamily: "Cairo-Regular",
        textAlign: "right",
        lineHeight: 22,
    },

    timelineDescriptionFeatured: {
        color: "#eaf1ff",
    },

    timelineFooter: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#e9eef8",
        alignItems: "flex-end",
    },

    timelineStatusBadge: {
        backgroundColor: "#eef4ff",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },

    timelineStatusBadgeFeatured: {
        backgroundColor: "rgba(255,255,255,0.18)",
    },

    timelineStatusText: {
        color: "#2563eb",
        fontSize: 12,
        fontFamily: "Cairo-SemiBold",
        textAlign: "center",
    },

    timelineStatusTextFeatured: {
        color: "#ffffff",
    },
});

export default styles;