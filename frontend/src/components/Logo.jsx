import logo from '../assets/images/poller_logo_text.png'
import '../assets/styles/Logo.css'

function Logo() {
    return (
        <div className="logo-wrapper">
            <img src={logo} alt="poller logo" className="logo-img" />
        </div>
    )
}

export default Logo