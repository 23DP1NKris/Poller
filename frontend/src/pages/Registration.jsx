import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext.jsx"
import OutlineBtn from "../components/OutlineBtn.jsx"
import Logo from "../components/Logo.jsx"
import google_icon from "../assets/images/google_icon.png"
import ms_icon from "../assets/images/microsoft_icon.png"
import AuthBtn from "../components/AuthBtn.jsx"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import LargeInput from "../components/LargeInput.jsx"

function Registration() {
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })

        if (errors[e.target.id]) {
            setErrors({
                ...errors,
                [e.target.id]: null
            })
        }
    }

    const handleEmailRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData)

            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                setUser(response.data.user)
                navigate('/home')
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                console.error("Registration failed:", error.response?.data)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
            <div className="relative w-full lg:flex-1 bg-white flex flex-col">
                <div className="m-4 flex justify-end items-center gap-3">
                    <h3 className="text-base text-gray-500">Jums jau ir konts?</h3>
                    <Link to="/login">
                        <OutlineBtn text="Pieslēgties"/>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-16 lg:px-24 py-2">
                    <Logo />

                    <div className="w-full mt-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Izveido savu profilu</h2>
                        <p className="text-gray-500 text-sm mb-8 text-center">Sāc iepazīt savu mērķauditoriju jau tagad</p>

                        <form className="space-y-4"
                              onSubmit={handleEmailRegister}>

                            <LargeInput
                                text="Lietotājvārds"
                                placeholder="Jānis Bērziņš"
                                id="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                error={errors.username?.[0]}
                            />

                            <LargeInput
                                text="E-pasta adrese"
                                placeholder="janis@epasts.com"
                                id="email"
                                type="text"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email?.[0]}
                            />

                            <LargeInput
                                text="Parole"
                                placeholder="••••••••"
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password?.[0]}
                            />

                            <WithBackgroundBtn
                                text={loading ? "Lādējas..." : "Turpināt"}
                                type="submit"
                            />
                        </form>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-4 text-gray-400">vai arī</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <AuthBtn
                                image={google_icon}
                                text="Reģistrēties ar Google"
                            />
                            <AuthBtn
                                image={ms_icon}
                                text="Reģistrēties ar Microsoft"
                            />
                        </div>
                    </div>

                    <div className="mt-8 text-center text-xs text-gray-400">
                        <p className="text-sm text-gray-700 mb-2">Vai ir radusies kļūda? <span className="font-semibold cursor-pointer">Atbalsts</span></p>
                        <p>
                            Reģistrējoties Jūs piekrītat
                            <a className="text-gray-600 hover:text-primary underline decoration-gray-300 underline-offset-2 mx-1" href="#">Lietošanas noteikumiem</a> un
                            <a className="text-gray-600 hover:text-primary underline decoration-gray-300 underline-offset-2 mx-1" href="#">Privātuma politikai</a>
                        </p>
                    </div>

                </div>
            </div>
            <div className="hidden xl:flex relative xl:w-2/5 xl:flex-none bg-accent-gray flex-col items-center justify-between p-12 overflow-hidden min-h-screen">
                <div className="hidden lg:block"></div>

                <div className="flex flex-col items-center text-center">
                    <div className="bg-yellow-300 w-110 h-110 rounded-2xl shadow-lg flex"></div>
                    <h1 className="mt-6 text-2xl font-bold text-gray-200 ">Pievienojies - tas ir par brīvu!</h1>
                    <h2 className="mt-1 text-base font-semibold text-gray-500">Veido lieliskas aptaujas un iegūsti atbildes jau tūlīt</h2>
                </div>

                <span className="text-sm text-gray-300 mt-8 font-semibold">&copy; Poller 2026</span>
            </div>
        </div>
    )
}

export default Registration