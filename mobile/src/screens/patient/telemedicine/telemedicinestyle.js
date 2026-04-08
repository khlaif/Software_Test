import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f6f9ff",
    },

    container: {
        flex: 1,
        backgroundColor: "#f6f9ff",
        marginTop: 10,
    },

    contentContainer: {
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 34,
    },

    header: {
        marginBottom: 22,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
    },

    titleBox: {
        flex: 1,
        alignItems: "flex-end",
        minWidth: 0,
    },

    tag: {
        flexDirection: "row-reverse",
        alignItems: "center",
        alignSelf: "flex-end",
        marginBottom: 12,
        gap: 8,
    },

    tagText: {
        color: "#2563eb",
        fontSize: 15,
        fontWeight: "800",
    },

    title: {
        color: "#0f172a",
        fontSize: 24,
        fontWeight: "900",
        textAlign: "right",
        marginBottom: 8,
    },

    subtitle: {
        color: "#64748b",
        fontSize: 13,
        fontWeight: "500",
        textAlign: "right",
        lineHeight: 24,
    },

    backButton: {
        width: 100,
        minHeight: 40,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#dbe2ea",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },

    backButtonText: {
        color: "#0f1b35",
        fontSize: 13,
        fontWeight: "800",
        textAlign: "center",
        lineHeight: 20,
        flexWrap: "wrap",
    },

    videoCard: {
        marginBottom: 22,
    },

    videoMain: {
        position: "relative",
        backgroundColor: "#0f1b35",
        borderRadius: 30,
        minHeight: 410,
        padding: 24,
        justifyContent: "center",
        overflow: "hidden",
    },

    videoCenter: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    avatarWrap: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 6,
        borderColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
        backgroundColor: "#0a2d7d",
    },

    videoWaitingText: {
        color: "#ffffff",
        fontSize: 23,
        fontWeight: "900",
        textAlign: "center",
        marginBottom: 8,
    },

    videoSubText: {
        color: "#cbd5e1",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
        lineHeight: 22,
    },

    selfView: {
        position: "absolute",
        top: 18,
        right: 18,
        width: 122,
        height: 92,
        borderRadius: 18,
        backgroundColor: "rgba(71, 85, 105, 0.72)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },

    cameraPreview: {
        width: "100%",
        height: "100%",
    },

    selfVideoPlaceholder: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    selfLabel: {
        position: "absolute",
        bottom: 6,
        right: 8,
        backgroundColor: "rgba(15, 23, 42, 0.92)",
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "700",
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 8,
        overflow: "hidden",
    },

    controlsBar: {
        position: "absolute",
        bottom: 18,
        left: 18,
        right: 18,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
        backgroundColor: "rgba(6, 12, 28, 0.88)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
        borderRadius: 22,
        paddingVertical: 12,
        paddingHorizontal: 14,
    },

    controlButton: {
        width: 58,
        height: 58,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
    },

    controlButtonDanger: {
        backgroundColor: "#ff4b4b",
        borderWidth: 0,
    },

    controlButtonMuted: {
        backgroundColor: "#22304a",
    },

    controlButtonSpeaking: {
        borderColor: "#2563eb",
        borderWidth: 2,
        shadowColor: "#2563eb",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 8,
    },

    controlButtonDisabled: {
        opacity: 0.45,
    },

    sectionCard: {
        backgroundColor: "#ffffff",
        borderRadius: 28,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#0f172a",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 18,
        elevation: 4,
    },

    sectionHead: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 10,
        marginBottom: 18,
    },

    sectionTitle: {
        color: "#0f172a",
        fontSize: 20,
        fontWeight: "900",
        textAlign: "right",
    },

    appointmentCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 24,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#edf2f7",
    },

    appointmentCardActive: {
        borderColor: "#dbeafe",
    },

    appointmentTop: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 14,
    },

    doctorRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        flex: 1,
    },

    doctorIconBox: {
        width: 58,
        height: 58,
        borderRadius: 18,
        backgroundColor: "#eef2f7",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
    },

    doctorInfo: {
        flex: 1,
        alignItems: "flex-end",
    },

    doctorName: {
        color: "#0f1b35",
        fontSize: 18,
        fontWeight: "900",
        textAlign: "right",
    },

    doctorSpecialty: {
        marginTop: 4,
        color: "#2563eb",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "right",
    },

    statusBadge: {
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderRadius: 999,
    },

    statusBadgeActive: {
        backgroundColor: "#22c55e",
    },

    statusBadgeScheduled: {
        backgroundColor: "#e5e7eb",
    },

    statusText: {
        fontSize: 11,
        fontWeight: "800",
    },

    statusTextActive: {
        color: "#ffffff",
    },

    statusTextScheduled: {
        color: "#6b7280",
    },

    timeRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    timeItem: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 7,
    },

    timeText: {
        color: "#64748b",
        fontSize: 14,
        fontWeight: "700",
    },

    joinButton: {
        backgroundColor: "#047e31",
        borderRadius: 18,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
    },

    joinButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "900",
    },

    chatBox: {
        minHeight: 230,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#d9e2f1",
        borderStyle: "dashed",
        backgroundColor: "#fbfcfe",
        padding: 16,
        marginBottom: 16,
        justifyContent: "center",
    },

    chatPlaceholder: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 28,
    },

    chatPlaceholderText: {
        color: "#64748b",
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 10,
    },

    messageBubble: {
        alignSelf: "flex-start",
        maxWidth: "82%",
        backgroundColor: "#2563eb",
        borderRadius: 16,
        paddingVertical: 11,
        paddingHorizontal: 15,
        marginBottom: 10,
    },

    messageText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "right",
    },

    chatInputRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    chatInput: {
        flex: 1,
        height: 56,
        borderRadius: 999,
        backgroundColor: "#f4f6fb",
        paddingHorizontal: 18,
        color: "#0f172a",
        fontSize: 15,
    },

    sendButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
    },

    filesCard: {
        marginBottom: 0,
    },

    fileItem: {
        backgroundColor: "#fbfcfe",
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: "#eef2f7",
        marginBottom: 16,
    },

    fileItemRight: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },

    fileIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#dbe7ff",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
    },

    fileTextWrap: {
        flex: 1,
        alignItems: "flex-end",
    },

    fileName: {
        color: "#0f172a",
        fontSize: 16,
        fontWeight: "800",
        textAlign: "right",
    },

    fileMeta: {
        marginTop: 4,
        color: "#64748b",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "right",
    },

    uploadButton: {
        height: 56,
        borderRadius: 999,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#111827",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },

    uploadButtonText: {
        color: "#0f172a",
        fontSize: 15,
        fontWeight: "800",
    },
});

export default styles;