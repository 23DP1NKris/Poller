import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import burger_menu_icon from "../assets/images/burger_menu_icon.png"
import close_menu_icon from "../assets/images/close_icon.png"
import dropdown_arrow from "../assets/images/dropdown_arrow_down.png"
import Logo from "../components/Logo.jsx"
import UserPreview from "../components/UserPreview.jsx"

function GuestHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth()

    const initial = user?.username ? user.username.charAt(0).toUpperCase() : ""

    return (
        <header className="relative flex justify-between items-center px-6 md:px-15 py-6 bg-white z-50">
            <button
                className="md:hidden z-60 relative pointer-events-auto mr-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img
                    src={isOpen ? close_menu_icon : burger_menu_icon}
                    alt={isOpen ? "Aizvērt izvēlni" : "Atvērt izvēlni"}
                    className="w-8 h-8 object-contain transition-all duration-300"
                />
            </button>

            <Logo />

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm md:hidden z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <nav className={`fixed md:static top-0 left-0 w-3/4 h-screen md:h-auto bg-white shadow-2xl md:shadow-none flex flex-col md:flex-row items-center justify-between md:justify-end gap-8 md:gap-16 transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <div className="md:hidden pt-10">
                    <Logo />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 flex-1 md:flex-none justify-center">

                    <div className="relative group cursor-pointer text-center">
                        <div className="flex items-center justify-center md:justify-start gap-1">
                            <a href="/about" className="text-2xl md:text-base text-gray-800 font-medium hover:text-primary-purple">Par mums</a>
                            <img src={dropdown_arrow} alt="Par mums" className="h-5 w-5 object-contain transition-transform duration-400 group-hover:rotate-180 hidden md:block" />
                        </div>
                        <div className="md:hidden flex flex-col gap-2 mt-2">
                            <a href="#" className="text-gray-500 text-base">Komanda</a>
                            <a href="#" className="text-gray-500 text-base">Mērķis</a>
                        </div>
                        <div className="hidden md:group-hover:block absolute bg-white min-w-35 shadow-lg py-2 rounded z-20 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0">
                            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Komanda</a>
                            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Mērķis</a>
                        </div>
                    </div>

                    <div className="relative group cursor-pointer text-center">
                        <div className="flex items-center justify-center md:justify-start gap-1">
                            <a href="/pricing" className="text-2xl md:text-base text-gray-800 font-medium hover:text-primary-purple">Maksas plāni</a>
                            <img src={dropdown_arrow} alt="Maksas plāni" className="h-5 w-5 object-contain transition-transform duration-400 group-hover:rotate-180 hidden md:block" />
                        </div>
                        <div className="md:hidden flex flex-col gap-2 mt-2">
                            <a href="/pricing" className="text-gray-500 text-base">Basic</a>
                            <a href="/pricing" className="text-gray-500 text-base">Pro</a>
                        </div>
                        <div className="hidden md:group-hover:block absolute bg-white min-w-35 shadow-lg py-2 rounded z-20 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0">
                            <a href="/pricing" className="block px-4 py-2 text-sm hover:bg-gray-100">Basic</a>
                            <a href="/pricing" className="block px-4 py-2 text-sm hover:bg-gray-100">Pro</a>
                        </div>
                    </div>

                    <a href="/functions" className="text-2xl md:text-base text-gray-800 font-medium hover:text-primary-purple transition-colors">Funkcijas</a>

                    <div className="relative group cursor-pointer text-center">
                        <div className="flex items-center justify-center md:justify-start gap-1">
                            <a href="/support" className="text-2xl md:text-base text-gray-800 font-medium hover:text-primary-purple">Atbalsts</a>
                            <img src={dropdown_arrow} alt="Atbalsts" className="h-5 w-5 object-contain transition-transform duration-400 group-hover:rotate-180 hidden md:block" />
                        </div>
                        <div className="md:hidden flex flex-col gap-2 mt-2">
                            <a href="/support" className="text-gray-500">Kontakti</a>
                            <a href="/support" className="text-gray-500">Biežāk uzdotie jautājumi</a>
                        </div>
                        <div className="hidden md:group-hover:block absolute bg-white min-w-35 shadow-lg py-2 rounded z-20 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0">
                            <a href="/support" className="block px-4 py-2 text-sm hover:bg-gray-100">Kontakti</a>
                            <a href="/support" className="block px-4 py-2 text-sm hover:bg-gray-100">BUJ</a>
                        </div>
                    </div>
                </div>

                {user && (
                    <div className="md:hidden w-full flex justify-center pb-10 px-6">
                        <UserPreview />
                    </div>
                )}
            </nav>

            {user && (
                <div className="hidden md:block border-l border-gray-200 pl-4">
                    <Link to="/settings" className="group block">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-lg shadow-inner transition-transform group-hover:scale-105">
                            {initial}
                        </div>
                    </Link>
                </div>
            )}
        </header>
    )
}

export default GuestHeader