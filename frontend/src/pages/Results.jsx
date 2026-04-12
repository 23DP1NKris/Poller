import Sidebar from "../layouts/Sidebar.jsx"
import DashboardHeader from "../layouts/DashboardHeader.jsx"

function Results() {
    return(
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <DashboardHeader
                    title="Rezultāti"
                />

                <main className="p-6">
                </main>
            </div>
        </div>
    )
}

export default Results