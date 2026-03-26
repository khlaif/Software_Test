import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Hero from "./sections/Hero/Hero";
import FeaturesSection from "./sections/FeaturesSection";
import StatsSection from "./sections/StatsSection";
import Footer from "../../components/Footer/Footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <StatsSection />
            <FeaturesSection />
            <Footer />
            
        </>
    );
}