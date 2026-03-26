import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clockicon from "../../../assets/clock_w.svg";
import videoicon from "../../../assets/video white.svg";
import videoofficon from "../../../assets/video-off.svg";
import micicon from "../../../assets/mic.svg";
import micofficon from "../../../assets/mic-off.svg";
import endcallicon from "../../../assets/phone-off.svg";
import shareicon from "../../../assets/share-w.svg";

const ConsultationSession = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const consultation = location.state?.consultation;

    const [isMicOn, setIsMicOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const doctorVideoRef = useRef(null);
    const sharedScreenRef = useRef(null);

    const audioStreamRef = useRef(null);
    const cameraStreamRef = useRef(null);
    const screenStreamRef = useRef(null);

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        initMic();
        return () => {
            cleanupAll();
        };
    }, []);

    useEffect(() => {
        attachDoctorVideoStream();
    }, [isVideoOn]);

    useEffect(() => {
        attachScreenStream();
    }, [isScreenSharing]);

    const attachDoctorVideoStream = async () => {
        const videoEl = doctorVideoRef.current;
        const stream = cameraStreamRef.current;

        if (!videoEl || !stream || !isVideoOn) return;

        try {
            videoEl.srcObject = stream;
            videoEl.onloadedmetadata = async () => {
                try {
                    await videoEl.play();
                } catch (err) {
                    console.error("فشل تشغيل فيديو الكاميرا:", err);
                }
            };
        } catch (error) {
            console.error("خطأ في ربط فيديو الكاميرا:", error);
        }
    };

    const attachScreenStream = async () => {
        const videoEl = sharedScreenRef.current;
        const stream = screenStreamRef.current;

        if (!videoEl || !stream || !isScreenSharing) return;

        try {
            videoEl.srcObject = stream;
            videoEl.onloadedmetadata = async () => {
                try {
                    await videoEl.play();
                } catch (err) {
                    console.error("فشل تشغيل فيديو مشاركة الشاشة:", err);
                }
            };
        } catch (error) {
            console.error("خطأ في ربط مشاركة الشاشة:", error);
        }
    };

    const initMic = async () => {
        try {
            if (audioStreamRef.current) return;

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                },
                video: false,
            });

            audioStreamRef.current = stream;
            setupAudioAnalyzer(stream);
        } catch (error) {
            console.error("فشل تشغيل المايك:", error);
        }
    };

    const setupAudioAnalyzer = async (stream) => {
        try {
            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;

            const audioContext = new AudioContextClass();

            if (audioContext.state === "suspended") {
                await audioContext.resume();
            }

            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);

            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.85;

            source.connect(analyser);

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;

            detectVoice();
        } catch (error) {
            console.error("فشل إعداد تحليل الصوت:", error);
        }
    };

    const detectVoice = () => {
        if (!analyserRef.current) return;

        const analyser = analyserRef.current;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const tick = () => {
            analyser.getByteFrequencyData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }

            const avg = sum / dataArray.length;
            setIsSpeaking(isMicOn && avg > 6);

            animationFrameRef.current = requestAnimationFrame(tick);
        };

        tick();
    };

    const toggleMic = () => {
        if (!audioStreamRef.current) return;

        const next = !isMicOn;

        audioStreamRef.current.getAudioTracks().forEach((track) => {
            track.enabled = next;
        });

        setIsMicOn(next);

        if (!next) {
            setIsSpeaking(false);
        }
    };

    const startCamera = async () => {
        try {
            if (cameraStreamRef.current) return true;

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user",
                },
                audio: false,
            });

            cameraStreamRef.current = stream;
            return true;
        } catch (error) {
            console.error("فشل تشغيل الكاميرا:", error);
            return false;
        }
    };

    const stopCamera = () => {
        if (cameraStreamRef.current) {
            cameraStreamRef.current.getTracks().forEach((track) => track.stop());
            cameraStreamRef.current = null;
        }

        if (doctorVideoRef.current) {
            doctorVideoRef.current.pause();
            doctorVideoRef.current.srcObject = null;
        }
    };

    const toggleVideo = async () => {
        if (!isVideoOn) {
            const started = await startCamera();
            if (started) {
                setIsVideoOn(true);
            }
        } else {
            stopCamera();
            setIsVideoOn(false);
        }
    };

    const startScreenShare = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always",
                },
                audio: false,
            });

            screenStreamRef.current = stream;

            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.onended = () => {
                    stopScreenShare();
                };
            }

            return true;
        } catch (error) {
            console.error("فشل بدء مشاركة الشاشة:", error);
            return false;
        }
    };

    const stopScreenShare = () => {
        if (screenStreamRef.current) {
            screenStreamRef.current.getTracks().forEach((track) => track.stop());
            screenStreamRef.current = null;
        }

        if (sharedScreenRef.current) {
            sharedScreenRef.current.pause();
            sharedScreenRef.current.srcObject = null;
        }

        setIsScreenSharing(false);
    };

    const handleScreenShare = async () => {
        if (!isScreenSharing) {
            const started = await startScreenShare();
            if (started) {
                setIsScreenSharing(true);
            }
        } else {
            stopScreenShare();
        }
    };

    const cleanupAll = () => {
        stopCamera();
        stopScreenShare();

        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach((track) => track.stop());
            audioStreamRef.current = null;
        }

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    };

    const handleEndCall = () => {
        cleanupAll();
        navigate("/doctor");
    };

    if (!consultation) {
        return (
            <div className="consultation-session-page" dir="rtl">
                <div className="session-container">
                    <h2>لا توجد بيانات استشارة</h2>
                    <button onClick={() => navigate("/doctor-dashboard")}>
                        العودة
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="consultation-session-page" dir="rtl">
            <div className="session-container">
                <div className="session-video-panel">
                    <div className="session-top-badges">
                        <span className="session-badge session-time-badge">
                            <img src={clockicon} alt="clock" />
                            00:45
                        </span>
                        <span className="session-badge session-active-badge">نشط</span>
                    </div>

                    {isScreenSharing ? (
                        <video
                            ref={sharedScreenRef}
                            autoPlay
                            playsInline
                            muted
                            className="session-shared-screen-full"
                        />
                    ) : (
                        <div className="session-main-display">
                            <div className="session-patient-center">
                                <div className="session-patient-avatar animated">
                                    <img src={videoicon} alt="" />
                                </div>
                                <h2>{consultation.patientName}</h2>
                                <p>المريض</p>
                            </div>
                        </div>
                    )}

                    <div className="session-doctor-box">
                        {isVideoOn ? (
                            <video
                                ref={doctorVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className="session-doctor-video-box"
                            />
                        ) : (
                            <>
                                <div className="session-doctor-avatar">
                                    <img
                                        src={isMicOn ? micicon : micofficon}
                                        alt={isMicOn ? "mic on" : "mic off"}
                                    />
                                </div>
                                <span>أنت</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="session-details-card">
                    <div className="session-details-right">
                        <p className="session-details-label">جلسة استشارة طبية</p>
                        <h3>استشارة مع المريض {consultation.patientName}</h3>
                        <p className="session-details-topic">
                            الموضوع: {consultation.topic}
                        </p>
                    </div>

                    <div className="session-details-left">
                        <span className="session-status-text">الحالة</span>
                        <span className="session-status-pill">متصل</span>
                    </div>
                </div>

                <div className="session-controls">
                    <button
                        className={`session-control-btn session-mic-btn ${
                            isMicOn && isSpeaking ? "speaking" : ""
                        }`}
                        onClick={toggleMic}
                    >
                        <img
                            src={isMicOn ? micicon : micofficon}
                            alt={isMicOn ? "mic on" : "mic off"}
                        />
                    </button>

                    <button className="session-control-btn" onClick={toggleVideo}>
                        <img
                            src={isVideoOn ? videoicon : videoofficon}
                            alt={isVideoOn ? "video on" : "video off"}
                        />
                    </button>

                    <button className="session-share-btn" onClick={handleScreenShare}>
                        <img src={shareicon} alt="" />
                        {isScreenSharing ? "إيقاف المشاركة" : "مشاركة الشاشة"}
                    </button>

                    <button
                        className="session-control-btn session-end-btn"
                        onClick={handleEndCall}
                    >
                        <img src={endcallicon} alt="end call" />
                    </button>
                </div>

                <div className="session-tips">
                    <span>استخدم مشاركة الشاشة لعرض النتائج</span>
                    <span>تأكد من جودة الصوت قبل البدء</span>
                </div>
            </div>
        </div>
    );
};

export default ConsultationSession;