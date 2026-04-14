import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"

function EmailSettings() {
    return (
        <div className="flex flex-col h-full p-8 rounded-2xl border border-gray-300 group hover:border-primary/80 duration-300 transition-all shadow-md bg-white">
            <h3 className="text-lg lg:text-xl font-bold mb-6 text-gray-900">E-pasta iestatījumi</h3>

            <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                    <div>
                        <span className="text-sm font-bold text-gray-700 block">Nedēļas aptauju kopsavilkumi</span>
                        <p className="text-xs text-gray-500">Saņemiet pārskatu reizi nedēļā.</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 accent-primary rounded cursor-pointer" />
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                    <div>
                        <span className="text-sm font-bold text-gray-700 block">Jaunu funkciju paziņojumi</span>
                        <p className="text-xs text-gray-500">Uzziniet par uzlabojumiem.</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 accent-primary rounded cursor-pointer" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-sm font-bold text-gray-700 block">Tiešo ziņu brīdinājumi</span>
                        <p className="text-xs text-gray-500">Paziņojumi par personīgajām ziņām.</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 accent-primary rounded cursor-pointer" />
                </div>
            </div>

            <div className="pt-8 flex justify-end">
                <WithBackgroundBtn text="Saglabāt izvēles" type="button" />
            </div>
        </div>
    )
}

export default EmailSettings
