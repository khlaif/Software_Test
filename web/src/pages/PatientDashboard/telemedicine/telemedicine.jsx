import "./telemedicine.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


//  icons 
import videoicon from "../../../assets/video_blue.svg";
import calendaricon from "../../../assets/calendar_blue.svg";
import usericn from "../../../assets/user-round.svg";
import userblue from "../../../assets/user_blue.svg"
import clockicon from "../../../assets/clock.svg";
import fileicon from "../../../assets/file-text_blue.svg";
import sendicon from "../../../assets/send.svg";
import messageicon from "../../../assets/message-square.svg";
import videowhiteicon from "../../../assets/video_white.svg";
import phoneicon from "../../../assets/phone-call.svg";
import circleXicon from "../../../assets/circle-x.svg";
import micicon from "../../../assets/mic.svg";
import micofficon from "../../../assets/mic-off.svg";
import videoofficon from "../../../assets/video-off.svg"
import phoneoff from "../../../assets/phone-off.svg"



// Appointment card component

function AppointmentCard({ appointment, onJoin }) {
    return (
        <div
            className={`tele__card ${
                appointment.isActive
                    ? "tele__card--active"
                    : "tele__card--scheduled"
            }`}
        >
            <div className="tele__cardTop">
                <div className="tele__doctorWrap">
                    <div className="tele__doctorIconBox">
                        <img src={usericn} alt="Doctor Icon" />
                    </div>

                    <div className="tele__doctorInfo">
                        <h4>{appointment.doctorName}</h4>
                        <span>{appointment.specialty}</span>
                    </div>

                    <div
                        className={`tele__status ${
                            appointment.isActive ? "green pulse-status" : "gray"
                        }`}
                    >
                        {appointment.status}
                    </div>
                </div>
            </div>

            <div className="tele__time">
                <span>
                    <img src={clockicon} alt="Clock Icon" />
                    {appointment.time}
                </span>

                <span>
                    <img src={calendaricon} alt="Calendar Icon" />
                    {appointment.day}
                </span>
            </div>

            {appointment.isActive && (
                <button
                    className="tele__join"
                    onClick={() => onJoin(appointment)}
                >
                    انضم للمكالمة الآن
                </button>
            )}
        </div>
    );
}



// Main component

export default function Telemedicine() {

    const navigate = useNavigate();
    //  chat state 
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    //  modals state 
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showEndCallModal, setShowEndCallModal] = useState(false);

    //  selected doctor 
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    //  camera / local video 
    const [localStream, setLocalStream] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);
    const localVideoRef = useRef(null);
    const [isVideoOn, setIsVideoOn] = useState(false);


    //  microphone / speaking 
    const [isMicOn, setIsMicOn] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animationFrameRef = useRef(null);

    const [callControlsEnabled, setCallControlsEnabled] = useState(false);

    
    // Bind local stream to video
    
    useEffect(() => {
        if (
            localVideoRef.current &&
            localStream &&
            localStream.getVideoTracks().length > 0
        ) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    
    // Detect speaking voice level
    
    useEffect(() => {
        if (!localStream || !isMicOn) {
            setIsSpeaking(false);
            return;
        }

        const audioTracks = localStream.getAudioTracks();
        if (!audioTracks.length) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;

        const source = audioContext.createMediaStreamSource(localStream);
        source.connect(analyser);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        sourceRef.current = source;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const detectVoice = () => {
            analyser.getByteFrequencyData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }

            const average = sum / dataArray.length;

            // threshold for speaking effect
            setIsSpeaking(average > 12);

            animationFrameRef.current = requestAnimationFrame(detectVoice);
        };

        detectVoice();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            if (sourceRef.current) {
                sourceRef.current.disconnect();
            }

            if (
                audioContextRef.current &&
                audioContextRef.current.state !== "closed"
            ) {
                audioContextRef.current.close();
            }
        };
    }, [localStream, isMicOn]);

    
    // Stop local camera / mic stream
    
    const stopLocalStream = () => {
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
        }

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        if (sourceRef.current) {
            sourceRef.current.disconnect();
        }

        if (
            audioContextRef.current &&
            audioContextRef.current.state !== "closed"
        ) {
            audioContextRef.current.close();
        }

        setCameraOn(false);
        setIsVideoOn(false);
        setIsMicOn(true);
        setIsSpeaking(false);
        setCallControlsEnabled(false);
    };

    
    // Chat handlers
    
    const sendMessage = () => {
        if (!message.trim()) return;

        setMessages((prev) => [...prev, message]);
        setMessage("");
    };

    
    // Appointment / join handlers
    
    const handleJoinClick = (appointment) => {
        setSelectedDoctor(appointment);
        setShowJoinModal(true);
    };

    const handleCloseJoinModal = () => {
        setShowJoinModal(false);
    };

    
    // Camera / mic permission
    
    const handleAllowAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true,
            });

            setLocalStream(stream);
            setCameraOn(true);
            setIsMicOn(true);
            setCallControlsEnabled(true);
            setShowJoinModal(false);
        } catch (error) {
            console.error("Permission denied:", error);
            alert("لم يتم السماح بالوصول إلى الكاميرا والميكروفون");
        }
    };

    // Toggle video on/off

    const handleToggleVideo = async () => {
        try {
            if (!localStream) return;

            const currentVideoTracks = localStream.getVideoTracks();

            if (currentVideoTracks.length > 0 && isVideoOn) {
                currentVideoTracks.forEach((track) => {
                    track.stop();
                    localStream.removeTrack(track);
                });

                setLocalStream(new MediaStream(localStream.getTracks()));
                setIsVideoOn(false);
                setCameraOn(false);
                return;
            }

            const videoStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });

            const videoTrack = videoStream.getVideoTracks()[0];
            localStream.addTrack(videoTrack);

            setLocalStream(new MediaStream(localStream.getTracks()));
            setIsVideoOn(true);
            setCameraOn(true);
        } catch (error) {
            console.error("Video permission denied:", error);
            alert("لم يتم السماح بالوصول إلى الكاميرا");
        }
    };

    
    // Toggle microphone
    
    const handleToggleMic = () => {
        if (!localStream) return;

        const audioTracks = localStream.getAudioTracks();
        if (!audioTracks.length) return;

        const nextMicState = !isMicOn;

        audioTracks.forEach((track) => {
            track.enabled = nextMicState;
        });

        setIsMicOn(nextMicState);

        if (!nextMicState) {
            setIsSpeaking(false);
        }
    };

    
    // End call handlers
    
    const handleOpenEndCallModal = () => {
        setShowEndCallModal(true);
    };

    const handleCloseEndCallModal = () => {
        setShowEndCallModal(false);
    };

    const handleConfirmEndCall = () => {
        stopLocalStream();
        setCallControlsEnabled(false);
        setShowEndCallModal(false);
        console.log("Call ended");
    };

    
    // Appointments data
    
    const appointments = [
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
    ];

    return (
        <div className="tele">
            <div className="tele__header">
                <div className="tele__titleBox">
                    <span className="tele__tag">
                        <img src={videoicon} alt="Video Icon" />
                        العيادة الافتراضية
                    </span>

                    <h1>الاستشارات عن بعد</h1>
                    <p>تواصل مع طبيبك من أي مكان وبكل خصوصية</p>
                </div>

                <button className="tele__back" onClick={() => navigate("/dashboard")}>
                    العودة لوحة التحكم
                </button>
            </div>

            <div className="tele__grid">
                <div className="tele__video">
                    <div className="tele__videoCenter">
                        <div className="tele__avatar tele__avatar_pulse">
                            <img src={userblue} alt="User" />
                        </div>
                        <h3>بانتظار انضمام الدكتور...</h3>
                    </div>

                    <div className="tele__controls">
                        <button
                            className="ctrl ctrl--danger"
                            onClick={handleOpenEndCallModal}
                            disabled={!callControlsEnabled}
                        >
                            <img src={phoneoff} alt="End Call" />
                        </button>

                        <button
                            className={`ctrl ${!isVideoOn ? "ctrl--muted" : ""}`}
                            onClick={handleToggleVideo}
                            disabled={!callControlsEnabled}
                        >
                            <img
                                src={isVideoOn ? videowhiteicon : videoofficon}
                                alt={isVideoOn ? "Video On" : "Video Off"}
                            />
                        </button>

                        <button
                            className={`ctrl ${
                                isSpeaking && isMicOn ? "ctrl--speaking" : ""
                            } ${!isMicOn ? "ctrl--muted" : ""}`}
                            onClick={handleToggleMic}
                            disabled={!callControlsEnabled}
                        >
                            <img
                                src={isMicOn ? micicon : micofficon}
                                alt={isMicOn ? "Microphone On" : "Microphone Off"}
                            />
                        </button>
                    </div>

                    <div className="tele__selfView">
                        {localStream ? (
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className="tele__selfVideo"
                            />
                        ) : (
                            <>
                                <div className="tele__selfAvatar">
                                    <img src={usericn} alt="User" />
                                </div>
                                <span className="tele__selfLabel">أنت</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="tele__appointments">
                    <h3>
                        <img src={calendaricon} alt="Calendar Icon" />
                        المواعيد القادمة
                    </h3>

                    {appointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            onJoin={handleJoinClick}
                        />
                    ))}
                </div>
            </div>

            <div className="tele__bottom">
                <div className="tele__chat">
                    <div className="sectionHead">
                        <img src={messageicon} alt="chat" />
                        <h3>المحادثة المباشرة</h3>
                    </div>

                    <div className="chatBox">
                        {messages.length > 0 ? (
                            messages.map((msg, i) => (
                                <div key={i} className="msg">
                                    {msg}
                                </div>
                            ))
                        ) : (
                            <div className="chatPlaceholder">
                                <img src={messageicon} alt="chat placeholder" />
                                <p>ابدأ المحادثة مع الطبيب هنا</p>
                            </div>
                        )}
                    </div>

                    <div className="chatInput">
                        <button onClick={sendMessage} className="sendBtn">
                            <img src={sendicon} alt="send" />
                        </button>

                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="اكتب رسالتك..."
                        />
                    </div>
                </div>

                <div className="tele__files">
                    <div className="sectionHead">
                        <img src={fileicon} alt="files" />
                        <h3>تبادل الملفات</h3>
                    </div>

                    <div className="fileCard">
                        <div className="fileCard__icon">
                            <img src={fileicon} alt="file" />
                        </div>

                        <div className="fileCard__content">
                            <h4>نتائج المختبر.pdf</h4>
                            <p>اليوم · MB 2.4</p>
                        </div>

                        <div className="fileCard__arrow"></div>
                    </div>

                    <button className="uploadBtn">رفع ملف جديد</button>
                </div>
            </div>

            {showJoinModal && selectedDoctor && (
                <div className="teleModal">
                    <div className="teleModal__card">
                        <button
                            className="teleModal__close"
                            onClick={handleCloseJoinModal}
                        >
                            ×
                        </button>

                        <div className="teleModal__iconWrap">
                            <img
                                src={phoneicon}
                                alt="Phone"
                                className="teleModal__icon"
                            />
                        </div>

                        <h2 className="teleModal__title">جاري الاتصال...</h2>

                        <p className="teleModal__text">
                            يرجى السماح للنظام بالوصول إلى الكاميرا والميكروفون
                            <br />
                            لبدء الاستشارة مع {selectedDoctor.doctorName}
                            <br />
                            <span className="teleModal__spec">
                                {selectedDoctor.specialty}
                            </span>
                        </p>

                        <button
                            className="teleModal__allow"
                            onClick={handleAllowAccess}
                        >
                            سماح بالوصول
                        </button>
                    </div>
                </div>
            )}

            {showEndCallModal && (
                <div className="teleModal">
                    <div className="teleModal__card teleModal__card--end">
                        <button
                            className="teleModal__close"
                            onClick={handleCloseEndCallModal}
                        >
                            ×
                        </button>

                        <div className="teleModal__iconWrap teleModal__iconWrap--danger">
                            <img
                                src={circleXicon}
                                alt="End Call"
                                className="teleModal__icon"
                            />
                        </div>

                        <h2 className="teleModal__title">إنهاء الاستشارة</h2>

                        <p className="teleModal__text">
                            هل أنت متأكد من رغبتك في إنهاء المكالمة مع{" "}
                            {selectedDoctor?.doctorName || "الطبيب"}؟
                            <br />
                            سيتم حفظ ملخص الجلسة في سجلك.
                        </p>

                        <div className="teleModal__actions">
                            <button
                                className="teleModal__endBtn"
                                onClick={handleConfirmEndCall}
                            >
                                إنهاء الآن
                            </button>

                            <button
                                className="teleModal__continueBtn"
                                onClick={handleCloseEndCallModal}
                            >
                                استمرار
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}