import Sidebar from "../layouts/Sidebar.jsx"
import DashboardHeader from "../layouts/DashboardHeader.jsx"

function ActivePolls() {
    return(
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <DashboardHeader
                    title="Aktīvās aptaujas"
                />

                <main className="p-6">
                </main>
            </div>
        </div>
    )
}

export default ActivePolls