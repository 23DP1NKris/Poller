import Sidebar from "../layouts/Sidebar.jsx"
import DashboardHeader from "../layouts/DashboardHeader.jsx"

function Settings() {
    return(
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <DashboardHeader
                    title="Iestatījumi"
                />

                <main className="p-6">
                </main>
            </div>
        </div>
    )
}

export default Settings