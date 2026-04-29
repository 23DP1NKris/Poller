import { useNavigate } from "react-router-dom"
import bar_chart_icon from "../assets/images/bar_chart_icon.png"
import share_icon from "../assets/images/share_icon.png"
import green_checkmark from "../assets/images/green_checkmark.png"
import pause_icon from "../assets/images/pause_icon.png"
import dots from "../assets/images/dots.png"
import trash_icon from "../assets/images/trash_icon.png"
import close_icon from "../assets/images/close_icon.png"

const getTimeRemaining = (expiresAt) => {
    if (!expiresAt) return 'Bez termiņa'
    const diff = new Date(expiresAt) - new Date()
    if (diff <= 0) return 'Beidzies'
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (days === 1) return 'Beidzas pēc 1 dienas'
    return `Beidzas pēc ${days} dienām`
}

function PollCard({ poll, copiedId, openMenuId, onShare, onDelete, onClose, onToggleMenu }) {
    const navigate = useNavigate()

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-6">

            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${poll.status === 'active' ? 'text-green-600' : poll.status === 'draft' ? 'text-amber-500' : 'text-red-700'}`}>
                        {poll.status === 'active' && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                        {poll.status === 'draft' && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                        {poll.status === 'closed' && <span className="w-2 h-2 rounded-full bg-red-500" />}
                        {poll.status === 'active' ? 'Aktīva' : poll.status === 'draft' ? 'Melnraksts' : 'Slēgta'}
                    </span>
                    {poll.categories?.map(cat => (
                        <span key={cat} className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-md">
                            {cat}
                        </span>
                    ))}
                </div>

                <h3 className="font-bold text-gray-900 text-base truncate mb-3">{poll.title}</h3>

                <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400 font-medium">Iesaiste</span>
                        <span className="text-xs font-bold text-gray-500">0%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-xs text-gray-400">
                        <span className="font-semibold text-gray-600">0</span> balsis
                    </span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{getTimeRemaining(poll.expires_at)}</span>
                    {poll.is_anonymous && (
                        <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-md">Anonīma</span>
                    )}
                    {poll.allow_multiple_votes && (
                        <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-md">Vairākas balsis</span>
                    )}
                    {!poll.is_public && (
                        <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-md">Privāta</span>
                    )}
                    {!poll.show_stats && (
                        <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-md">Slēpti rezultāti</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {poll.show_stats && (
                    <button
                        onClick={() => navigate(`/results/${poll.id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-xl hover:bg-primary/20 transition-colors"
                    >
                        <img
                            src={bar_chart_icon}
                            className="w-4 h-4"
                            style={{ filter: 'invert(11%) sepia(68%) saturate(4529%) hue-rotate(298deg) brightness(85%) contrast(106%)' }}
                            alt=""
                        />
                        Skatīt rezultātus
                    </button>
                )}

                <button
                    onClick={() => onShare(poll.id)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    title="Kopīgot"
                >
                    {copiedId === poll.id ? (
                        <img src={green_checkmark} className="w-5 h-5" alt="" />
                    ) : (
                        <img src={share_icon} className="w-5 h-5 opacity-40" alt="" />
                    )}
                </button>

                <div className="relative z-50">
                    <button
                        onClick={() => onToggleMenu(poll.id)}
                        className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <img src={dots} className="w-5 h-5 opacity-50" alt="" />
                    </button>
                    {openMenuId === poll.id && (
                        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                <img src={pause_icon} className="w-4 h-4 opacity-40" alt="" />
                                Apturēt
                            </button>
                            {poll.status !== 'closed' && (
                                <button
                                    onClick={() => onClose(poll.id)}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    <img src={close_icon} className="w-4 h-4 opacity-40" alt="" />
                                    Slēgt aptauju
                                </button>
                            )}
                            <button
                                onClick={() => onDelete(poll.id)}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 font-medium hover:bg-red-50 transition-colors"
                            >
                                <img src={trash_icon} className="w-4 h-4" alt="" />
                                Dzēst
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PollCard
