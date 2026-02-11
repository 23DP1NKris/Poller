import WithBackgroundBtn from "./WithBackgroundBtn.jsx"
import TextUnderlineBtn from "./TextUnderlineBtn.jsx"
import {Link} from "react-router-dom"

function HeroText() {

    return (
        <div className="flex flex-col justify-center max-w-250">
            <h1 className="text-6xl leading-[1.1] font-normal mb-7 text-text-dark">
                Iepazīsti savu mērķauditoriju vieglāk un vienkāršāk.
            </h1>

            <p className="font-normal text-lg leading-[1.5] text-text-dark mb-9 max-w-150">
                Gūstiet skaidras atbildes un pieņemiet lēmumus, izmantojot vienkāršotu balsošas un vēlēšanu sistēmu.
            </p>

            <div className="flex items-center gap-8">
                <Link to="/register">
                    <WithBackgroundBtn
                        text="Reģistrēties"
                        color="bg-primary-purple"
                    />
                </Link>

                <Link to="/login">
                    <TextUnderlineBtn
                        text="Pieslēgties"
                    />
                </Link>
            </div>
        </div>
    )
}

export default HeroText