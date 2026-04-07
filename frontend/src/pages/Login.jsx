import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import OutlineBtn from "../components/OutlineBtn.jsx"
import Logo from "../components/Logo.jsx"
import AuthBtn from "../components/AuthBtn.jsx"
import google_icon from "../assets/images/google_icon.png"
import ms_icon from "../assets/images/microsoft_icon.png"
import LargeInput from "../components/LargeInput.jsx"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"

function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
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

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({})

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else if (error.response && error.response.status === 401) {
                setErrors({
                    email: ['Nepareizs lietotājvārds vai parole'],
                    password: ['Nepareizs lietotājvārds vai parole']
                });
            } else {
                console.error("Login failed: ", error)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
            <div className="hidden xl:flex relative xl:w-2/5 xl:flex-none bg-purple-100 flex-col justify-between p-12 overflow-hidden min-h-screen">
                <div className="hidden lg:block"></div>

                <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-300 w-110 h-110 rounded-2xl shadow-lg flex"></div>
                    <h1 className="mt-6 text-2xl font-bold text-slate-600 ">Veic labākas izvēles. Kopā.</h1>
                </div>
                <span className="text-sm font-semibold text-gray-600 mt-8 text-center">&copy; Poller 2026</span>
            </div>

            <div className="relative w-full lg:flex-1 bg-white flex flex-col">
                <div className="m-4 flex justify-end items-center gap-3">
                    <h3 className="text-base text-gray-500">Vēl neesat reģistrējušies?</h3>
                    <Link to="/register">
                        <OutlineBtn text="Reģistrēties"/>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-16 lg:px-28 py-6">
                    <Logo />

                    <div className="w-full mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Prieks tevi redzēt atkal!</h2>
                        <p className="text-gray-500 text-sm mb-8 text-center">Ievadi savus lietotāja datus, lai pieslēgtos.</p>

                        <form className="space-y-5" onSubmit={handleEmailLogin}>
                            <LargeInput
                                htmlFor="email"
                                text="E-pasta adrese"
                                placeholder="janis@epasts.com"
                                id="email"
                                type="text"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email?.[0]}
                            />

                            <LargeInput
                                htmlFor="password"
                                text="Parole"
                                placeholder="••••••••"
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password?.[0]}
                            />

                            <WithBackgroundBtn
                                text={loading ? "Pieslēdzas..." : "Turpināt"}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <AuthBtn
                                image={google_icon}
                                text="Google"
                            />
                            <AuthBtn
                                image={ms_icon}
                                text="Microsoft"
                            />
                        </div>
                    </div>

                    <div className=" mt-25 lg:mt-12 text-center">
                        <p className="text-sm text-gray-600">Vai ir radusies kļūda?
                            <Link to={'/support'}><span className="font-semibold cursor-pointer hover:text-gray-800 duration-200"> Atbalsts</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login