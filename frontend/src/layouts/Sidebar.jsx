import home_icon from "../assets/images/home_icon.png"
import active_polls_icon from "../assets/images/active_polls.png"
import settings_icon from "../assets/images/user_settings_icon.png"
import support_icon from "../assets/images/support_icon.png"
import logout_icon from "../assets/images/logout.png"
import close_menu_icon from "../assets/images/close_icon.png"
import Logo from "../components/Logo.jsx"
import axios from 'axios'
import { Link } from "react-router-dom"
import UserPreview from "../components/UserPreview.jsx"

function Sidebar({ isOpen, setIsOpen }) {
    const handleLogout = async () => {
        const token = localStorage.getItem('token')
        try {
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            })
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
    }

    const path = window.location.pathname
    const isActive = (href) => path === href

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed top-0 left-0 h-screen w-64 bg-background-light border-r border-gray-200 z-51 transition-transform duration-300 ease-in-out flex flex-col
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0
            `}>
                <div className="flex flex-col px-6 pt-6 lg:pt-10 pb-4">
                    <div className="flex justify-end lg:hidden mb-4">
                        <button
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <img src={close_menu_icon} className="w-6 h-6" alt="Aizvērt" />
                        </button>
                    </div>

               <div className="flex items-center justify-center lg:h-12">
                        <Logo />
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    <Link
                        to="/home"
                        onClick={() => setIsOpen(false)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${isActive("/home") ? "bg-primary/10 text-primary border-r-4 border-primary" : "text-accent-gray hover:bg-gray-200"}`}
                    >
                        <img
                            src={home_icon}
                            alt="Sākums"
                            className={`w-6 h-6 object-contain transition-all duration-200 ${isActive("/home") ? "" : "opacity-75"}`}
                            style={isActive("/home") ? { filter: "invert(11%) sepia(68%) saturate(4529%) hue-rotate(298deg) brightness(85%) contrast(106%)" } : {}}
                        />
                        <span className="font-semibold tracking-wide text-sm">Sākums</span>
                    </Link>

                    <Link
                        to="/polls"
                        onClick={() => setIsOpen(false)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${isActive("/polls") ? "bg-primary/10 text-primary border-r-4 border-primary" : "text-accent-gray hover:bg-gray-200"}`}
                    >
                        <img
                            src={active_polls_icon}
                            alt="Aktīvās aptaujas"
                            className={`w-6 h-6 object-contain transition-all duration-200 ${isActive("/polls") ? "" : "opacity-75"}`}
                            style={isActive("/polls") ? { filter: "invert(11%) sepia(68%) saturate(4529%) hue-rotate(298deg) brightness(85%) contrast(106%)" } : {}}
                        />
                        <span className="font-semibold tracking-wide text-sm">Manas aptaujas</span>
                    </Link>

                    <Link
                        to="/settings"
                        onClick={() => setIsOpen(false)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${isActive("/settings") ? "bg-primary/10 text-primary border-r-4 border-primary" : "text-accent-gray hover:bg-gray-200"}`}
                    >
                        <img
                            src={settings_icon}
                            alt="Iestatījumi"
                            className={`w-6 h-6 object-contain transition-all duration-200 ${isActive("/settings") ? "" : "opacity-75"}`}
                            style={isActive("/settings") ? { filter: "invert(11%) sepia(68%) saturate(4529%) hue-rotate(298deg) brightness(85%) contrast(106%)" } : {}}
                        />
                        <span className="font-semibold tracking-wide text-sm">Iestatījumi</span>
                    </Link>

                    <Link
                        to="/support"
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out text-accent-gray hover:bg-gray-200"
                    >
                        <img
                            src={support_icon}
                            alt="Atbalsts"
                            className="w-6 h-6 object-contain transition-all duration-200 opacity-75"
                        />
                        <span className="font-semibold tracking-wide text-sm">Atbalsts</span>
                    </Link>
                </nav>

                <div className="px-4 mb-4">
                    <UserPreview />
                </div>

                <div className="p-3 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-accent-gray hover:bg-gray-200 transition-all duration-200"
                    >
                        <img src={logout_icon} alt="Iziet" className="w-6 h-6 object-contain opacity-75" />
                        <span className="font-semibold tracking-wide text-sm">Iziet</span>
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar