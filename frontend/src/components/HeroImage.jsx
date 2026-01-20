import hero_image from "../assets/images/hero_placeholder.png"

function HeroImage() {
    return (
        <div className="hero-image-container">
            <img
                src={hero_image}
                alt="Hero illustration"
                className="hero-img"
            />
        </div>
    )
}

export default HeroImage