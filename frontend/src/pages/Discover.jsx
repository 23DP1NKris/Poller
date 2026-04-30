import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'
import Sidebar from '../layouts/Sidebar.jsx'
import DashboardHeader from '../layouts/DashboardHeader.jsx'
import search_icon from '../assets/images/search_icon.png'

function Discover() {
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [polls, setPolls] = useState([])
    const [pollsLoading, setPollsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        const fetchPolls = async () => {
            setPollsLoading(true)
            const token = localStorage.getItem('token')
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/public/polls?page=${page}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                })
                const data = res.data
                setPolls(prev => page === 1 ? data.data : [...prev, ...data.data])
                setHasMore(data.current_page < data.last_page)
            } catch (err) {
                console.error('Failed to fetch polls:', err)
            } finally {
                setPollsLoading(false)
            }
        }
        fetchPolls()
    }, [page])

    const filtered = polls.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) return (
        <p className="flex h-screen items-center justify-center font-semibold text-gray-500">Ielādējas...</p>
    )

    if (!user) return <Navigate to="/login" />

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <DashboardHeader title="Atklāt" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                <main className="p-6 pt-24 lg:p-12 lg:pt-24 max-w-7xl w-full">

                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="font-bold text-3xl tracking-tight mb-2 text-gray-900">Atklāt aptaujas</h1>
                            <p className="text-base text-gray-500">Piedalies citu lietotāju aptaujās.</p>
                        </div>
                    </div>

                    {!pollsLoading && polls.length > 0 && (
                        <div className="relative mb-6 max-w-md">
                            <img src={search_icon} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" alt="" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Meklēt aptaujas..."
                                className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-gray-400"
                            />
                        </div>
                    )}

                    {pollsLoading && polls.length === 0 ? (
                        <p className="text-center text-gray-400 font-medium py-16">Ielādējas...</p>
                    ) : filtered.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex flex-col items-center justify-center text-center">
                            <p className="font-semibold text-gray-700 mb-1">
                                {searchQuery ? 'Nav rezultātu' : 'Nav pieejamu aptauju'}
                            </p>
                            <p className="text-sm text-gray-400">
                                {searchQuery ? 'Mēģiniet citu meklēšanas frāzi.' : 'Mēģiniet vēlāk.'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {filtered.map(poll => (
                                    <div
                                        key={poll.id}
                                        onClick={() => navigate(`/poll/${poll.id}`)}
                                        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer flex flex-col gap-3"
                                    >
                                        {poll.categories?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {poll.categories.map(cat => (
                                                    <span key={cat} className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-md">
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-base leading-snug mb-1">{poll.title}</h3>
                                            {poll.description && (
                                                <p className="text-sm text-gray-500 line-clamp-2">{poll.description}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-md">
                                                {poll.responses_count} balsis
                                            </span>
                                            <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-md">
                                                {poll.questions_count} {poll.questions_count === 1 ? 'jautājums' : 'jautājumi'}
                                            </span>
                                            {poll.is_anonymous && (
                                                <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-md">Anonīma</span>
                                            )}
                                            {poll.requires_auth && (
                                                <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-md">Tikai reģistrēti</span>
                                            )}
                                        </div>

                                        <div className="pt-2 border-t border-gray-100">
                                            <span className="text-sm font-semibold text-primary">Atbildēt →</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {hasMore && !searchQuery && (
                                <div className="mt-8 flex justify-center">
                                    <button
                                        onClick={() => setPage(p => p + 1)}
                                        disabled={pollsLoading}
                                        className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-primary/40 hover:text-primary transition-all disabled:opacity-50"
                                    >
                                        {pollsLoading ? 'Ielādējas...' : 'Ielādēt vairāk'}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Discover
