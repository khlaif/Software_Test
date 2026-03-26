import "./Hero.css";
import heroImg from "../../../../assets/heroimg.avif";
import lessIcon from "../../../../assets/chevron-left.svg";
import activityImg from "../../../../assets/activity.svg";
import sparkleImg from "../../../../assets/sparkle.svg";


export default function Hero() {
    return (
        <section className="hero" id="home">
        <div className="hero__container">

            <div className="hero__media">
            <div className="hero__imageWrap">
                <img className="hero__image" src={heroImg} alt="Healthcare" />

                <div className="hero__floatCard" aria-label="وقت الانتظار">
                <div className="hero__floatIcon">
                    <img src={activityImg} alt="Activity Icon" />
                </div>
                <div className="hero__floatText">
                    <div className="hero__floatSmall">وقت الانتظار</div>
                    <div className="hero__floatBig">-40% أقل</div>
                </div>
                </div>

            </div>
            </div>

            <div className="hero__content">
            <div className="hero__pill">
                <img src={sparkleImg} className="icon-img" alt="Sparkle Icon" />
                تقنيات الذكاء الاصطناعي 2026
            </div>
            <h1 className="hero__title">
                نقلة نوعية في 
                <br />
                <span className="text-gradient">الرعاية الصحية</span>
            </h1>

            <p className="hero__desc">
                نظام ذكي يختصر وقتك، ينظم مسارك الطبي، ويضمن لك تشخيصاً أدق بلمسة تكنولوجية عصرية.
            </p>

            <div className="hero__actions">
                <a className="hero__cta" href="#start">
                    ابدأ مسارك الآن
                    <img src={lessIcon} className="icon-img" alt="Less Icon" />
                </a>

                <div className="hero__socialProof">
                <div className="hero__avatars">
                    <span className="hero__avatar" />
                    <span className="hero__avatar" />
                    <span className="hero__avatar" />
                </div>
                <div className="hero__proofText">
                    <b>+5,000</b> مستخدم<br />يثقون بنظامنا
                </div>
                </div>
            </div>
            </div>

        </div>
        </section>
    );
}
