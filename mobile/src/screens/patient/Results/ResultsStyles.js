import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f6f9ff",
    },

    content: {
        padding: 16,
        paddingBottom: 28,
    },

    headerCard: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 18,
        marginBottom: 16,
        shadowColor: "#0f172a",
        shadowOffset: {
        width: 0,
        height: 10,
        },
        shadowOpacity: 0.06,
        shadowRadius: 18,
        elevation: 4,
    },

    badge: {
        flexDirection: "row-reverse",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#ecfdf5",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        marginBottom: 12,
        gap: 8,
    },

    badgeIconWrap: {
        alignItems: "center",
        justifyContent: "center",
    },

    badgeText: {
        color: "#16a34a",
        fontFamily: "Cairo",
        fontSize: 13,
        fontWeight: "800",
    },

    title: {
        fontSize: 24,
        color: "#0f172a",
        fontFamily: "Cairo",
        fontWeight: "800",
        textAlign: "right",
        lineHeight: 36,
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        color: "#64748b",
        fontFamily: "Cairo",
        textAlign: "right",
        lineHeight: 24,
        marginBottom: 16,
    },

    actionsRow: {
        gap: 10,
    },

    primaryBtn: {
        backgroundColor: "#2563eb",
        borderRadius: 16,
        minHeight: 52,
        paddingHorizontal: 16,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 10,
    },

    primaryBtnText: {
        color: "#ffffff",
        fontSize: 15,
        fontFamily: "Cairo",
        fontWeight: "700",
    },

    ghostBtn: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        minHeight: 52,
        paddingHorizontal: 16,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderWidth: 1,
        borderColor: "rgba(15,23,42,0.08)",
    },

    ghostBtnText: {
        color: "#0f172a",
        fontSize: 15,
        fontFamily: "Cairo",
        fontWeight: "700",
    },

    card: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 18,
        marginBottom: 16,
        shadowColor: "#0f172a",
        shadowOffset: {
        width: 0,
        height: 10,
        },
        shadowOpacity: 0.05,
        shadowRadius: 16,
        elevation: 3,
    },

    diagnosisCard: {
        backgroundColor: "#ecfdf5",
    },

    cardTitleRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },

    cardTitle: {
        fontSize: 18,
        color: "#0f172a",
        fontFamily: "Cairo",
        fontWeight: "800",
        textAlign: "right",
    },

    quoteBox: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 16,
    },

    quoteText: {
        fontSize: 16,
        color: "#0f172a",
        fontFamily: "Cairo",
        lineHeight: 30,
        textAlign: "right",
    },

    followList: {
        gap: 12,
        marginTop: 8,
    },

    followItem: {
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        gap: 10,
    },

    followNum: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },

    followNumText: {
        color: "#ffffff",
        fontFamily: "Cairo",
        fontWeight: "800",
        fontSize: 13,
    },

    followText: {
        flex: 1,
        color: "#0f172a",
        fontSize: 15,
        fontFamily: "Cairo",
        lineHeight: 26,
        textAlign: "right",
    },

    warningCard: {
        backgroundColor: "#fff7ed",
        borderWidth: 1,
        borderColor: "rgba(249,115,22,0.18)",
    },

    warningTitle: {
        fontSize: 17,
        color: "#9a5a00",
        fontFamily: "Cairo",
        fontWeight: "800",
        textAlign: "right",
    },

    warningText: {
        fontSize: 15,
        color: "#9a5a00",
        fontFamily: "Cairo",
        lineHeight: 26,
        textAlign: "right",
    },

    testsSection: {
        marginTop: 4,
    },

    sectionTitle: {
        fontSize: 19,
        color: "#0f172a",
        fontFamily: "Cairo",
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 12,
    },

    testCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        marginBottom: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(15,23,42,0.06)",
    },

    testHeader: {
        padding: 14,
    },

    testMain: {
        marginBottom: 12,
    },

    testTitleRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 8,
        marginBottom: 6,
    },

    testTitle: {
        fontSize: 15,
        color: "#0f172a",
        fontFamily: "Cairo",
        fontWeight: "700",
        textAlign: "right",
        flexShrink: 1,
    },

    testSummary: {
        fontSize: 13,
        color: "#64748b",
        fontFamily: "Cairo",
        textAlign: "right",
        lineHeight: 22,
    },

    testSide: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8,
    },

    testDate: {
        fontSize: 12,
        color: "#64748b",
        fontFamily: "Cairo",
    },

    statusBadge: {
        backgroundColor: "#16a34a",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
    },

    statusText: {
        color: "#ffffff",
        fontSize: 11,
        fontFamily: "Cairo",
        fontWeight: "800",
    },

    toggleText: {
        fontSize: 13,
        color: "#2563eb",
        fontFamily: "Cairo",
        fontWeight: "700",
    },

    testBody: {
        paddingHorizontal: 14,
        paddingBottom: 14,
        paddingTop: 2,
        backgroundColor: "#f8fbff",
        borderTopWidth: 1,
        borderTopColor: "rgba(15,23,42,0.05)",
    },

    testDetail: {
        fontSize: 14,
        color: "#0f172a",
        fontFamily: "Cairo",
        lineHeight: 24,
        textAlign: "right",
        marginTop: 6,
    },
});

export default styles;