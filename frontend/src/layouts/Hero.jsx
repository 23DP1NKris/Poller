import '../assets/styles/Hero.css'
import RegisterBtn from "../components/RegisterBtn.jsx"
import HeroImage from "../components/HeroImage.jsx"
import HeroText from "../components/HeroText.jsx"
import LoginBtn from "../components/LoginBtn.jsx"

function Hero() {
    return (
        <main className="hero-section">
            <HeroImage />

            <div className="hero-content-wrapper">
                <HeroText />

                <div className="hero-buttons">
                    <RegisterBtn />
                    <LoginBtn />
                </div>
            </div>
        </main>
    )
}

export default Hero