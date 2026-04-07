import { useState } from "react"
import burger_menu_icon from "../assets/images/burger_menu_icon.png"
import close_menu_icon from "../assets/images/close_icon.png"
import dropdown_arrow from "../assets/images/dropdown_arrow_down.png"
import Logo from "../components/Logo.jsx"

function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="relative flex justify-between items-center px-6 md:px-15 py-6 bg-white z-50">
            <button
                className="md:hidden z-60 relative pointer-events-auto mr-4"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
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

            <nav className={`fixed md:static top-0 left-0 w-3/4 h-screen md:h-auto bg-white shadow-2xl md:shadow-none flex flex-col md:flex-row items-center justify-center md:justify-end gap-8 md:gap-16 transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <div className="relative group cursor-pointer text-center">
                    <div className="md:hidden flex mb-15">
                        <Logo />
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-1">
                        <a href="/about" className="text-xl md:text-base text-[#333] font-medium hover:text-primary-purple">Par mums</a>
                        <img src={dropdown_arrow} alt="Par mums izvēlne" className="h-5 w-5 object-contain transition-transform duration-400 group-hover:rotate-180 hidden md:block" />
                    </div>
                    <div className="md:hidden flex flex-col gap-2 mt-2">
                        <a href="#" className="text-gray-500 text-sm">Komanda</a>
                        <a href="#" className="text-gray-500 text-sm">Mērķis</a>
                    </div>
                    <div className="hidden md:group-hover:block absolute bg-white min-w-35 shadow-lg py-2 rounded z-20">
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Komanda</a>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Mērķis</a>
                    </div>
                </div>

                <div className="relative group cursor-pointer text-center">
                    <div className="flex items-center justify-center md:justify-start gap-1">
                        <a href="/pricing" className="text-xl md:text-base text-[#333] font-medium hover:text-primary-purple">Maksas plāni</a>
                        <img src={dropdown_arrow} alt="Maksas plānu izvēlne" className="h-5 w-5 object-contain transition-transform duration-400 group-hover:rotate-180 hidden md:block" />
                    </div>
                    <div className="md:hidden flex flex-col gap-2 mt-2">
                        <a href="/pricing" className="text-gray-500 text-sm">Basic</a>
                        <a href="/pricing" className="text-gray-500 text-sm">Pro</a>
                    </div>
                    <div className="hidden md:group-hover:block absolute bg-white min-w-35 shadow-lg py-2 rounded z-20">
                        <a href="/pricing" className="block px-4 py-2 text-sm hover:bg-gray-100">Basic</a>
                        <a href="/pricing" className="block px-4 py-2 text-sm hover:bg-gray-100">Pro</a>
                    </div>
                </div>

                <a href="/functions" className="text-xl md:text-base text-[#333] font-medium hover:text-primary-purple">Funkcijas</a>

                <div className="relative group cursor-pointer text-center">
                    <div className="flex items-center justify-center md:justify-start gap-1">
                        <a href="/support" className="text-xl md:text-base text-[#333] font-medium hover:text-primary-purple">Atbalsts</a>
                        <img src={dropdown_arrow} alt="Atbalsta izvēlne" className="h-5 w-5 object-contain transition-transform duration-400 group-hover:rotate-180 hidden md:block" />
                    </div>
                    <div className="md:hidden flex flex-col gap-2 mt-2">
                        <a href="/support" className="text-gray-500 text-sm">Kontakti</a>
                        <a href="/support" className="text-gray-500 text-sm">Biežāk uzdotie jautājumi</a>
                    </div>
                    <div className="hidden md:group-hover:block absolute bg-white min-w-35 shadow-lg py-2 rounded z-20">
                        <a href="/support" className="block px-4 py-2 text-sm hover:bg-gray-100">Kontakti</a>
                        <a href="/support" className="block px-4 py-2 text-sm hover:bg-gray-100">BUJ</a>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
