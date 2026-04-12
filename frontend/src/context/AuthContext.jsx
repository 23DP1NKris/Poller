import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                setLoading(false)
                return
            }

            if (user) {
                setLoading(false)
                return
            }

            try {
                const res = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                setUser(res.data)
            } catch {
                localStorage.removeItem('token')
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)