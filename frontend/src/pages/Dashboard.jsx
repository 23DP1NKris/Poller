import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Dashboard() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                navigate('/login')
                return
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                })
                setUser(response.data)
            } catch {
                localStorage.removeItem('token')
                navigate('/login')
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [navigate])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-lg font-semibold text-gray-600">Ielādējas...</div>
            </div>
        )
    }

    return (
        <h1 className="text-3xl font-bold text-gray-900">Labdien, {user?.username}!</h1>
    )
}

export default Dashboard