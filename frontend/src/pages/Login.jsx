import {useState} from "react"
import {Link} from "react-router-dom";
import OutlineBtn from "../components/OutlineBtn.jsx";
import Logo from "../components/Logo.jsx";
import AuthBtn from "../components/AuthBtn.jsx";
import google_icon from "../assets/images/google_icon.png";
import ms_icon from "../assets/images/microsoft_icon.png";
import LargeInput from "../components/LargeInput.jsx";
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx";

function Login() {
    const [view, setView] = useState('choice')

    const handleEmailLogin = async (e) => {
        e.preventDefault()

    //     more api stuff
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
                <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-16 lg:px-28 py-6 lg:py-24">
                    <Logo />

                    <div className="w-full mt-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Prieks tevi redzēt atkal!</h2>
                        <p className="text-gray-500 text-sm mb-8 text-center">Ievadi savus lietotāja datus, lai pieslēgtos.</p>

                        <form className="space-y-5">
                            <LargeInput
                                htmlFor="email"
                                text="E-pasta adrese"
                                placeholder="janis@epasts.com"
                                id="email"
                                type="email"
                            />

                            <LargeInput
                                htmlFor="password"
                                text="Parole"
                                placeholder="••••••••"
                                id="password"
                                type="password"
                            />

                            <WithBackgroundBtn
                                text="Turpināt"
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
                        <p className="text-sm text-gray-600">Vai ir radusies kļūda? <span className="font-semibold cursor-pointer hover:text-gray-800 duration-200">Atbalsts</span></p>
                    </div>

                </div>



            </div>
        </div>
    )
}

export default Login