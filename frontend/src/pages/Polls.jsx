import { useAuth } from "../context/AuthContext.jsx"
import { useState, useEffect, useMemo } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import Sidebar from "../layouts/Sidebar.jsx"
import DashboardHeader from "../layouts/DashboardHeader.jsx"
import StatsCards from "../layouts/StatsCards.jsx"
import PollCard from "../layouts/PollCard.jsx"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import active_polls_icon from "../assets/images/active_polls.png"
import search_icon from "../assets/images/search_icon.png"

function Polls() {
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [polls, setPolls] = useState([])
    const [pollsLoading, setPollsLoading] = useState(true)
    const [openMenuId, setOpenMenuId] = useState(null)
    const [copiedId, setCopiedId] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('newest')

    useEffect(() => {
        const fetchPolls = async () => {
            const token = localStorage.getItem('token')
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/polls', {
                    headers: { 'Authorization': `Bearer ${token}` }
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

    const displayedPolls = useMemo(() => {
        let result = polls.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        switch (sortBy) {
            case 'oldest':   return [...result].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            case 'az':       return [...result].sort((a, b) => a.title.localeCompare(b.title))
            case 'za':       return [...result].sort((a, b) => b.title.localeCompare(a.title))
            case 'votes':    return [...result].sort((a, b) => (b.votes_count ?? 0) - (a.votes_count ?? 0))
            default:         return [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }
    }, [polls, searchQuery, sortBy])

    const handleDelete = async (pollId) => {
        const token = localStorage.getItem('token')
        try {
            await axios.delete(`http://127.0.0.1:8000/api/polls/${pollId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            setPolls(prev => prev.filter(p => p.id !== pollId))
        } catch (err) {
            console.error('Failed to delete poll:', err)
        }
        setOpenMenuId(null)
    }

    const handleClose = async (pollId) => {
        const token = localStorage.getItem('token')
        const poll = polls.find(p => p.id === pollId)
        const endpoint = poll?.status === 'closed' ? 'open' : 'close'
        try {
            await axios.patch(`http://127.0.0.1:8000/api/polls/${pollId}/${endpoint}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            setPolls(prev => prev.map(p => p.id === pollId ? { ...p, status: endpoint === 'close' ? 'closed' : 'active' } : p))
        } catch (err) {
            console.error('Failed to toggle poll status:', err)
        }
        setOpenMenuId(null)
    }

    const handleShare = (pollId) => {
        navigator.clipboard.writeText(`${window.location.origin}/poll/${pollId}`)
        setCopiedId(pollId)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const handleEdit = (pollId) => {
        navigate(`/polls/${pollId}/edit`)
    }

    const handleToggleMenu = (pollId) => {
        setOpenMenuId(prev => prev === pollId ? null : pollId)
    }

    const activeCount = polls.filter(p => p.status === 'active').length

    if (loading) return (
        <p className="flex h-screen items-center justify-center font-semibold text-gray-500">
            Ielādējas...
        </p>
    )

    if (!user) return <Navigate to="/login" />

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {openMenuId && (
                <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
            )}

            <div className="flex-1 flex flex-col lg:ml-64">
                <DashboardHeader
                    title="Aptaujas"
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                />

                <main className="p-6 pt-24 lg:p-12 lg:pt-24 max-w-7xl w-full">

                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="font-bold text-3xl tracking-tight mb-2 text-gray-900">Manas Aptaujas</h1>
                            <p className="text-base text-gray-500">Pārvaldiet un sekojiet savām aptaujām reāllaikā.</p>
                        </div>
                        <Link to="/create-poll">
                            <WithBackgroundBtn text="+ Jauna Aptauja" />
                        </Link>
                    </div>

                    <StatsCards stats={[
                        { label: 'Kopējās balsis', value: polls.reduce((sum, p) => sum + (p.responses_count ?? 0), 0) },
                        { label: 'Aktīvās aptaujas', value: activeCount },
                        { label: 'Vidējā iesaiste', value: (() => { const totalViews = polls.reduce((s, p) => s + (p.views_count ?? 0), 0); return totalViews > 0 ? Math.min(100, Math.round((polls.reduce((s, p) => s + (p.responses_count ?? 0), 0) / totalViews) * 100)) + '%' : '-' })() },
                    ]} />

                    {!pollsLoading && polls.length > 0 && (
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <div className="relative flex-1">
                                <img
                                    src={search_icon}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
                                    alt=""
                                />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Meklēt aptaujas..."
                                    className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-gray-400"
                                />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
                            >
                                <option value="newest">Jaunākā</option>
                                <option value="oldest">Vecākā</option>
                                <option value="az">Nosaukums A–Z</option>
                                <option value="za">Nosaukums Z–A</option>
                                <option value="votes">Visvairāk atbildes</option>
                            </select>
                        </div>
                    )}

                    {pollsLoading ? (
                        <p className="text-center text-gray-400 font-medium py-16">Ielādējas...</p>
                    ) : polls.length === 0 ? (
                        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 flex flex-col items-center justify-center text-center">
                            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <img src={active_polls_icon} className="w-7 h-7 opacity-30" alt="" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Nav aptauju</h3>
                            <p className="text-sm text-gray-400 mb-6 max-w-xs">Izveidojiet savu pirmo aptauju un sāciet iegūt atbildes jau tagad.</p>
                            <Link to="/create-poll"><WithBackgroundBtn text="Izveidot aptauju" /></Link>
                        </div>
                    ) : displayedPolls.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center">
                            <p className="font-semibold text-gray-700 mb-1">Nav rezultātu</p>
                            <p className="text-sm text-gray-400">Mēģiniet citu meklēšanas frāzi.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {displayedPolls.map(poll => (
                                <PollCard
                                    key={poll.id}
                                    poll={poll}
                                    copiedId={copiedId}
                                    openMenuId={openMenuId}
                                    onShare={handleShare}
                                    onDelete={handleDelete}
                                    onClose={handleClose}
                                    onEdit={handleEdit}
                                    onToggleMenu={handleToggleMenu}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Polls
