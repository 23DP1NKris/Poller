import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import Sidebar from "../layouts/Sidebar.jsx"
import DashboardHeader from "../layouts/DashboardHeader.jsx";

function Home() {
    const { user, loading } = useAuth()

    if (loading) return (
        <div className="flex h-screen items-center justify-center font-semibold text-gray-500">
            Ielādējas...
        </div>
    )

    if (!user) return <Navigate to="/login" />

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <DashboardHeader
                    title="Sākums"
                />

                <main className="p-6">
                    <h1 className="text-2xl font-bold">Sveiks, {user.username}!</h1>
                </main>
            </div>
        </div>
    )
}

export default Home
