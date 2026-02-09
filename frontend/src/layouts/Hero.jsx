import HeroImage from "../components/HeroImage.jsx"
import HeroText from "../components/HeroText.jsx"

function Hero() {
    return (
        <main className="flex flex-col md:flex-row justify-center items-center py-10 gap-20 lg:gap-30 max-w-350 mx-auto min-h-[70vh] px-8">
            <div className="w-full md:w-auto">
                <HeroImage />
            </div>

            <div className="flex flex-col justify-center max-w-190">
                <HeroText />
            </div>
        </main>
    )
}

export default Hero