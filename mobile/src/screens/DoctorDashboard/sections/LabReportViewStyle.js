import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#eef3f8",
    },

    container: {
        flex: 1,
    },

    contentContainer: {
        paddingHorizontal: 14,
        paddingTop: 16,
        paddingBottom: 28,
    },

    topBackButton: {
        alignSelf: "flex-end",
        marginBottom: 14,
        backgroundColor: "#ffffff",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#dbe2ea",
    },

    topBackButtonText: {
        color: "#2563eb",
        fontSize: 14,
        fontWeight: "800",
    },

    reportCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 28,
        overflow: "hidden",
        shadowColor: "#0f172a",
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 5,
    },

    header: {
        backgroundColor: "#2563eb",
        paddingHorizontal: 20,
        paddingVertical: 24,
    },

    headerTitle: {
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "900",
        textAlign: "right",
        marginBottom: 8,
    },

    headerSubtitle: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "right",
        lineHeight: 22,
    },

    body: {
        padding: 18,
    },

    section: {
        marginBottom: 22,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#dbe4f0",
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
        marginBottom: 14,
    },

    sectionTitleAlt: {
        fontSize: 20,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
        marginBottom: 14,
    },

    gridTwo: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },

    gridThree: {
        gap: 12,
    },

    infoCard: {
        width: "48%",
        backgroundColor: "#f1f5f9",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 18,
        padding: 16,
        minHeight: 100,
        justifyContent: "center",
    },

    infoLabel: {
        fontSize: 13,
        color: "#64748b",
        marginBottom: 8,
        fontWeight: "700",
        textAlign: "right",
    },

    infoValue: {
        fontSize: 16,
        color: "#0f172a",
        fontWeight: "900",
        textAlign: "right",
        lineHeight: 24,
    },

    infoLabelBlue: {
        fontSize: 13,
        color: "#011c55",
        marginBottom: 8,
        fontWeight: "700",
        textAlign: "right",
    },

    infoValueBlue: {
        fontSize: 16,
        color: "#2563eb",
        fontWeight: "900",
        textAlign: "right",
        lineHeight: 24,
    },

    examStatusBox: {
        alignSelf: "flex-end",
        backgroundColor: "#16a34a",
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },

    examStatusText: {
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "800",
        textAlign: "center",
    },

    resultsList: {
        gap: 14,
    },

    resultCard: {
        borderRadius: 20,
        padding: 16,
        borderWidth: 1.5,
    },

    resultCardNormal: {
        backgroundColor: "#effcf4",
        borderColor: "#98e2b3",
    },

    resultCardWarning: {
        backgroundColor: "#fff9eb",
        borderColor: "#f4cc67",
    },

    resultCardCritical: {
        backgroundColor: "#fff1f2",
        borderColor: "#fda4af",
    },

    resultCardPending: {
        backgroundColor: "#f8fafc",
        borderColor: "#cbd5e1",
    },

    resultTopLine: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
    },

    resultName: {
        flex: 1,
        fontSize: 18,
        color: "#0f172a",
        fontWeight: "900",
        textAlign: "right",
    },

    badge: {
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 7,
    },

    badgeNormal: {
        backgroundColor: "#16a34a",
    },

    badgeWarning: {
        backgroundColor: "#ea7a00",
    },

    badgeCritical: {
        backgroundColor: "#dc2626",
    },

    badgePending: {
        backgroundColor: "#64748b",
    },

    badgeText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "800",
    },

    resultContent: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },

    resultMetaColumn: {
        flex: 1,
    },

    resultMetaLabel: {
        color: "#64748b",
        fontSize: 13,
        fontWeight: "700",
        textAlign: "right",
        marginBottom: 6,
    },

    resultMetaValue: {
        fontSize: 17,
        color: "#0f172a",
        fontWeight: "900",
        textAlign: "right",
    },

    resultUnit: {
        fontSize: 12,
        color: "#334155",
        fontWeight: "700",
    },

    resultIconWrap: {
        width: 50,
        alignItems: "center",
        justifyContent: "center",
    },

    resultIcon: {
        fontSize: 28,
        fontWeight: "900",
        color: "#0f172a",
    },

    notesBox: {
        backgroundColor: "#eef5ff",
        borderWidth: 1,
        borderColor: "#cfe0ff",
        borderRadius: 20,
        padding: 16,
    },

    notesText: {
        color: "#1e3a8a",
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "500",
        textAlign: "right",
        flex: 1,
    },

    listItemRow: {
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        marginBottom: 8,
    },

    listBullet: {
        color: "#1e3a8a",
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "900",
    },

    recommendationsGrid: {
        gap: 14,
    },

    recommendationCard: {
        borderRadius: 20,
        padding: 16,
    },

    recommendationGreen: {
        backgroundColor: "#effcf4",
        borderWidth: 1,
        borderColor: "#b7ebc6",
    },

    recommendationBlue: {
        backgroundColor: "#eef5ff",
        borderWidth: 1,
        borderColor: "#cfe0ff",
    },

    recommendationTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#01681e",
        textAlign: "right",
        marginBottom: 12,
    },

    recommendationTitleBlue: {
        fontSize: 16,
        fontWeight: "800",
        color: "#2563eb",
        textAlign: "right",
        marginBottom: 12,
    },

    recommendationGreenText: {
        color: "#01681e",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
        flex: 1,
    },

    recommendationBlueText: {
        color: "#2563eb",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
        flex: 1,
    },

    listBulletGreen: {
        color: "#01681e",
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "900",
    },

    listBulletBlue: {
        color: "#2563eb",
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "900",
    },

    signatureSection: {
        gap: 14,
    },

    signatureBox: {
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    signatureLabel: {
        color: "#6b7c93",
        fontSize: 13,
        fontWeight: "700",
        textAlign: "right",
        marginBottom: 10,
    },

    signatureLine: {
        width: "100%",
        height: 2,
        backgroundColor: "#d0d7e2",
        marginBottom: 14,
    },

    signatureName: {
        fontSize: 16,
        fontWeight: "900",
        color: "#0f172a",
        textAlign: "right",
        marginBottom: 6,
    },

    signatureMeta: {
        color: "#6b7c93",
        fontSize: 13,
        lineHeight: 20,
        textAlign: "right",
        marginBottom: 4,
    },

    actionsRow: {
        gap: 10,
        marginTop: 16,
    },

    primaryBtn: {
        height: 50,
        borderRadius: 16,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
    },

    primaryBtnText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "900",
    },

    secondaryBtn: {
        height: 50,
        borderRadius: 16,
        backgroundColor: "#ffffff",
        borderWidth: 1.5,
        borderColor: "#0f172a",
        alignItems: "center",
        justifyContent: "center",
    },

    secondaryBtnText: {
        color: "#0f172a",
        fontSize: 14,
        fontWeight: "900",
    },

    emptyPage: {
        flex: 1,
        backgroundColor: "#eef3f8",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    emptyCard: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 22,
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "#0f172a",
        marginBottom: 8,
        textAlign: "center",
    },

    emptyText: {
        fontSize: 14,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 16,
    },

    backButton: {
        backgroundColor: "#2563eb",
        borderRadius: 14,
        paddingHorizontal: 18,
        paddingVertical: 12,
    },

    backButtonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "800",
    },

    emptyStateBox: {
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    emptyStateText: {
        color: "#64748b",
        fontSize: 14,
        textAlign: "right",
        lineHeight: 22,
    },
});

export default styles;