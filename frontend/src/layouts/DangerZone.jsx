function DangerZone() {
    return (
        <div className="flex flex-col h-full p-8 rounded-2xl border border-red-200 bg-red-50/30 group hover:border-red-400 duration-300 transition-all shadow-md">
            <h3 className="text-lg lg:text-xl font-bold text-red-600 mb-2">Bīstamā zona</h3>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Tiklīdz Jūs izdzēsīsiet savu kontu, atpakaļceļa nebūs. Visi dati tiks dzēsti.
            </p>

            <div className="flex-1 flex items-end">
                <button className="w-full py-3 px-6 rounded-xl border-2 border-red-500 text-red-600 font-bold hover:bg-red-700 hover:border-red-700 hover:text-white transition-all duration-300">
                    Dzēst kontu
                </button>
            </div>
        </div>
    )
}

export default DangerZone