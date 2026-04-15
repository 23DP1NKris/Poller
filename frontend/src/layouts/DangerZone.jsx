import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DeleteAccountConfirmation from "../components/DeleteAccountConfirmation.jsx"

function DangerZone() {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const handleDelete = async () => {
        setLoading(true)
        const token = localStorage.getItem('token')

        try {
            await axios.delete('http://127.0.0.1:8000/api/user/delete', {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            localStorage.removeItem('token')
            setUser(null)
            navigate('/')
        } catch (err) {
            console.error("Kļūda dzēšot kontu:", err)
            alert("Neizdevās dzēst kontu. Mēģiniet vēlreiz.")
        } finally {
            setLoading(false)
            setIsConfirmOpen(false)
        }
    }

    return (
        <>
            <div className="flex flex-col h-full p-8 rounded-2xl border border-red-200 bg-red-50/30 group hover:border-red-400 duration-300 transition-all shadow-md">
                <h3 className="text-lg lg:text-xl font-bold text-red-600 mb-2">Bīstamā zona</h3>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                    Tiklīdz Jūs izdzēsīsiet savu kontu, atpakaļceļa nebūs. Visi dati tiks dzēsti.
                </p>

                <div className="flex-1 flex items-end">
                    <button
                        onClick={() => setIsConfirmOpen(true)}
                        className="w-full py-3 px-6 rounded-xl border-2 border-red-500 text-red-600 font-bold hover:bg-red-700 hover:border-red-700 hover:text-white transition-all duration-300"
                    >
                        Dzēst kontu
                    </button>
                </div>
            </div>

            <DeleteAccountConfirmation
                isConfirmOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                loading={loading}
            />
        </>
    )
}

export default DangerZone