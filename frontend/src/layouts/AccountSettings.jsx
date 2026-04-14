import { useState } from "react"
import LargeInput from "../components/LargeInput.jsx"
import LargeTextarea from "../components/LargeTextarea.jsx"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import user_icon from "../assets/images/user_icon.png"

function AccountSettings({user}) {
    const [formData, setFormData] = useState({
        username: user?.username || "",
        bio: user?.bio || ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    return (
        <div className="flex flex-col h-full p-8 rounded-2xl border border-gray-300 group hover:border-primary/80 duration-300 transition-all shadow-md bg-white">
            <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="p-3 lg:p-4 rounded-xl bg-primary/5 text-primary">
                    <img alt="User" src={user_icon} className="h-8 w-8"/>
                </div>
                <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900">Konta informācija</h3>
                    <p className="text-sm mt-1 text-gray-500">Maini savus personas datus un kā citi tevi redz.</p>
                </div>
            </div>

            <form className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <LargeInput text="Lietotājvārds" id="username" value={formData.username} onChange={handleChange} />
                        <p className="text-xs text-gray-400 ml-1">Šis ir redzams citiem lietotājiem.</p>
                    </div>

                    <div className="space-y-1">
                        <LargeTextarea text="Bio" id="bio" value={formData.bio} onChange={handleChange} />
                        <div className="flex justify-between px-1">
                            <p className="text-xs text-gray-400">Maksimums 250 rakstzīmes</p>
                            <span className={`text-xs ${formData.bio.length > 250 ? 'text-red-500' : 'text-gray-400'}`}>
                                {formData.bio.length}/250
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <WithBackgroundBtn text="Saglabāt izmaiņas" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default AccountSettings
