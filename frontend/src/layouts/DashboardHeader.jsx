import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"

function DashboardHeader(props) {

    return (
        <header className="fixed top-0 left-0 lg:left-64 right-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between px-8 h-16 shadow-sm">

            <div className="flex items-center gap-4 ">
                <h2 className="text-xl font-bold tracking-tight text-primary">{props.title}</h2>
            </div>

            <div className="flex items-center gap-4">
                <WithBackgroundBtn text="Izveidot jaunu aptauju" />
            </div>

        </header>
    )
}

export default DashboardHeader