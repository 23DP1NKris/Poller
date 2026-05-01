function StatCard({ icon, iconBg, iconFilter, value, label }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                <img
                    src={icon}
                    className="w-6 h-6 opacity-60"
                    style={iconFilter ? { filter: iconFilter } : {}}
                    alt=""
                />
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
    )
}

export default StatCard
