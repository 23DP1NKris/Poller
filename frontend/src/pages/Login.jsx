import {useState} from "react"
import email_icon from "../assets/images/email_icon.png"
import google_icon from "../assets/images/google_icon.png"
import microsoft_icon from "../assets/images/microsoft_icon.png"
import AuthInput from "../components/AuthInput.jsx"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import OutlineBtn from "../components/OutlineBtn.jsx"
import {Link} from "react-router-dom"
import Logo from "../components/Logo.jsx"
import AuthBtn from "../components/AuthBtn.jsx";
import IsThereAnIssue from "../components/IsThereAnIssue.jsx";

function Login() {
    const [view, setView] = useState('choice')

    const handleEmailLogin = async (e) => {
        e.preventDefault()

    //     more api stuff
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-white p-2">
            <div className="flex gap-3 w-full align-center place-content-between">
                <div className="w-full flex items-center gap-4">
                    <h3 className="text-gray-500 text-lg whitespace-nowrap">
                        Tev vēl nav sava profila?
                    </h3>

                    <Link to="/register">
                        <OutlineBtn text="Reģistrēties" />
                    </Link>
                </div>

                <div>
                    <Link to="/">
                        <OutlineBtn
                            text="Atpakaļ"
                        />
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
                    <AuthBtn onClick={() => setView('email')} img={email_icon} text="Pieslēgties ar E-pastu" />
                    <div className="text-center text-gray-400 text-sm">vai arī</div>
                    <AuthBtn img={google_icon} text="Pieslēgties ar Google" />
                    <AuthBtn img={microsoft_icon} text="Pieslēgties ar Microsoft" />
                </div>
            ) : (
                <form onSubmit={handleEmailLogin} className="w-full max-w-sm space-y-4 flex flex-col items-center">
                    <AuthInput name="email" type="email" placeholder="E-pasts" autoComplete="off" />
                    <AuthInput name="password" type="password" placeholder="Parole"/>

                    <div className="mt-5 w-full flex justify-center">
                        <WithBackgroundBtn
                            text="Pieslēgties"
                            color="bg-primary-purple"
                        />
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
    )
}

export default Login