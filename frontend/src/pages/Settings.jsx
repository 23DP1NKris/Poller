import { useAuth } from "../context/AuthContext.jsx"
import Sidebar from "../layouts/Sidebar.jsx"
import DashboardHeader from "../layouts/DashboardHeader.jsx"
import AccountSettings from "../layouts/AccountSettings.jsx"
import SecuritySettings from "../layouts/SecuritySettings.jsx"
import EmailSettings from "../layouts/EmailSettings.jsx"
import DangerZone from "../layouts/DangerZone.jsx"

function Settings() {
    const { user, loading } = useAuth()

    if (loading) return (
        <p className="flex h-screen items-center justify-center font-semibold text-gray-500">
            Ielādējas...
        </p>
    )

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <DashboardHeader title="Iestatījumi" />
                <main className="lg:p-30 lg:pt-22.5 p-6 pt-24">
                    <div className="mb-8">
                        <h1 className="font-bold text-2xl lg:text-3xl tracking-tight mb-2 text-gray-900">Lietotāja iestatījumi</h1>
                        <p className="text-sm lg:text-base text-gray-500">Pārvaldiet Jūsu konta iestatījumus, profilu un tā drošību.</p>
                    </div>

                    <section className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
                        <AccountSettings user={user} />
                        <SecuritySettings />
                    </section>

                    <section className="grid grid-cols-1 xl:grid-cols-12 gap-10">
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
