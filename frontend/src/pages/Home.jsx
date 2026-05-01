import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'
import Sidebar from '../layouts/Sidebar.jsx'
import DashboardHeader from '../layouts/DashboardHeader.jsx'
import WithBackgroundBtn from '../components/WithBackgroundBtn.jsx'
import StatCard from '../components/StatCard.jsx'
import NotificationCard from '../components/NotificationCard.jsx'
import useNotifications from '../hooks/useNotifications.js'
import bar_chart_icon from '../assets/images/bar_chart_icon.png'
import active_polls_icon from '../assets/images/active_polls.png'
import user_icon from '../assets/images/user_icon.png'
import arrow_icon from '../assets/images/dropdown_arrow_down.png'

const getDaysLeft = (expiresAt) => {
    if (!expiresAt) return null
    const diff = new Date(expiresAt) - new Date()
    if (diff <= 0) return 0
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const ArrowRight = () => (
    <img src={arrow_icon} className="-rotate-90 w-3.5 h-3.5 opacity-50" alt="" />
)

function Home() {
    const { user, loading } = useAuth()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [polls, setPolls] = useState([])
    const [pollsLoading, setPollsLoading] = useState(true)

    useEffect(() => {
        const fetchPolls = async () => {
            const token = localStorage.getItem('token')
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/polls', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setPolls(res.data.polls)
            } catch (err) {
                console.error('Failed to fetch polls:', err)
            } finally {
                setPollsLoading(false)
            }
        }
        fetchPolls()
    }, [])

    const totalResponses = polls.reduce((sum, p) => sum + (p.responses_count ?? 0), 0)
    const activePolls = polls.filter(p => p.status === 'active')
    const recentPolls = polls.filter(p => p.status !== 'draft').slice(0, 3)
    const draftPolls = polls.filter(p => p.status === 'draft')

    const { notifications, milestones } = useNotifications(polls)

    const primaryFilter = 'invert(11%) sepia(68%) saturate(4529%) hue-rotate(298deg) brightness(85%) contrast(106%)'

    if (loading) return (
        <p className="flex h-screen items-center justify-center font-semibold text-gray-500">Ielādējas...</p>
    )

    if (!user) return <Navigate to="/login" />

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <DashboardHeader title="Sākums" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                <main className="p-6 pt-24 lg:p-12 lg:pt-24 max-w-7xl w-full">

                    {/* Welcome */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                        <div>
                            <h1 className="font-bold text-3xl tracking-tight text-gray-900 mb-1">
                                Sveiks, {user.username}!
                            </h1>
                            <p className="text-base text-gray-500">
                                {pollsLoading
                                    ? 'Ielādē datus...'
                                    : activePolls.length > 0
                                        ? `Tev ir ${activePolls.length} aktīv${activePolls.length === 1 ? 'a aptauja' : 'as aptaujas'} un kopā ${totalResponses} atbild${totalResponses === 1 ? 'e' : 'es'}.`
                                        : 'Laipni lūgts! Izveido savu pirmo aptauju, lai sāktu.'}
                            </p>
                        </div>
                        <Link to="/create-poll">
                            <WithBackgroundBtn text="+ Izveidot aptauju" />
                        </Link>
                    </div>

                    {/* stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        <StatCard
                            icon={bar_chart_icon}
                            iconBg="bg-primary/10"
                            iconFilter={primaryFilter}
                            value={pollsLoading ? '—' : totalResponses}
                            label="Kopējās atbildes"
                        />
                        <StatCard
                            icon={active_polls_icon}
                            iconBg="bg-green-50"
                            value={pollsLoading ? '—' : activePolls.length}
                            label="Aktīvās aptaujas"
                        />
                        <StatCard
                            icon={user_icon}
                            iconBg="bg-blue-50"
                            value={pollsLoading ? '—' : totalResponses}
                            label="Sasniegtā auditorija"
                        />
                    </div>

                    {/* main content */}
                    {!pollsLoading && polls.length === 0 ? (

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-lg">
                            <h2 className="font-bold text-xl text-gray-900 mb-1">Sāc darbu ar Poller</h2>
                            <p className="text-sm text-gray-500 mb-6">Izpildi šos soļus, lai pilnvērtīgi izmantotu platformu.</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">1</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-800">Aizpildi savu profilu</p>
                                        <p className="text-xs text-gray-400">Pievieno informāciju par sevi iestatījumos.</p>
                                    </div>
                                    <Link to="/settings" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline shrink-0">
                                        Doties <ArrowRight />
                                    </Link>
                                </div>
                                <div className="h-px bg-gray-100" />
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">2</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-800">Izveido savu pirmo aptauju</p>
                                        <p className="text-xs text-gray-400">Tas aizņem tikai dažas minūtes.</p>
                                    </div>
                                    <Link to="/create-poll" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline shrink-0">
                                        Sākt <ArrowRight />
                                    </Link>
                                </div>
                                <div className="h-px bg-gray-100" />
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 text-sm font-bold flex items-center justify-center shrink-0">3</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-400">Kopīgo aptaujas saiti</p>
                                        <p className="text-xs text-gray-300">Pieejams pēc pirmās aptaujas izveides.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* recent polls */}
                            <div className="lg:col-span-2 space-y-8">

                                {/* active/closed */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="font-bold text-lg text-gray-900">Tavas jaunākās aptaujas</h2>
                                        <Link to="/polls" className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                                            Skatīt visas <ArrowRight />
                                        </Link>
                                    </div>

                                    {pollsLoading ? (
                                        <div className="space-y-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 h-20 animate-pulse" />
                                            ))}
                                        </div>
                                    ) : recentPolls.length === 0 ? (
                                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
                                            <p className="text-sm text-gray-400">Nav aktīvu aptauju.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {recentPolls.map(poll => {
                                                const daysLeft = getDaysLeft(poll.expires_at)
                                                return (
                                                    <div key={poll.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                <span className={`flex items-center gap-1.5 text-xs font-semibold ${poll.status === 'active' ? 'text-green-600' : 'text-red-700'}`}>
                                                                    <span className={`w-2 h-2 rounded-full ${poll.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                                                    {poll.status === 'active' ? 'Aktīva' : 'Slēgta'}
                                                                </span>
                                                                {poll.categories?.map(cat => (
                                                                    <span key={cat} className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-md">{cat}</span>
                                                                ))}
                                                            </div>
                                                            <p className="font-bold text-gray-900 text-sm truncate">{poll.title}</p>
                                                        </div>

                                                        <div className="flex items-center gap-5 shrink-0 text-right">
                                                            <div>
                                                                <p className="text-sm font-bold text-gray-900">{poll.responses_count ?? 0}</p>
                                                                <p className="text-xs text-gray-400">balsis</p>
                                                            </div>
                                                            {daysLeft !== null && (
                                                                <div>
                                                                    <p className="text-sm font-bold text-gray-900">{daysLeft}</p>
                                                                    <p className="text-xs text-gray-400">dienas</p>
                                                                </div>
                                                            )}
                                                            <Link
                                                                to={`/results/${poll.id}`}
                                                                className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
                                                            >
                                                                Rezultāti <ArrowRight />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* drafts-melnraksti */}
                                {!pollsLoading && draftPolls.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="font-bold text-lg text-gray-900">Melnraksti</h2>
                                            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{draftPolls.length}</span>
                                        </div>
                                        <div className="space-y-3">
                                            {draftPolls.map(poll => (
                                                <div key={poll.id} className="bg-white rounded-2xl border border-dashed border-gray-200 p-5 flex items-center gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-500 mb-1">
                                                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                                                            Melnraksts
                                                        </span>
                                                        <p className="font-bold text-gray-700 text-sm truncate">{poll.title}</p>
                                                    </div>
                                                    <Link
                                                        to={`/polls/${poll.id}/edit`}
                                                        className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
                                                    >
                                                        Rediģēt <ArrowRight />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* notifications or tips */}
                            <div>
                                <h2 className="font-bold text-lg text-gray-900 mb-4">
                                    {milestones.length > 0 ? 'Paziņojumi' : 'Ieteikumi'}
                                </h2>
                                <div className="space-y-3">
                                    {notifications.map((item, i) => (
                                        <NotificationCard
                                            key={i}
                                            text={item.text}
                                            level={item.level}
                                            pollId={item.pollId}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}

                </main>
            </div>
        </div>
    )
}

export default Home
