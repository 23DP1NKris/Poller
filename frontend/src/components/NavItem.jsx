import '../assets/styles/NavItem.css'

function NavItem({label, href, dropdown}) {
    return (
        <div className="nav-item-container">
            <div className="nav-link-wrapper">
                <a href={href} className="nav-link">{label}</a>
                {dropdown && <span className="arrow"></span>}
            </div>

            {dropdown && (
                <div className="dropdown-menu">
                    {dropdown.map(dropdownItem => (
                        <a key={dropdownItem} href="#" className="dropdown-item">
                            {dropdownItem}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NavItem