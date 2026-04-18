import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import burger_menu_icon from "../assets/images/burger_menu_icon.png"

function DashboardHeader({ title, isOpen, setIsOpen }) {
    return (
        <header className="fixed top-0 left-0 lg:ml-64 right-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 h-16 shadow-sm">
            <div className="flex items-center gap-4">
                {!isOpen && (
                    <button
                        className="lg:hidden p-2 -ml-2 rounded-md hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(true)}
                    >
                        <img
                            src={burger_menu_icon}
                            alt="Izvēlne"
                            className="w-6 h-6 object-contain"
                        />
                    </button>
                )}
                <h2 className="text-xl font-bold tracking-tight text-primary">{title}</h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                    <WithBackgroundBtn text="Izveidot jaunu aptauju" />
                </div>
            </div>
        </header>
    )
}

export default DashboardHeader