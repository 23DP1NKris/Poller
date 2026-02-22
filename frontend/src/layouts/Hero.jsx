import HeroText from "../components/HeroText.jsx"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx";
import {Link} from "react-router-dom";
import NoBackgroundBtn from "../components/NoBackgroundBtn.jsx";

function Hero() {
    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-24 text-center">
                <HeroText />
            <div className="flex sm:flex-row items-center justify-center gap-5 pt-8">
                <Link to="/register">
                    <WithBackgroundBtn text="Reģistrēties"/>
                </Link>

                <Link to="/login">
                    <NoBackgroundBtn text="Pieslēgties"/>
                </Link>
            </div>
        </div>
    )
}

export default Hero