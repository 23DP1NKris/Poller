import { useState } from "react"
import { Link } from "react-router-dom"
import LargeInput from "../components/LargeInput.jsx"
import BulletpointBox from "../components/BulletpointBox.jsx"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import admin_icon from "../assets/images/admin_icon.png"
import info_icon from "../assets/images/info.png"

function SecuritySettings() {
    const [securityData, setSecurityData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: ""
    })

    const handleChange = (e) => {
        setSecurityData({ ...securityData, [e.target.id]: e.target.value })
    }

    return (
        <div className="flex flex-col h-full p-8 rounded-2xl border border-gray-300 group hover:border-primary/80 duration-300 transition-all shadow-md bg-white">
            <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="p-3 lg:p-4 rounded-xl bg-primary/5 text-primary">
                    <img alt="Security" src={admin_icon} className="h-8 w-8"/>
                </div>
                <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900">Drošība</h3>
                    <p className="text-sm mt-1 text-gray-500">Uzlabojiet sava konta drošību, atjauninot paroli.</p>
                </div>
            </div>

            <form className="flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                    <div>
                        <LargeInput text="Pašreizējā parole" id="current_password" type="password" value={securityData.current_password} onChange={handleChange} />
                        <p className="text-xs text-gray-500 mt-1 ml-1">
                            Aizmirsi paroli? <Link to="/support" className="text-primary font-bold hover:underline">Atbalsts</Link>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <LargeInput text="Jaunā parole" id="new_password" type="password" value={securityData.new_password} onChange={handleChange} />
                        <LargeInput text="Apstiprināt" id="new_password_confirmation" type="password" value={securityData.new_password_confirmation} onChange={handleChange} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-700">
                            <img src={info_icon} className="w-3.5 h-3.5 opacity-70" />
                            <span className="text-xs font-bold uppercase tracking-tight">Drošības prasības</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <BulletpointBox text="8 rakstzīmes"/>
                            <BulletpointBox text="Lielais burts" />
                            <BulletpointBox text="Cipars" />
                            <BulletpointBox text="Simbols (#$!@)" />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end border-t border-gray-50">
                    <WithBackgroundBtn text="Atjaunot paroli" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default SecuritySettings
