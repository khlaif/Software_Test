import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },

    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },

    scrollContent: {
        paddingBottom: 80,
    },

    loaderWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },

    loaderText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#475569",
    },

    header: {
        backgroundColor: "#0f172a",
        paddingTop: 36,
        paddingBottom: 88,
        paddingHorizontal: 20,
        position: "relative",
        overflow: "hidden",
    },

    headerBlurCircle: {
        position: "absolute",
        top: -80,
        right: -80,
        width: 280,
        height: 280,
        borderRadius: 999,
        backgroundColor: "#3b82f6",
        opacity: 0.12,
    },

    backButton: {
        alignSelf: "flex-start",
        marginBottom: 24,
    },

    backButtonText: {
        fontSize: 15,
        fontWeight: "600",
        color: "rgba(255,255,255,0.82)",
    },

    headerTitleRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 14,
    },

    headerIconSlot: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "rgba(255,255,255,0.16)",
        alignItems: "center",
        justifyContent: "center",
    },

    headerTextWrapper: {
        flex: 1,
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: "900",
        color: "#ffffff",
        textAlign: "right",
    },

    headerSubtitle: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: "500",
        color: "#cbd5e1",
        textAlign: "right",
    },

    mainCard: {
        marginTop: -56,
        marginHorizontal: 16,
        backgroundColor: "#ffffff",
        borderRadius: 28,
        overflow: "hidden",
        shadowColor: "#0f172a",
        shadowOpacity: 0.08,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        elevation: 6,
    },

    statusSection: {
        padding: 20,
        borderBottomWidth: 1,
    },

    statusSectionPending: {
        backgroundColor: "#fffbeb",
        borderBottomColor: "#fde68a",
    },

    statusSectionPaid: {
        backgroundColor: "#f0fdf4",
        borderBottomColor: "#bbf7d0",
    },

    statusInfo: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },

    statusIconSlot: {
        width: 48,
        height: 48,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 14,
    },

    statusIconSlotPending: {
        backgroundColor: "#fef3c7",
        borderWidth: 1,
        borderColor: "#fbbf24",
    },

    statusIconSlotPaid: {
        backgroundColor: "#dcfce7",
        borderWidth: 1,
        borderColor: "#22c55e",
    },

    statusTextWrapper: {
        flex: 1,
    },

    statusTitle: {
        fontSize: 17,
        fontWeight: "900",
        textAlign: "right",
    },

    statusTitlePending: {
        color: "#78350f",
    },

    statusTitlePaid: {
        color: "#14532d",
    },

    statusDescription: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: "500",
        textAlign: "right",
        lineHeight: 20,
    },

    statusDescriptionPending: {
        color: "#b45309",
    },

    statusDescriptionPaid: {
        color: "#15803d",
    },

    payButton: {
        marginTop: 16,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#d97706",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#d97706",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        elevation: 4,
    },

    payButtonText: {
        fontSize: 15,
        fontWeight: "900",
        color: "#ffffff",
    },

    cardBody: {
        paddingHorizontal: 16,
        paddingVertical: 22,
    },

    infoColumn: {
        gap: 24,
    },

    infoBlock: {
        width: "100%",
    },

    infoLabel: {
        marginBottom: 4,
        fontSize: 13,
        fontWeight: "700",
        color: "#64748b",
        textAlign: "right",
    },

    infoValue: {
        fontSize: 17,
        fontWeight: "900",
        color: "#0f172a",
        textAlign: "right",
        lineHeight: 24,
    },

    infoSubtext: {
        marginTop: 4,
        fontSize: 13,
        color: "#64748b",
        textAlign: "right",
    },

    insuranceLine: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 8,
    },

    insuranceIconSlot: {
        alignItems: "center",
        justifyContent: "center",
    },

    insuranceBadge: {
        alignSelf: "flex-end",
        marginTop: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
        borderWidth: 1,
        borderRadius: 999,
    },

    insuranceBadgeText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#15803d",
        textAlign: "center",
    },

    separator: {
        height: 1,
        backgroundColor: "#e2e8f0",
        marginVertical: 28,
    },

    detailsSection: {
        width: "100%",
    },

    detailsTitle: {
        fontSize: 19,
        fontWeight: "900",
        color: "#0f172a",
        textAlign: "right",
        marginBottom: 18,
    },

    tableScrollContent: {
        paddingBottom: 4,
    },

    tableWrapper: {
        minWidth: 760,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    tableHeader: {
        flexDirection: "row-reverse",
        backgroundColor: "#f8fafc",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
    },

    tableHeaderCell: {
        paddingVertical: 14,
        paddingHorizontal: 8,
        fontSize: 12,
        fontWeight: "800",
        color: "#64748b",
        textAlign: "center",
    },

    tableRow: {
        flexDirection: "row-reverse",
        backgroundColor: "#ffffff",
        borderBottomWidth: 1,
        borderBottomColor: "#eef2f7",
    },

    tableCell: {
        paddingVertical: 14,
        paddingHorizontal: 8,
        fontSize: 13,
        lineHeight: 19,
        textAlign: "center",
    },

    procedureCell: {
        width: 260,
        textAlign: "right",
        color: "#0f172a",
        fontWeight: "800",
    },

    deptCell: {
        width: 120,
        textAlign: "right",
        color: "#64748b",
        fontWeight: "500",
    },

    costCell: {
        width: 110,
        color: "#64748b",
        fontWeight: "500",
    },

    coveredCell: {
        width: 130,
        color: "#16a34a",
        fontWeight: "800",
    },

    finalCell: {
        width: 140,
        color: "#0f172a",
        fontWeight: "900",
        fontSize: 14,
    },

    emptyStateRow: {
        paddingVertical: 28,
        paddingHorizontal: 16,
        backgroundColor: "#ffffff",
    },

    emptyStateText: {
        textAlign: "center",
        fontSize: 14,
        color: "#6b7280",
        lineHeight: 22,
    },

    summaryWrapper: {
        width: "100%",
    },

    summaryCard: {
        width: "100%",
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 18,
    },

    summaryLine: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
    },

    summaryLineText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#64748b",
    },

    summaryLineGreenText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#16a34a",
    },

    summaryInnerSeparator: {
        height: 1,
        backgroundColor: "#e2e8f0",
        marginVertical: 16,
    },

    summaryTotal: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
    },

    summaryTotalLabel: {
        fontSize: 18,
        fontWeight: "900",
        color: "#0f172a",
    },

    summaryTotalValue: {
        fontSize: 28,
        fontWeight: "900",
        color: "#0f172a",
    },

    cardFooter: {
        backgroundColor: "#f8fafc",
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        padding: 18,
        gap: 14,
    },

    footerNote: {
        fontSize: 13,
        fontWeight: "500",
        color: "#64748b",
        textAlign: "right",
        lineHeight: 20,
    },

    downloadButton: {
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#cbd5e1",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },

    downloadButtonText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0f172a",
    },

    disabledButton: {
        opacity: 0.6,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        justifyContent: "center",
        paddingHorizontal: 16,
    },

    modalContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        overflow: "hidden",
    },

    modalHeader: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },

    modalTitle: {
        fontSize: 21,
        fontWeight: "800",
        color: "#0f172a",
    },

    modalCloseButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#f1f5f9",
        alignItems: "center",
        justifyContent: "center",
    },

    modalCloseButtonText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#334155",
        lineHeight: 24,
    },

    modalBody: {
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 8,
    },

    modalSummary: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f8fafc",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 18,
    },

    modalSummaryLabel: {
        fontSize: 14,
        color: "#334155",
        fontWeight: "600",
    },

    modalSummaryValue: {
        fontSize: 20,
        color: "#0f172a",
        fontWeight: "800",
    },

    formGroup: {
        marginBottom: 14,
    },

    formLabel: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: "700",
        color: "#334155",
        textAlign: "right",
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#dbe3ee",
        borderRadius: 14,
        paddingHorizontal: 14,
        fontSize: 14,
        color: "#0f172a",
        backgroundColor: "#ffffff",
    },

    formRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        gap: 12,
    },

    formHalf: {
        flex: 1,
    },

    modalFooter: {
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
        gap: 10,
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
    },

    cancelButton: {
        flex: 1,
        height: 46,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#cbd5e1",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },

    cancelButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#334155",
    },

    confirmButton: {
        flex: 1,
        height: 46,
        borderRadius: 14,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
    },

    confirmButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#ffffff",
    },

});

export default styles;