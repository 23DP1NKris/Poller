import NavItem from "./NavItem.jsx"
import Logo from "./Logo.jsx"
import '../assets/styles/NavBar.css'

const navItems = [
    {label: "Par mums", href: "/about", dropdown: ["Komanda", "Mērķis"]},
    {label: "Maksas plāni", href: "/pricing", dropdown: ["Basic", "Pro"]},
    {label: "Resursi", href: "/resources"},
    {label: "Kontakti", href: "/contact", dropdown: ["Atbalsts", "Bizness"]},
]

function NavBar() {
    return (
        <header className="navbar-header">
            <Logo />
            <nav className="nav-container">
                {navItems.map(item => (
                    <NavItem key={item.label} {...item} />
                ))}
            </nav>
        </header>
    )
}

export default NavBar