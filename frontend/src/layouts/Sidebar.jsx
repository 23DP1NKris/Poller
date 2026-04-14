import React from "react"
import home_icon from "../assets/images/home_icon.png"
import active_polls_icon from "../assets/images/active_polls.png"
import results_icon from "../assets/images/bar_chart_icon.png"
import settings_icon from "../assets/images/user_settings_icon.png"
import support_icon from "../assets/images/support_icon.png"
import logout_icon from "../assets/images/logout.png"
import Logo from "../components/Logo.jsx"
import axios from 'axios'
import {Link} from "react-router-dom";
import UserPreview from "../components/UserPreview.jsx";

function Sidebar() {
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
        <aside className="flex flex-col w-64 h-screen bg-background-light border-r border-gray-200">

            <div className="flex items-center justify-center h-24 px-6">
                <Logo />
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link
                    to="/home"
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${isActive("/home") ? "bg-primary/10 text-primary border-r-5 border-primary" : "text-accent-gray hover:bg-gray-200"}`}
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
                    to="/results"
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${isActive("/results") ? "bg-primary/10 text-primary border-r-5 border-primary" : "text-accent-gray hover:bg-gray-200"}`}
                >
                    <img
                        src={results_icon}
                        alt="Rezultāti"
                        className={`w-6 h-6 object-contain transition-all duration-200 ${isActive("/results") ? "" : "opacity-75"}`}
                        style={isActive("/results") ? { filter: "invert(11%) sepia(68%) saturate(4529%) hue-rotate(298deg) brightness(85%) contrast(106%)" } : {}}
                    />
                    <span className="font-semibold tracking-wide text-sm">Rezultāti</span>
                </Link>

                <Link
                    to="/active-polls"
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${isActive("/active-polls") ? "bg-primary/10 text-primary border-r-5 border-primary" : "text-accent-gray hover:bg-gray-200"}`}
                >
                    <img
                        src={active_polls_icon}
                        alt="Aktīvās aptaujas"
                        className={`w-6 h-6 object-contain transition-all duration-200 ${isActive("/active-polls") ? "" : "opacity-75"}`}
                        style={isActive("/active-polls") ? { filter: "invert(11%) sepia(68%) saturate(4529%) hue-rotate(298deg) brightness(85%) contrast(106%)" } : {}}
                    />
                    <span className="font-semibold tracking-wide text-sm">Aktīvās aptaujas</span>
                </Link>

                <Link
                    to="/settings"
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${isActive("/settings") ? "bg-primary/10 text-primary border-r-5 border-primary" : "text-accent-gray hover:bg-gray-200"}`}
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

            <div className="mb-4">
                <UserPreview />
            </div>

            <div className="p-3 border-t border-gray-200 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-accent-gray hover:bg-gray-200 transition-all duration-200"
                >
                    <img src={logout_icon} alt="Iziet" className="w-6 h-6 object-contain opacity-75" />
                    <span className="font-semibold tracking-wide text-sm">Iziet</span>
                </button>
            </div>

        </aside>
    )
}

export default Sidebar
