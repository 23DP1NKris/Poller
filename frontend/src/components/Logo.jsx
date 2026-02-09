import logo from '../assets/images/poller_logo_text.png'

function Logo() {
    return (
        <div className="flex items-center">
            <img
                src={logo}
                alt="Poller logo"
                className="h-16 w-auto object-contain"
            />
        </div>
    )
}

export default Logo