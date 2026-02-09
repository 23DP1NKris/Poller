function NavItem({ label, href, dropdown }) {
    return (
        <div className="relative inline-block group">

            <div className="flex items-center gap-[5px] cursor-pointer">
                <a href={href} className="no-underline text-[#333] text-base font-medium hover:text-primary-purple transition-colors">
                    {label}
                </a>

                {dropdown && (
                    <span className="inline-block p-[2px] border-solid border-[#333] border-b border-r rotate-45 mb-[2px]"></span>
                )}
            </div>

            {dropdown && (
                <div className="hidden group-hover:block absolute left-0 bg-white min-w-35 shadow-[0_8px_16px_rgba(0,0,0,0.1)] py-[10px] rounded-[4px] z-10">
                    {dropdown.map(dropdownItem => (
                        <a
                            key={dropdownItem}
                            href="#"
                            className="block text-[#333] px-4 py-2 no-underline font-medium text-sm hover:bg-[#f5f5f5] transition-colors">
                            {dropdownItem}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NavItem