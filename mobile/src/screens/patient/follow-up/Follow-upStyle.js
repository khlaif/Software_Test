import { StyleSheet, I18nManager } from "react-native";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const COLORS = {
    blue: "#2563eb",
    blueDark: "#0f3d91",
    blueLight: "#3b82f6",
    warnText: "#9a5a00e6",
    warnBg: "#fff7ed",
    warnBorder: "rgba(249,115,22,0.25)",
    orange: "#d97706",
    bg: "#f6f9ff",
    card: "#ffffff",
    text: "#0f172a",
    muted: "#64748b",
    white: "#ffffff",
    greenBg: "rgba(16, 185, 129, 0.12)",
    greenBorder: "rgba(16, 185, 129, 0.25)",
    greenText: "#0f766e",
    shadow: "rgba(15, 23, 42, 0.10)",
    shadowSoft: "rgba(15, 23, 42, 0.07)",
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },

    screen: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },

    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 18,
        paddingBottom: 28,
    },

    topSection: {
        marginBottom: 18,
    },

    topRow: {
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 8,
    },

    titleWrap: {
        flex: 1,
        alignItems: "flex-end",
        minWidth: 0,
    },

    kickerRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignSelf: "stretch",
    },

    kickerText: {
        color: COLORS.blue,
        fontSize: 15,
        fontWeight: "800",
        textAlign: "right",
    },

    title: {
        color: COLORS.text,
        fontSize: 28,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 0,
        flexWrap: "wrap",
        alignSelf: "stretch",
    },

    subtitle: {
        color: COLORS.muted,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 24,
        textAlign: "right",
    },

    backButton: {
        width: 100,
        minWidth: 100,
        maxWidth: 100,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: "rgba(15, 23, 42, 0.08)",
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 6,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 2,
    },

    backButtonText: {
        color: COLORS.text,
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
    },

    progressCard: {
        position: "relative",
        overflow: "hidden",
        backgroundColor: COLORS.blue,
        borderRadius: 28,
        paddingVertical: 20,
        paddingHorizontal: 18,
        marginBottom: 18,
        shadowColor: COLORS.blue,
        shadowOpacity: 0.22,
        shadowRadius: 14,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        elevation: 6,
    },

    progressBgIcon: {
        position: "absolute",
        left: 14,
        top: 18,
        opacity: 0.16,
    },

    progressContent: {
        zIndex: 2,
    },

    progressHeaderRow: {
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 14,
    },

    progressTextWrap: {
        flex: 1,
        alignItems: "flex-end",
    },

    progressTitle: {
        color: COLORS.white,
        fontSize: 21,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 6,
    },

    progressSub: {
        color: "rgba(255,255,255,0.85)",
        fontSize: 13,
        fontWeight: "500",
        lineHeight: 22,
        textAlign: "right",
    },

    progressPercent: {
        color: COLORS.white,
        fontSize: 32,
        fontWeight: "900",
        textAlign: "left",
    },

    progressBar: {
        width: "100%",
        height: 12,
        backgroundColor: "rgba(255,255,255,0.22)",
        borderRadius: 999,
        overflow: "hidden",
        flexDirection: "row-reverse",
    },

    progressBarFill: {
        height: "100%",
        backgroundColor: COLORS.white,
        borderRadius: 999,
    },

    sectionHeader: {
        marginBottom: 12,
        marginTop: 2,
    },

    sectionTitleRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 8,
        justifyContent: "flex-start",
    },

    sectionTitle: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "800",
        textAlign: "right",
    },

    medsGrid: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 18,
    },

    medCard: {
        width: "48%",
        backgroundColor: COLORS.card,
        borderRadius: 22,
        padding: 14,
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 12,
        borderWidth: 1,
        borderColor: "rgba(15, 23, 42, 0.05)",
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 3,
        minHeight: 150,
    },

    medIconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "rgba(37, 99, 235, 0.12)",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
    },

    medInfo: {
        width: "100%",
        alignItems: "flex-end",
    },

    medName: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 4,
    },

    medDose: {
        color: COLORS.muted,
        fontSize: 13,
        fontWeight: "500",
        lineHeight: 21,
        textAlign: "right",
    },

    chip: {
        marginTop: 10,
        backgroundColor: "rgba(37, 99, 235, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(37, 99, 235, 0.25)",
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignSelf: "flex-end",
    },

    chipText: {
        color: COLORS.blue,
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
    },

    tasksCard: {
        marginBottom: 18,
        gap: 12,
    },

    taskRow: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 14,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        borderWidth: 1,
        borderColor: "rgba(15, 23, 42, 0.05)",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 2,
    },

    taskRight: {
        flex: 1,
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 12,
    },

    checkCircle: {
        width: 28,
        height: 28,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
    },

    checkCircleOn: {
        backgroundColor: "rgb(89, 240, 89)",
        borderColor: "rgb(89, 240, 89)",
    },

    checkCircleOff: {
        backgroundColor: "transparent",
        borderColor: "rgba(15, 23, 42, 0.18)",
    },

    taskInfo: {
        flex: 1,
        alignItems: "flex-end",
    },

    taskTitle: {
        color: COLORS.text,
        fontSize: 17,
        fontWeight: "800",
        textAlign: "right",
    },

    taskTitleDone: {
        color: "rgba(15, 23, 42, 0.35)",
        textDecorationLine: "line-through",
    },

    taskTime: {
        color: COLORS.muted,
        fontSize: 13,
        fontWeight: "500",
        textAlign: "right",
        marginTop: 4,
    },

    taskUpdateButton: {
        minWidth: 74,
        backgroundColor: COLORS.bg,
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    taskUpdateButtonText: {
        color: COLORS.text,
        fontSize: 13,
        fontWeight: "800",
        textAlign: "center",
    },

    alertCard: {
        backgroundColor: COLORS.warnBg,
        borderWidth: 1,
        borderColor: COLORS.warnBorder,
        borderRadius: 22,
        padding: 16,
        marginBottom: 18,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 2,
    },

    alertHead: {
        marginBottom: 10,
    },

    alertTitleRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 8,
        justifyContent: "flex-start",
    },

    alertTitle: {
        color: "#3b2403e6",
        fontSize: 20,
        fontWeight: "800",
        textAlign: "right",
    },

    alertText: {
        color: COLORS.warnText,
        fontSize: 14,
        lineHeight: 24,
        textAlign: "right",
        marginBottom: 14,
    },

    bpBox: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.orange,
        borderRadius: 18,
        padding: 14,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
        gap: 12,
    },

    bpMeta: {
        flex: 1,
        alignItems: "flex-end",
    },

    bpLabel: {
        color: COLORS.orange,
        fontSize: 16,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 4,
    },

    bpValue: {
        color: "#3b2403e6",
        fontSize: 18,
        fontWeight: "900",
        textAlign: "right",
    },

    statusPill: {
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
    },

    statusPillOk: {
        backgroundColor: COLORS.greenBg,
        borderColor: COLORS.greenBorder,
    },

    statusPillWarn: {
        backgroundColor: "rgba(154, 90, 0, 0.14)",
        borderColor: "rgba(154, 90, 0, 0.25)",
    },

    statusPillText: {
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
    },

    statusPillTextOk: {
        color: COLORS.greenText,
    },

    statusPillTextWarn: {
        color: "#6b3c00",
    },

    warnButton: {
        backgroundColor: COLORS.orange,
        borderRadius: 18,
        paddingVertical: 15,
        paddingHorizontal: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    warnButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "800",
        textAlign: "center",
    },

    tipCard: {
        backgroundColor: COLORS.card,
        borderRadius: 22,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(15, 23, 42, 0.05)",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 2,
    },

    cardTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 12,
    },

    tipItem: {
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 8,
    },

    tipBullet: {
        color: COLORS.muted,
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 24,
    },

    tipText: {
        flex: 1,
        color: COLORS.muted,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 24,
        textAlign: "right",
    },
});

export default styles;