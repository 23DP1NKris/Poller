import { useState } from 'react'
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import AuthInput from "../components/AuthInput.jsx"
import email_icon from "../assets/images/email_icon.png"
import google_icon from "../assets/images/google_icon.png"
import microsoft_icon from "../assets/images/microsoft_icon.png"
import {Link} from "react-router-dom";
import OutlineBtn from "../components/OutlineBtn.jsx";
import Logo from "../components/Logo.jsx";
import AuthBtn from "../components/AuthBtn.jsx";
import IsThereAnIssue from "../components/IsThereAnIssue.jsx";

function Registration() {
    const [view, setView] = useState('choice')

    const handleEmailRegister = async (e) => {
        e.preventDefault()

    //     api call from backend here (also prevent php intervention xd)
    }

    return (
        // auth with google or ms
        <div className="flex min-h-screen">
            <div className="w-3/5 flex flex-col items-center bg-white p-2">
                <div className="flex gap-3 w-full align-center place-content-between">
                    <div className="w-full flex items-center gap-4">
                        <h3 className="text-gray-500 text-lg whitespace-nowrap">
                            Jau esi reģistrējies?
                        </h3>

                        <Link to="/login">
                            <OutlineBtn text="Pieslēgties" />
                        </Link>
                    </div>

                </div>

                <div className="mt-[15vh] mb-[5vh]">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>


                {view === 'choice' ? (
                    <div className="w-full max-w-sm space-y-4">
                        <AuthBtn onClick={() => setView('email')} img={email_icon} text="Pievienoties ar E-pastu"/>
                        <h3 className="text-center text-gray-400 text-sm">vai arī</h3>
                        <AuthBtn img={google_icon} text="Pievienoties ar Google"/>
                        <AuthBtn img={microsoft_icon} text="Pievienoties ar Microsoft"/>
                    </div>

                ) : (
                    // auth with email
                    <form onSubmit={handleEmailRegister} className="w-full max-w-sm space-y-4 flex flex-col items-center">
                        <AuthInput name="email" type="email" placeholder="E-pasts" autoComplete="off" />
                        <AuthInput name="password" type="password" placeholder="Parole"/>
                        <AuthInput name="confirm_password" type="password" placeholder="Atkārtot paroli" />

                        <div className="mt-5 w-full flex justify-center">
                            <WithBackgroundBtn text="Reģistrēties" color="bg-primary-purple"/>
                        </div>

                        <button
                            onClick={() => setView('choice')}
                            className="text-sm text-gray-500 mt-4 transition duration-150 cursor-pointer hover:text-gray-800 hover:scale-103">
                            Atpakaļ
                        </button>
                    </form>
                )}

                <IsThereAnIssue />
            </div>

            <div className="w-2/5 bg-[#2D2E3E] flex flex-col items-center justify-center text-white">
                <div className="w-128 h-128 bg-pink-500 rounded-3xl mb-6 flex items-center justify-center">
                    <img src="../assets/images/registersomething" alt="some image or gif" />
                </div>
                <h2 className="text-2xl font-semibold">Pievienojies - tas ir par brīvu!</h2>
            </div>
        </div>
    )
}

export default Registration