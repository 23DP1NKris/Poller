import { useAuth } from "../context/AuthContext.jsx"
import { Link } from "react-router-dom"

function UserPreview() {
    const { user } = useAuth()

    if (!user || !user.username) return null;

    const initial = user.username.charAt(0).toUpperCase();

    return (
        <Link
            to="/settings"
            className="group flex items-center gap-2.5 border-l pl-4 border-gray-200 transition-colors hover:bg-gray-50/50 pr-2 py-1"
        >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-lg shadow-inner transition-transform">
                {initial}
            </div>

            <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-700 leading-tight group-hover:underline">{user.username}</span>
                <span className="text-xs text-gray-500 group-hover:underline">{user.email}</span>
            </div>
        </Link>
    )
}

export default UserPreview