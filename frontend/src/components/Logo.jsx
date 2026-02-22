import logo from '../assets/images/poller_logo_text.svg'
import {Link} from "react-router-dom";

function Logo() {
    return (
        <Link to="/">
            <div className="flex items-center">
                <img
                src={logo}
                alt="Poller logo"
                className="h-16 w-auto object-contain"
                />
            </div>
        </Link>

    )
}

export default Logo