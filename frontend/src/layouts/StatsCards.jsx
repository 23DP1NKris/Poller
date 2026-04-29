function StatsCards({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
            ))}
        </div>
    )
}

export default StatsCards
