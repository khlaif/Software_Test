import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Alert,
    Animated,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
    AudioModule,
    RecordingPresets,
    setAudioModeAsync,
    useAudioRecorder,
} from "expo-audio";
import styles from "./telemedicinestyle";

// icons
import VideoIcon from "../../../../assets/images/video_blue.svg";
import CalendarIcon from "../../../../assets/images/calendar_blue.svg";
import UserIcon from "../../../../assets/images/user-round.svg";
import UserBlueIcon from "../../../../assets/images/user_blue.svg";
import ClockIcon from "../../../../assets/images/clock.svg";
import FileIcon from "../../../../assets/images/file-text_blue.svg";
import SendIcon from "../../../../assets/images/send.svg";
import MessageIcon from "../../../../assets/images/message-square.svg";
import VideoWhiteIcon from "../../../../assets/images/video_white.svg";
import MicIcon from "../../../../assets/images/mic.svg";
import MicOffIcon from "../../../../assets/images/mic-off.svg";
import VideoOffIcon from "../../../../assets/images/video-off.svg";
import PhoneOffIcon from "../../../../assets/images/phone-off.svg";

function AppointmentCard({ appointment, onJoin }) {
    return (
        <View
            style={[
                styles.appointmentCard,
                appointment.isActive && styles.appointmentCardActive,
            ]}
        >
            <View style={styles.appointmentTop}>
                <View style={styles.doctorRow}>
                    <View style={styles.doctorIconBox}>
                        <UserIcon width={26} height={26} />
                    </View>

                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                        <Text style={styles.doctorSpecialty}>{appointment.specialty}</Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        appointment.isActive
                            ? styles.statusBadgeActive
                            : styles.statusBadgeScheduled,
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            appointment.isActive
                                ? styles.statusTextActive
                                : styles.statusTextScheduled,
                        ]}
                    >
                        {appointment.status}
                    </Text>
                </View>
            </View>

            <View style={styles.timeRow}>
                <View style={styles.timeItem}>
                    <ClockIcon width={17} height={17} />
                    <Text style={styles.timeText}>{appointment.time}</Text>
                </View>

                <View style={styles.timeItem}>
                    <CalendarIcon width={17} height={17} />
                    <Text style={styles.timeText}>{appointment.day}</Text>
                </View>
            </View>

            {appointment.isActive && (
                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.joinButton}
                    onPress={() => onJoin(appointment)}
                >
                    <Text style={styles.joinButtonText}>انضم للمكالمة الآن</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default function Telemedicine() {
    const navigation = useNavigation();

    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [hasMicPermission, setHasMicPermission] = useState(false);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [callControlsEnabled, setCallControlsEnabled] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isMicOn, setIsMicOn] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const [showCameraPreview, setShowCameraPreview] = useState(false);
    const [cameraFacing] = useState("front");

    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const micPulse = useRef(new Animated.Value(1)).current;

    const appointments = useMemo(
        () => [
            {
                id: 1,
                status: "نشط الآن",
                doctorName: "د. سامي خالد",
                specialty: "أخصائي قلب",
                time: "10:00 ص",
                day: "اليوم",
                isActive: true,
            },
            {
                id: 2,
                status: "مجدول",
                doctorName: "د. ليلى حسن",
                specialty: "طبيب عام",
                time: "02:30 م",
                day: "غداً",
                isActive: false,
            },
        ],
        []
    );

    const requestMediaPermissions = async () => {
        try {
            let cameraGranted = cameraPermission?.granted;

            if (!cameraGranted) {
                const cameraResponse = await requestCameraPermission();
                cameraGranted = cameraResponse.granted;
            }

            const micResponse = await AudioModule.requestRecordingPermissionsAsync();
            const micGranted = micResponse.granted;

            setHasMicPermission(micGranted);

            if (!cameraGranted && !micGranted) {
                Alert.alert("تنبيه", "لم يتم منح صلاحية الكاميرا والميكروفون");
                return false;
            }

            return true;
        } catch (error) {
            console.log("Permission error:", error);
            Alert.alert("خطأ", "حدثت مشكلة أثناء طلب الصلاحيات");
            return false;
        }
    };

    useEffect(() => {
        let interval;

        const startMicMonitoring = async () => {
            if (!callControlsEnabled || !isMicOn) return;
            if (!hasMicPermission) return;

            try {
                await setAudioModeAsync({
                    playsInSilentMode: true,
                    allowsRecording: true,
                });

                await recorder.prepareToRecordAsync({
                    ...RecordingPresets.HIGH_QUALITY,
                    isMeteringEnabled: true,
                });

                await recorder.record();

                interval = setInterval(async () => {
                    const status = await recorder.getStatus();

                    if (!status?.canRecord) return;

                    const meter = status.metering ?? -160;

                    if (meter > -35) {
                        setIsSpeaking(true);

                        Animated.sequence([
                            Animated.timing(micPulse, {
                                toValue: 1.18,
                                duration: 180,
                                useNativeDriver: true,
                            }),
                            Animated.timing(micPulse, {
                                toValue: 1,
                                duration: 180,
                                useNativeDriver: true,
                            }),
                        ]).start();
                    } else {
                        setIsSpeaking(false);
                    }
                }, 220);
            } catch (error) {
                console.log("Mic monitor error:", error);
            }
        };

        const stopMicMonitoring = async () => {
            try {
                if (interval) clearInterval(interval);

                const status = await recorder.getStatus();
                if (status?.isRecording) {
                    await recorder.stop();
                }
            } catch (error) {
                console.log("Stop mic error:", error);
            }

            setIsSpeaking(false);
            micPulse.setValue(1);
        };

        if (callControlsEnabled && isMicOn) {
            startMicMonitoring();
        } else {
            stopMicMonitoring();
        }

        return () => {
            stopMicMonitoring();
        };
    }, [callControlsEnabled, isMicOn, hasMicPermission]);

    const sendMessage = () => {
        if (!message.trim()) return;

        setMessages((prev) => [...prev, message]);
        setMessage("");
    };

    const handleJoinClick = async (appointment) => {
        setSelectedDoctor(appointment);
        setCallControlsEnabled(true);
        setIsMicOn(false);
        setIsVideoOn(false);
        setShowCameraPreview(false);
        setIsSpeaking(false);

        Alert.alert(
            "بدء الاستشارة",
            `تم بدء الجلسة مع ${appointment.doctorName}`,
            [{ text: "حسناً" }]
        );
    };

    const handleToggleVideo = async () => {
        if (!callControlsEnabled) return;

        if (!isVideoOn) {
            const granted = await requestMediaPermissions();
            if (!granted) return;
        }

        setIsVideoOn((prev) => !prev);
        setShowCameraPreview((prev) => !prev);
    };

    const handleToggleMic = async () => {
        if (!callControlsEnabled) return;

        if (!isMicOn) {
            const granted = await requestMediaPermissions();
            if (!granted) return;
        }

        const nextState = !isMicOn;
        setIsMicOn(nextState);

        if (!nextState) {
            setIsSpeaking(false);
            micPulse.setValue(1);
        }
    };

    const handleEndCall = () => {
        if (!callControlsEnabled) return;

        Alert.alert(
            "إنهاء الاستشارة",
            `هل أنت متأكد من رغبتك في إنهاء المكالمة مع ${
                selectedDoctor?.doctorName || "الطبيب"
            }؟`,
            [
                {
                    text: "استمرار",
                    style: "cancel",
                },
                {
                    text: "إنهاء الآن",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const status = await recorder.getStatus();
                            if (status?.isRecording) {
                                await recorder.stop();
                            }
                        } catch (error) {
                            console.log(error);
                        }

                        setCallControlsEnabled(false);
                        setSelectedDoctor(null);
                        setIsVideoOn(false);
                        setShowCameraPreview(false);
                        setIsMicOn(true);
                        setIsSpeaking(false);
                        micPulse.setValue(1);
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f6f9ff" />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.backButtonText}>العودة للوحة التحكم</Text>
                        </TouchableOpacity>


                        <View style={styles.titleBox}>
                            <View style={styles.tag}>
                                <VideoIcon width={20} height={20} />
                                <Text style={styles.tagText}>العيادة الافتراضية</Text>
                            </View>

                            <Text style={styles.title}>الاستشارات عن بعد</Text>
                            <Text style={styles.subtitle}>
                                تواصل مع طبيبك من أي مكان وبكل خصوصية
                            </Text>
                        </View>

                        
                    </View>
                </View>

                <View style={styles.videoCard}>
                    <View style={styles.videoMain}>
                        <View style={styles.videoCenter}>
                            <View style={styles.avatarWrap}>
                                <UserBlueIcon width={54} height={54} />
                            </View>

                            <Text style={styles.videoWaitingText}>
                                {selectedDoctor
                                    ? `الجلسة مع ${selectedDoctor.doctorName}`
                                    : "بانتظار انضمام الدكتور..."}
                            </Text>

                            <Text style={styles.videoSubText}>
                                {selectedDoctor
                                    ? selectedDoctor.specialty
                                    : "سيظهر الاتصال هنا عند بدء المكالمة"}
                            </Text>
                        </View>

                        <View style={styles.selfView}>
                            {showCameraPreview && isVideoOn ? (
                                <CameraView
                                    style={styles.cameraPreview}
                                    facing={cameraFacing}
                                    mute={true}
                                />
                            ) : (
                                <View style={styles.selfVideoPlaceholder}>
                                    <UserIcon width={38} height={38} />
                                    <Text style={styles.selfLabel}>أنت</Text>
                                </View>
                            )}

                            {showCameraPreview && isVideoOn && (
                                <Text style={styles.selfLabel}>أنت</Text>
                            )}
                        </View>

                        <View style={styles.controlsBar}>
                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={[
                                    styles.controlButton,
                                    styles.controlButtonDanger,
                                    !callControlsEnabled && styles.controlButtonDisabled,
                                ]}
                                onPress={handleEndCall}
                                disabled={!callControlsEnabled}
                            >
                                <PhoneOffIcon width={20} height={20} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={[
                                    styles.controlButton,
                                    !isVideoOn && styles.controlButtonMuted,
                                    !callControlsEnabled && styles.controlButtonDisabled,
                                ]}
                                onPress={handleToggleVideo}
                                disabled={!callControlsEnabled}
                            >
                                {isVideoOn ? (
                                    <VideoWhiteIcon width={20} height={20} />
                                ) : (
                                    <VideoOffIcon width={20} height={20} />
                                )}
                            </TouchableOpacity>

                            <Animated.View
                                style={{
                                    transform: [{ scale: micPulse }],
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={[
                                        styles.controlButton,
                                        isSpeaking && isMicOn && styles.controlButtonSpeaking,
                                        !isMicOn && styles.controlButtonMuted,
                                        !callControlsEnabled && styles.controlButtonDisabled,
                                    ]}
                                    onPress={handleToggleMic}
                                    disabled={!callControlsEnabled}
                                >
                                    {isMicOn ? (
                                        <MicIcon width={20} height={20} />
                                    ) : (
                                        <MicOffIcon width={20} height={20} />
                                    )}
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </View>

                <View style={styles.sectionCard}>
                    <View style={styles.sectionHead}>
                        <CalendarIcon width={24} height={24} />
                        <Text style={styles.sectionTitle}>المواعيد القادمة</Text>
                    </View>

                    {appointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            onJoin={handleJoinClick}
                        />
                    ))}
                </View>

                <View style={styles.sectionCard}>
                    <View style={styles.sectionHead}>
                        <MessageIcon width={24} height={24} />
                        <Text style={styles.sectionTitle}>المحادثة المباشرة</Text>
                    </View>

                    <View style={styles.chatBox}>
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <View key={index} style={styles.messageBubble}>
                                    <Text style={styles.messageText}>{msg}</Text>
                                </View>
                            ))
                        ) : (
                            <View style={styles.chatPlaceholder}>
                                <MessageIcon width={42} height={42} />
                                <Text style={styles.chatPlaceholderText}>
                                    ابدأ المحادثة مع الطبيب هنا
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.chatInputRow}>
                        <TextInput
                            style={styles.chatInput}
                            value={message}
                            onChangeText={setMessage}
                            placeholder="اكتب رسالتك..."
                            placeholderTextColor="#9aa4b2"
                            textAlign="right"
                        />

                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.sendButton}
                            onPress={sendMessage}
                        >
                            <SendIcon width={22} height={22} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.sectionCard, styles.filesCard]}>
                    <View style={styles.sectionHead}>
                        <FileIcon width={24} height={24} />
                        <Text style={styles.sectionTitle}>تبادل الملفات</Text>
                    </View>

                    <View style={styles.fileItem}>
                        <View style={styles.fileItemRight}>
                            <View style={styles.fileIconWrap}>
                                <FileIcon width={22} height={22} />
                            </View>

                            <View style={styles.fileTextWrap}>
                                <Text style={styles.fileName}>نتائج المختبر.pdf</Text>
                                <Text style={styles.fileMeta}>اليوم · MB 2.4</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={0.85} style={styles.uploadButton}>
                        <Text style={styles.uploadButtonText}>رفع ملف جديد</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}