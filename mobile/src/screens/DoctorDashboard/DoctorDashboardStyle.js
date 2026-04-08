import { I18nManager, StyleSheet } from "react-native";

I18nManager.allowRTL(true);
I18nManager.forceRTL(false);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f4f7fb",
    },

    container: {
        flex: 1,
        backgroundColor: "#f4f7fb",
    },

    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 28,
    },

    headerTop: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 16,
        gap: 10,
        marginBottom: 18,
    },

    headerCenterContent: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },

    headerMenuButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    headerMenuIcon: {
        fontSize: 22,
        color: "#0f172a",
        fontWeight: "800",
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
    },

    headerSubtitle: {
        marginTop: 4,
        fontSize: 13,
        color: "#2563eb",
        fontWeight: "600",
        textAlign: "right",
    },

    headerIcon: {
        width: 54,
        height: 54,
        borderRadius: 18,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#2563eb",
        shadowOpacity: 0.22,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 5,
        marginLeft: 12,
    },

    headerIconText: {
        fontSize: 24,
    },

    searchWrapper: {
        marginBottom: 18,
    },

    searchInput: {
        backgroundColor: "#ffffff",
        borderRadius: 18,
        paddingHorizontal: 18,
        height: 54,
        color: "#0f172a",
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    queueSection: {
        marginBottom: 18,
    },

    sectionHeaderRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
    },

    sectionBadge: {
        fontSize: 12,
        color: "#2563eb",
        backgroundColor: "#e8f0ff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        overflow: "hidden",
        fontWeight: "700",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 18,
    },

    medicalHistoryModalCard: {
        width: "100%",
        maxWidth: 420,
        maxHeight: "78%",
        backgroundColor: "#ffffff",
        borderRadius: 28,
        padding: 18,
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },

    modalHeader: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    modalCloseText: {
        fontSize: 20,
        fontWeight: "800",
        color: "#475569",
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
    },

    modalPatientName: {
        fontSize: 15,
        color: "#2563eb",
        fontWeight: "700",
        textAlign: "right",
        marginBottom: 16,
    },

    modalTimelineScroll: {
        maxHeight: 280,
    },

    sideTabsOverlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.38)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },

    sideTabsPanel: {
        height: "100%",
        backgroundColor: "#ffffff",
        paddingTop: 56,
        paddingHorizontal: 14,
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 18,
        shadowOffset: { width: -4, height: 0 },
        elevation: 8,
    },

    sideTabsHeader: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 22,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#edf2f7",
    },

    sideTabsTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
    },

    sideTabsClose: {
        fontSize: 20,
        color: "#475569",
        fontWeight: "800",
    },

    sideTabsList: {
        gap: 10,
    },

    sideTabItem: {
        flexDirection: "row-reverse",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 18,
        backgroundColor: "#f8fafc",
        borderWidth: 1,
        borderColor: "#edf2f7",
    },

    sideTabItemActive: {
        backgroundColor: "#0f172a",
        borderColor: "#0f172a",
    },

    sideTabIconWrap: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#eaf2ff",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },

    sideTabIconWrapActive: {
        backgroundColor: "#1d4ed8",
    },

    sideTabIcon: {
        fontSize: 17,
    },

    sideTabLabel: {
        fontSize: 18,
        height: 30,
        lineHeight: 30,
        fontWeight: "800",
        color: "#334155",
        textAlign: "right",
        flex: 1,
    },

    sideTabLabelActive: {
        color: "#ffffff",
    },

    patientsScrollContent: {
        paddingLeft: 4,
        gap: 12,
    },

    patientMiniCard: {
        width: 220,
        backgroundColor: "#ffffff",
        borderRadius: 22,
        padding: 14,
        borderWidth: 1,
        borderColor: "#e8eef6",
        shadowColor: "#0f172a",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },

    patientMiniCardActive: {
        borderColor: "#2563eb",
        backgroundColor: "#f5f9ff",
    },

    patientMiniCardCompleted: {
        opacity: 0.65,
    },

    patientMiniTop: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    patientMiniName: {
        color: "#0f172a",
        fontWeight: "800",
        fontSize: 16,
        textAlign: "right",
        flex: 1,
    },

    patientMiniTime: {
        color: "#64748b",
        fontWeight: "700",
        fontSize: 12,
        marginRight: 8,
    },

    patientMiniCondition: {
        color: "#475569",
        fontSize: 13,
        textAlign: "right",
        marginBottom: 10,
    },

    miniBadge: {
        alignSelf: "flex-end",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },

    miniBadgeText: {
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "700",
    },

    currentPatientCard: {
        backgroundColor: "#ffffff",
        borderRadius: 26,
        padding: 16,
        marginBottom: 18,
        shadowColor: "#0f172a",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    },

    currentPatientTop: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },

    avatarBox: {
        width: 62,
        height: 62,
        borderRadius: 20,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
    },

    avatarText: {
        fontSize: 28,
    },

    currentPatientInfo: {
        flex: 1,
    },

    nameStatusRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
    },

    currentPatientName: {
        fontSize: 19,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
    },

    currentPatientMeta: {
        marginTop: 6,
        fontSize: 14,
        color: "#64748b",
        textAlign: "right",
    },

    currentPatientRecord: {
        marginTop: 4,
        fontSize: 14,
        color: "#334155",
        textAlign: "right",
        fontWeight: "600",
    },

    statusChip: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },

    statusChipText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#111827",
    },

    statusChipDanger: {
        backgroundColor: "#fee2e2",
    },

    statusChipReview: {
        backgroundColor: "#ffedd5",
    },

    statusChipReady: {
        backgroundColor: "#dcfce7",
    },

    statusChipCompleted: {
        backgroundColor: "#e5e7eb",
    },

    statusChipDefault: {
        backgroundColor: "#e2e8f0",
    },

    actionsRow: {
        flexDirection: "row-reverse",
        gap: 10,
        marginTop: 16,
    },

    secondaryActionBtn: {
        flex: 1,
        height: 48,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: "#d0d9e6",
        backgroundColor: "#f8fbff",
        alignItems: "center",
        justifyContent: "center",
    },

    secondaryActionText: {
        color: "#0f172a",
        fontSize: 14,
        fontWeight: "700",
    },

    dangerActionBtn: {
        flex: 1,
        height: 48,
        borderRadius: 16,
        backgroundColor: "#ef4444",
        alignItems: "center",
        justifyContent: "center",
    },

    dangerActionText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "800",
    },

    disabledBtn: {
        opacity: 0.5,
    },

    aiCard: {
        backgroundColor: "#2563eb",
        borderRadius: 28,
        padding: 16,
        marginBottom: 18,
    },

    aiHeaderRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    aiTitle: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "800",
        textAlign: "right",
    },

    aiBadge: {
        backgroundColor: "rgba(255,255,255,0.16)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },

    aiBadgeText: {
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "700",
    },

    aiRiskBox: {
        backgroundColor: "rgba(255,255,255,0.12)",
        borderRadius: 20,
        padding: 14,
        marginBottom: 12,
    },

    aiRiskHeader: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    aiRiskLabel: {
        color: "#dbeafe",
        fontSize: 13,
        fontWeight: "700",
        textAlign: "right",
    },

    aiRiskPercent: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "800",
    },

    aiRiskValue: {
        color: "#ffffff",
        fontSize: 17,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 12,
    },

    progressTrack: {
        width: "100%",
        height: 10,
        borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.22)",
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        borderRadius: 999,
        backgroundColor: "#ffffff",
        alignSelf: "flex-end",
    },

    urgentTestsBox: {
        backgroundColor: "rgba(255,255,255,0.12)",
        borderRadius: 20,
        padding: 14,
    },

    urgentTestsTitle: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 10,
    },

    urgentTestItem: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 6,
    },

    urgentTestBullet: {
        color: "#ffffff",
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "800",
    },

    urgentTestText: {
        color: "#eff6ff",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "right",
        flex: 1,
    },

    vitalsCard: {
        backgroundColor: "#ffffff",
        borderRadius: 26,
        padding: 16,
        marginBottom: 18,
    },

    vitalsGrid: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },

    vitalCard: {
        width: "48%",
        backgroundColor: "#f8fafc",
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    vitalLabel: {
        color: "#64748b",
        fontSize: 13,
        fontWeight: "700",
        textAlign: "right",
        marginBottom: 8,
    },

    vitalValue: {
        fontSize: 18,
        fontWeight: "800",
        textAlign: "right",
    },

    vitalDanger: {
        color: "#dc2626",
    },

    vitalWarning: {
        color: "#d97706",
    },

    vitalSuccess: {
        color: "#16a34a",
    },

    vitalNormal: {
        color: "#2563eb",
    },

    tabContentCard: {
        backgroundColor: "#ffffff",
        borderRadius: 26,
        padding: 16,
        marginBottom: 18,
    },

    contentPlaceholder: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 28,
        alignItems: "center",
        justifyContent: "center",
    },

    placeholderTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 8,
    },

    placeholderText: {
        fontSize: 14,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 22,
    },

    homeGrid: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },

    homeMiniCard: {
        width: "48%",
        backgroundColor: "#f8fafc",
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    homeMiniLabel: {
        fontSize: 12,
        color: "#64748b",
        fontWeight: "700",
        textAlign: "right",
        marginBottom: 8,
    },

    homeMiniValue: {
        fontSize: 15,
        color: "#0f172a",
        fontWeight: "800",
        textAlign: "right",
    },

    labCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    labTopRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },

    labTestName: {
        color: "#0f172a",
        fontSize: 16,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 6,
    },


    resultCritical: {
        color: "#dc2626",
    },

    resultWarning: {
        color: "#d97706",
    },

    resultNormal: {
        color: "#16a34a",
    },

    resultPending: {
        color: "#94a3b8",
    },

    labStatusPill: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#dbe2ea",
    },

    labStatusText: {
        color: "#334155",
        fontSize: 12,
        fontWeight: "700",
    },

    noteBoxDanger: {
        backgroundColor: "#fff1f2",
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#fecdd3",
    },

    noteTitleDanger: {
        color: "#be123c",
        fontSize: 15,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 8,
    },

    noteTextDanger: {
        color: "#9f1239",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
    },

    noteBoxInfo: {
        backgroundColor: "#eff6ff",
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: "#bfdbfe",
    },

    noteTitleInfo: {
        color: "#1d4ed8",
        fontSize: 15,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 8,
    },

    noteTextInfo: {
        color: "#1e40af",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
    },

    consultCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    consultPatient: {
        color: "#0f172a",
        fontSize: 16,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 6,
    },

    consultMeta: {
        color: "#64748b",
        fontSize: 13,
        textAlign: "right",
        marginBottom: 12,
    },

    primaryMiniButton: {
        backgroundColor: "#2563eb",
        height: 42,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    primaryMiniButtonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "800",
    },

    secondaryMiniButton: {
        borderWidth: 1.5,
        borderColor: "#cbd5e1",
        backgroundColor: "#ffffff",
        height: 42,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    secondaryMiniButtonText: {
        color: "#0f172a",
        fontSize: 14,
        fontWeight: "700",
    },

    scheduleCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    scheduleDay: {
        color: "#0f172a",
        fontSize: 16,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 6,
    },

    scheduleTime: {
        color: "#2563eb",
        fontSize: 14,
        fontWeight: "700",
        textAlign: "right",
        marginBottom: 4,
    },

    scheduleSlots: {
        color: "#64748b",
        fontSize: 13,
        textAlign: "right",
    },

    historyStatsRow: {
        flexDirection: "row-reverse",
        gap: 10,
        marginBottom: 16,
    },

    historyStatBox: {
        flex: 1,
        backgroundColor: "#f8fafc",
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    historyStatLabel: {
        color: "#64748b",
        fontSize: 12,
        fontWeight: "700",
        textAlign: "right",
        marginBottom: 6,
    },

    historyStatValue: {
        color: "#0f172a",
        fontSize: 15,
        fontWeight: "800",
        textAlign: "right",
    },

    timelineMainTitle: {
        color: "#0f172a",
        fontSize: 16,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 12,
    },

    timelineCard: {
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#edf2f7",
        borderRadius: 18,
        padding: 14,
        marginBottom: 10,
    },

    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 999,
        backgroundColor: "#2563eb",
        marginLeft: 10,
        marginTop: 4,
    },

    timelineTitle: {
        color: "#0f172a",
        fontSize: 15,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 4,
    },

    timelineMeta: {
        color: "#64748b",
        fontSize: 13,
        textAlign: "right",
    },

        officeInfoCard: {
        backgroundColor: "#eff6ff",
        borderRadius: 22,
        padding: 16,
        marginTop: 14,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#bfdbfe",
    },

    officeInfoTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#1d4ed8",
        textAlign: "right",
        marginBottom: 8,
    },

    officeInfoText: {
        fontSize: 14,
        color: "#1e3a8a",
        lineHeight: 22,
        textAlign: "right",
    },

    officeSectionBlock: {
        marginBottom: 18,
    },

    officeSubTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
        marginBottom: 12,
    },

    officeDayCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 20,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    officeDayMain: {
        marginBottom: 12,
    },

    officeDayHeaderRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    officeDayName: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
    },

    officeStatusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },

    officeStatusBadgeActive: {
        backgroundColor: "#dcfce7",
    },

    officeStatusBadgeInactive: {
        backgroundColor: "#e5e7eb",
    },

    officeStatusBadgeText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#111827",
    },

    officeTimeRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 8,
    },

    officeTimeText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#2563eb",
        textAlign: "right",
    },

    officeTimeSeparator: {
        marginHorizontal: 8,
        color: "#64748b",
        fontSize: 14,
        fontWeight: "700",
    },

    officeSlotsText: {
        fontSize: 13,
        color: "#64748b",
        textAlign: "right",
        lineHeight: 20,
    },

    officeDisabledText: {
        fontSize: 13,
        color: "#94a3b8",
        textAlign: "right",
    },

    officeEditBtn: {
        height: 44,
        borderRadius: 14,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
    },

    officeEditBtnText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "800",
    },

    officeStatsGrid: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },

    officeStatCard: {
        width: "48%",
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderWidth: 1,
    },

    officeStatLabel: {
        fontSize: 12,
        color: "#475569",
        fontWeight: "700",
        textAlign: "right",
        marginBottom: 8,
    },

    officeStatValue: {
        fontSize: 16,
        color: "#0f172a",
        fontWeight: "800",
        textAlign: "right",
    },

    officeStatPurple: {
        backgroundColor: "#f5f3ff",
        borderColor: "#ddd6fe",
    },

    officeStatOrange: {
        backgroundColor: "#fff7ed",
        borderColor: "#fed7aa",
    },

    officeStatGreen: {
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
    },

    officeStatBlue: {
        backgroundColor: "#eff6ff",
        borderColor: "#bfdbfe",
    },

    officeModalCard: {
        width: "100%",
        maxWidth: 420,
        backgroundColor: "#ffffff",
        borderRadius: 28,
        padding: 18,
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },

    officeSwitchRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 18,
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    officeSwitchLabel: {
        flex: 1,
        textAlign: "right",
        color: "#0f172a",
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 12,
    },

    officeFormGroup: {
        marginBottom: 14,
    },

    officeInputLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#334155",
        textAlign: "right",
        marginBottom: 8,
    },

    officeTextInput: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        paddingHorizontal: 14,
        height: 52,
        color: "#0f172a",
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#dbe2ea",
    },

    officeModalActions: {
        flexDirection: "row-reverse",
        gap: 10,
        marginTop: 12,
    },

    officeSaveBtn: {
        flex: 1,
        height: 48,
        borderRadius: 16,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
    },

    officeSaveBtnText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "800",
    },

    officeCancelBtn: {
        flex: 1,
        height: 48,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: "#d0d9e6",
        backgroundColor: "#f8fbff",
        alignItems: "center",
        justifyContent: "center",
    },

    officeCancelBtnText: {
        color: "#0f172a",
        fontSize: 14,
        fontWeight: "700",
    },

        diagnosisUpdateBtn: {
        backgroundColor: "#2563eb",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    diagnosisUpdateBtnText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "800",
    },

    diagnosisWrapper: {
        marginTop: 8,
    },

    diagnosisBlock: {
        marginBottom: 18,
    },

    diagnosisSubtitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "right",
        marginBottom: 12,
    },

    diagnosisAlertBox: {
        borderRadius: 22,
        padding: 16,
        borderWidth: 1,
    },

    diagnosisAlertHigh: {
        backgroundColor: "#fff1f2",
        borderColor: "#fecdd3",
    },

    diagnosisAlertMedium: {
        backgroundColor: "#fff7ed",
        borderColor: "#fed7aa",
    },

    diagnosisAlertLow: {
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
    },

    diagnosisSeverityRow: {
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
        marginBottom: 10,
    },

    diagnosisSeverityBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },

    diagnosisSeverityHigh: {
        backgroundColor: "#ef4444",
    },

    diagnosisSeverityMedium: {
        backgroundColor: "#f59e0b",
    },

    diagnosisSeverityLow: {
        backgroundColor: "#22c55e",
    },

    diagnosisSeverityBadgeText: {
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "800",
    },

    diagnosisTitleText: {
        color: "#0f172a",
        fontSize: 18,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 8,
    },

    diagnosisDescriptionText: {
        color: "#475569",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
    },

    diagnosisTreatmentList: {
        gap: 12,
    },

    diagnosisTreatmentCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 20,
        padding: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        flexDirection: "row-reverse",
        alignItems: "flex-start",
    },

    diagnosisStepNumber: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
    },

    diagnosisStepNumberText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "800",
    },

    diagnosisTreatmentInfo: {
        flex: 1,
    },

    diagnosisTreatmentTitle: {
        color: "#0f172a",
        fontSize: 15,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 6,
    },

    diagnosisTreatmentNote: {
        color: "#475569",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
    },

    diagnosisEmptyState: {
        marginTop: 10,
        backgroundColor: "#f8fafc",
        borderRadius: 22,
        padding: 20,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    diagnosisEmptyTitle: {
        color: "#0f172a",
        fontSize: 17,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 8,
    },

    diagnosisEmptyText: {
        color: "#64748b",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "right",
    },

    diagnosisModalCard: {
        width: "100%",
        maxWidth: 430,
        maxHeight: "82%",
        backgroundColor: "#ffffff",
        borderRadius: 28,
        padding: 18,
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },

    diagnosisModalScrollContent: {
        paddingBottom: 8,
    },

    diagnosisFormGroup: {
        marginBottom: 14,
    },

    diagnosisInputLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#334155",
        textAlign: "right",
        marginBottom: 8,
    },

    diagnosisTextInput: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 14,
        minHeight: 52,
        color: "#0f172a",
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#dbe2ea",
    },

    diagnosisTextArea: {
        minHeight: 110,
        textAlignVertical: "top",
    },

    diagnosisTextAreaSmall: {
        minHeight: 90,
        textAlignVertical: "top",
    },

    diagnosisSeverityOptions: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 12,
    },

    diagnosisSeverityOption: {
        flex: 1,
        minHeight: 46,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#d0d9e6",
        backgroundColor: "#f8fbff",
        alignItems: "center",
        justifyContent: "center",
    },

    diagnosisSeverityOptionActive: {
        backgroundColor: "#0f172a",
        borderColor: "#0f172a",
    },

    diagnosisSeverityOptionText: {
        color: "#0f172a",
        fontSize: 13,
        fontWeight: "700",
    },

    diagnosisSeverityOptionTextActive: {
        color: "#ffffff",
    },

    diagnosisSeverityPreview: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    diagnosisSeverityPreviewText: {
        color: "#ffffff",
        fontSize: 13,
        fontWeight: "800",
    },

    diagnosisSaveBtn: {
        marginTop: 8,
        backgroundColor: "#2563eb",
        height: 50,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    diagnosisSaveBtnText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "800",
    },
        labResultsGrid: {
        gap: 12,
    },

    labResultCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 20,
        padding: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginBottom: 12,
    },

    labResultMain: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },

    labResultRight: {
        flex: 1,
        alignItems: "flex-end",
    },

    labResultLeft: {
        alignItems: "flex-start",
        justifyContent: "center",
    },

    labResultTitle: {
        color: "#0f172a",
        fontSize: 16,
        fontWeight: "800",
        textAlign: "right",
        marginBottom: 8,
    },

    labResultStatusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        alignSelf: "flex-end",
    },

    labResultStatusDone: {
        backgroundColor: "#dcfce7",
    },

    labResultStatusPending: {
        backgroundColor: "#e2e8f0",
    },

    labResultStatusText: {
        color: "#111827",
        fontSize: 11,
        fontWeight: "800",
    },

    labResultValue: {
        fontSize: 15,
        fontWeight: "800",
        marginBottom: 10,
        textAlign: "left",
    },

    labResultValueDanger: {
        color: "#dc2626",
    },

    labResultValueMuted: {
        color: "#94a3b8",
    },

    labReportLink: {
        backgroundColor: "#2563eb",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },

    labReportLinkText: {
        color: "#ffffff",
        fontSize: 13,
        fontWeight: "800",
    },
});

export default styles;