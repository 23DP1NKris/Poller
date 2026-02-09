import NavItem from "./NavItem.jsx"
import Logo from "./Logo.jsx"

const navItems = [
    {label: "Par mums", href: "/about", dropdown: ["Komanda", "Mērķis"]},
    {label: "Maksas plāni", href: "/pricing", dropdown: ["Basic", "Pro"]},
    {label: "Resursi", href: "/resources"},
    {label: "Kontakti", href: "/contact", dropdown: ["Atbalsts", "Bizness"]},
]

function NavBar() {
    return (
        <header className="flex justify-between items-center px-15 py-7 bg-white bg-slate-100">
            <Logo />

            <nav className="flex gap-10">
                {navItems.map(item => (
                    <NavItem key={item.label} {...item} />
                ))}
            </nav>
        </header>
    )
}

export default NavBar