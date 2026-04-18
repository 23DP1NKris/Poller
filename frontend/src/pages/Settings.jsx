import SecuritySettings from "../layouts/SecuritySettings.jsx"
import {useState} from "react"
import Sidebar from "../layouts/Sidebar.jsx"
import DashboardHeader from "../layouts/DashboardHeader.jsx"
import AccountSettings from "../layouts/AccountSettings.jsx"
import EmailSettings from "../layouts/EmailSettings.jsx"
import DangerZone from "../layouts/DangerZone.jsx"
import {useAuth} from "../context/AuthContext.jsx"

function Settings() {
    const { user, loading } = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    if (loading) return (
        <p className="flex h-screen items-center justify-center font-semibold text-gray-500">
            Ielādējas...
        </p>
    )

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <DashboardHeader
                    title="Iestatījumi"
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                />

                <main className="p-6 pt-24 lg:p-12 lg:pt-24 max-w-7xl w-full">
                    <div className="mb-10">
                        <h1 className="font-bold text-3xl tracking-tight mb-2 text-gray-900">Lietotāja iestatījumi</h1>
                        <p className="text-base text-gray-500">Pārvaldiet Jūsu konta iestatījumus, profilu un tā drošību.</p>
                    </div>

                    <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                        <AccountSettings user={user} />
                        <SecuritySettings />
                    </section>

                    <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        <div className="xl:col-span-8">
                            <EmailSettings />
                        </div>
                        <div className="xl:col-span-4">
                            <DangerZone />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Settings