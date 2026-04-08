import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const isSmallMobile = width <= 420;
const isMobile = width <= 640;
const isTablet = width <= 992;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f6f9ff",
    },

    topActionsRow: {
        width: "100%",
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        marginBottom: isMobile ? 1: 5,
    },

    headerTopRow: {
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
        minHeight: 56,
    },

    backButton: {
        position: "absolute",
        left: 0,
        top: "50%",
        transform: [{ translateY: -21 }],
        minHeight: 42,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#dbeafe",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },

    backButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#2563eb",
    },

    contentContainer: {
        paddingTop: isSmallMobile ? 22 : isMobile ? 28 : 42,
        paddingHorizontal: isSmallMobile ? 10 : isMobile ? 14 : 18,
        paddingBottom: isSmallMobile ? 40 : isMobile ? 48 : 70,
        alignItems: "center",
    },

    header: {
        width: "100%",
        maxWidth: 860,
        alignItems: "center",
        marginBottom: isMobile ? 20 : 26,
        paddingHorizontal: 12,
    },

    logoWrap: {
        width: isMobile ? 68 : 74,
        height: isMobile ? 68 : 74,
        marginBottom: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    logoPulse: {
        width: isMobile ? 58 : 64,
        height: isMobile ? 58 : 64,
        borderRadius: isMobile ? 16 : 18,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#2f6fed",
        shadowOpacity: 0.28,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
    },

    title: {
        fontSize: isSmallMobile ? 28 : isMobile ? 34 : 38,
        lineHeight: isSmallMobile ? 34 : isMobile ? 40 : 46,
        fontWeight: "900",
        color: "#0f172a",
        marginBottom: 10,
        textAlign: "center",
    },

    subtitle: {
        marginHorizontal: "auto",
        color: "#64748b",
        fontSize: isSmallMobile ? 13.5 : isMobile ? 14 : 15.5,
        lineHeight: isSmallMobile ? 22 : 26,
        textAlign: "center",
        writingDirection: "rtl",
        maxWidth: 720,
    },

    brand: {
        fontWeight: "800",
        color: "#2563eb",
    },

    card: {
        width: "100%",
        maxWidth: isTablet ? 640 : 700,
        minHeight: isTablet ? undefined : 700,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "rgba(15,23,42,.08)",
        borderRadius: isSmallMobile ? 20 : isMobile ? 22 : 28,
        paddingHorizontal: isSmallMobile ? 12 : isMobile ? 18 : 24,
        paddingTop: isSmallMobile ? 16 : isMobile ? 20 : 26,
        paddingBottom: isSmallMobile ? 14 : isMobile ? 18 : 22,
        shadowColor: "#000",
        shadowOpacity: 0.14,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 5 },
        elevation: 8,
    },

    cardHead: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: isMobile ? 8 : 14,
    },

    cardTitle: {
        marginRight: 10,
        fontSize: isMobile ? 17 : 18,
        fontWeight: "900",
        color: "#0f172a",
    },

    cardIcon: {
        width: 26,
        height: 26,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9,
        backgroundColor: "#ffffff",
    },

    textBox: {
        backgroundColor: "#fbfdff",
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: isMobile ? 16 : 20,
        padding: isMobile ? 12 : 14,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },

    textarea: {
        width: "100%",
        minHeight: 118,
        color: "#0f172a",
        fontSize: isMobile ? 14 : 14.5,
        lineHeight: 26,
        textAlign: "right",
        textAlignVertical: "top",
        writingDirection: "rtl",
        paddingTop: 0,
    },

    quickSection: {
        marginTop: 16,
    },

    quickLabel: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        marginBottom: 12,
    },

    quickLabelText: {
        color: "rgba(100,116,139,.9)",
        fontWeight: "800",
        fontSize: 13,
    },

    chipsWrap: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: isMobile ? 10 : 12,
    },

    chip: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: isMobile ? 12 : 18,
        borderRadius: isMobile ? 12 : 14,
        borderWidth: 1,
        borderColor: "rgba(165, 163, 163, 0.5)",
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
        minHeight: isMobile ? 44 : 48,
    },

    chipTopRow: {
        width: "31.5%",
    },

    chipBottomRow: {
        width: "48.5%",
    },

    chipActive: {
        borderColor: "rgba(59,130,246,.55)",
        shadowColor: "#3b82f6",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 4,
    },

    plusWrap: {
        alignItems: "center",
        justifyContent: "center",
    },

    chipText: {
        fontWeight: "800",
        color: "#0f172a",
        fontSize: isMobile ? 13 : 14,
        textAlign: "center",
    },

    analyzeButton: {
        marginTop: 18,
        width: "100%",
        minHeight: isMobile ? 54 : 60,
        borderRadius: isMobile ? 16 : 22,
        backgroundColor: "#2563eb",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        shadowColor: "#2563eb",
        shadowOpacity: 0.28,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },

    analyzeButtonDisabled: {
        opacity: 0.8,
        elevation: 0,
        shadowOpacity: 0,
    },

    analyzeButtonProcessing: {
        backgroundColor: "gray",
    },

    buttonIconWrap: {
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    analyzeButtonText: {
        color: "#ffffff",
        fontSize: isSmallMobile ? 16 : isMobile ? 17 : 20,
        fontWeight: "900",
        textAlign: "center",
    },

    alertBox: {
        marginTop: 18,
        backgroundColor: "#fff7e6",
        borderWidth: 1,
        borderColor: "rgba(250,204,21,.35)",
        borderRadius: isMobile ? 16 : 18,
        paddingVertical: isMobile ? 12 : 14,
        paddingHorizontal: isMobile ? 14 : 16,
    },

    alertTop: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
    },

    alertTitle: {
        color: "#9a5a00",
        fontWeight: "800",
        fontSize: 14,
    },

    alertIconWrap: {
        alignItems: "center",
        justifyContent: "center",
    },

    alertText: {
        marginTop: 8,
        color: "#9a5a00",
        lineHeight: isMobile ? 22 : 24,
        fontSize: isMobile ? 13 : 13.5,
        textAlign: "right",
        writingDirection: "rtl",
    },
});

export default styles;