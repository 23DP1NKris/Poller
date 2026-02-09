import hero_image from "../assets/images/hero_placeholder.png"

function HeroImage() {
    return (
        <div className="flex justify-center items-center w-full">
            <img
                src={hero_image}
                alt="Hero illustration"
                className="w-full max-w-125 h-auto object-contain rounded-3xl"
            />
        </div>
    )
}

export default HeroImage