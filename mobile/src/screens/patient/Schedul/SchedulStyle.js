import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#f3f6fb",
    },
    container: {
        padding: 16,
        paddingBottom: 28,
    },
    header: {
        marginBottom: 20,
    },
    headerTopRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        gap: 10,
    },
    headerTop: {
        flexDirection: "row-reverse",
        alignItems: "center",
        flexShrink: 1,
    },
    headerLabel: {
        color: "#2563eb",
        fontSize: 14,
        fontWeight: "800",
        marginRight: 8,
        textAlign: "right",
    },
    headerTitle: {
        color: "#111827",
        fontSize: 28,
        fontWeight: "900",
        textAlign: "right",
        marginBottom: 8,
    },
    headerSubtitle: {
        color: "#6b7280",
        fontSize: 14,
        lineHeight: 24,
        textAlign: "right",
        marginBottom: 14,
    },
    backBtn: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d9e1ec",
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 7,
        flexShrink: 0,
    },
    backBtnText: {
        color: "#0f1b35",
        fontSize: 13,
        fontWeight: "800",
    },
    sectionTitleWrap: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "#111827",
        textAlign: "right",
    },
    appointmentsList: {
        gap: 14,
        marginBottom: 18,
    },
    emptyCard: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: "#d9e1ec",
    },
    emptyCardText: {
        color: "#6b7280",
        fontSize: 14,
        textAlign: "right",
    },
    appointmentCard: {
        backgroundColor: "#fff",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        overflow: "hidden",
    },
    appointmentCardConfirmed: {
        borderColor: "#bde5c8",
    },
    appointmentCardSuggested: {
        borderColor: "#dbe7ff",
    },
    timeBox: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        backgroundColor: "#f9fafb",
    },
    appointmentDate: {
        color: "#6b7280",
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 8,
        textAlign: "center",
    },
    appointmentTime: {
        color: "#2563eb",
        fontSize: 22,
        fontWeight: "900",
        textAlign: "center",
    },
    appointmentBody: {
        padding: 16,
    },

    badge: {
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 7,
        flexShrink: 0,

    },
    emptyInstructionText: {
        color: "#64748b",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
    },
    badgeConfirmed: {
        backgroundColor: "#1db954",
    },
    badgePending: {
        backgroundColor: "#f3f4f6",
    },
    badgeSuggested: {
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: "#111827",
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "800",
    },
    badgeTextConfirmed: {
        color: "#fff",
    },
    badgeTextPending: {
        color: "#6b7280",
    },
    badgeTextSuggested: {
        color: "#111827",
    },
    appointmentTitle: {
        flex: 1,
        color: "#111827",
        fontSize: 18,
        fontWeight: "900",
        textAlign: "right",
        marginLeft: 12,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    metaRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 8,
    },
    metaText: {
        flex: 1,
        color: "#64748b",
        fontSize: 13,
        textAlign: "right",
        marginRight: 8,
    },
    doctorText: {
        flex: 1,
        color: "#111827",
        fontSize: 14,
        fontWeight: "700",
        textAlign: "right",
        marginRight: 8,
    },
    actionsRow: {
        marginTop: 14,
        gap: 10,
    },
    outlineBtn: {
        borderWidth: 1.5,
        borderColor: "#111827",
        backgroundColor: "#fff",
        borderRadius: 999,
        paddingVertical: 12,
        alignItems: "center",
    },
    outlineBtnText: {
        color: "#111827",
        fontSize: 13,
        fontWeight: "800",
    },
    primaryBtn: {
        backgroundColor: "#16a34a",
        borderRadius: 999,
        paddingVertical: 12,
        alignItems: "center",
    },
    primaryBtnText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "800",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#d9e1ec",
        padding: 18,
        marginBottom: 16,
    },
    summaryCard: {
        backgroundColor: "#eef4ff",
        borderColor: "#c7d7fb",
    },
    cardTitleRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 14,
    },
    cardTitle: {
        color: "#111827",
        fontSize: 17,
        fontWeight: "900",
        marginRight: 10,
    },
    summaryNumber: {
        color: "#2563eb",
        fontSize: 30,
        fontWeight: "900",
        textAlign: "center",
        marginBottom: 10,
    },
    summaryText: {
        color: "#6b7280",
        fontSize: 14,
        lineHeight: 24,
        textAlign: "right",
    },
    instructionsWrap: {
        gap: 10,
    },
    instructionItem: {
        borderRadius: 16,
        padding: 14,
    },
    instructionWarning: {
        backgroundColor: "#fff5e8",
    },
    instructionInfo: {
        backgroundColor: "#eef4ff",
    },
    instructionText: {
        fontSize: 14,
        lineHeight: 24,
        textAlign: "right",
    },
    instructionWarningText: {
        color: "#c26b17",
    },
    instructionInfoText: {
        color: "#3b82f6",
    },
});

export default styles;