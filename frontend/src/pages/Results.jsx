import { useAuth } from "../context/AuthContext.jsx"
import { useState, useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"
import Sidebar from "../layouts/Sidebar.jsx"
import DashboardHeader from "../layouts/DashboardHeader.jsx"
import StatsCards from "../layouts/StatsCards.jsx"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import NoBackgroundBtn from "../components/NoBackgroundBtn.jsx"
import bar_chart_icon from "../assets/images/bar_chart_icon.png"
import dropdown_arrow_down from "../assets/images/dropdown_arrow_down.png"
import close_icon from "../assets/images/close_icon.png"
import sad_face from "../assets/images/sad_face.png"

const OPTION_COLORS = ['bg-primary', 'bg-violet-500', 'bg-blue-500', 'bg-amber-500', 'bg-emerald-500']

function PollResultDetail({ poll }) {
    return (
        <div className="space-y-8">
            {poll.questions?.map((question, qi) => {
                const totalVotes = question.options.reduce((sum, o) => sum + (o.votes_count ?? 0), 0)
                return (
                    <div key={question.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                            {qi + 1}. jautājums
                        </p>
                        <p className="font-bold text-gray-900 text-base mb-5">{question.text}</p>
                        <div className="space-y-4">
                            {question.options.map((option, oi) => {
                                const votes = option.votes_count ?? 0
                                const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
                                const color = OPTION_COLORS[oi % OPTION_COLORS.length]
                                return (
                                    <div key={option.id}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-sm font-medium text-gray-800">{option.text}</span>
                                            <span className="text-sm font-bold text-gray-500 shrink-0 ml-4">
                                                {pct}%
                                                <span className="text-gray-400 font-normal ml-1">({votes})</span>
                                            </span>
                                        </div>
                                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${color}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <p className="text-xs text-gray-400 mt-4">
                            {totalVotes} {totalVotes === 1 ? 'balss' : 'balsis'} kopā
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

function Results() {
    const { user, loading } = useAuth()
    const { id } = useParams()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [polls, setPolls] = useState([])
    const [singlePoll, setSinglePoll] = useState(null)
    const [pollsLoading, setPollsLoading] = useState(true)
    const [expandedIds, setExpandedIds] = useState(new Set())
    const [fetchError, setFetchError] = useState(null)
    const [isExporting, setIsExporting] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (id) {
            axios.get(`http://127.0.0.1:8000/api/polls/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => setSinglePoll(res.data.poll))
                .catch(err => setFetchError(err.response?.status === 403 ? 'forbidden' : 'notfound'))
                .finally(() => setPollsLoading(false))
        } else {
            axios.get('http://127.0.0.1:8000/api/polls', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => {
                    const fetched = res.data.polls
                    setPolls(fetched)
                    setExpandedIds(new Set(fetched.map(p => p.id)))
                })
                .catch(err => console.error('Failed to fetch polls:', err))
                .finally(() => setPollsLoading(false))
        }
    }, [id])

    const toggleExpand = (pollId) => {
        setExpandedIds(prev => {
            const next = new Set(prev)
            next.has(pollId) ? next.delete(pollId) : next.add(pollId)
            return next
        })
    }

    const exportCSV = async () => {
        setIsExporting(true)
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://127.0.0.1:8000/api/polls/${id}/export`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const { poll_title, questions, responses } = res.data

            const escape = (val) => {
                const str = String(val ?? '')
                return str.includes(',') || str.includes('"') || str.includes('\n')
                    ? `"${str.replace(/"/g, '""')}"`
                    : str
            }

            const headers = ['Atbilžu ID', 'Iesniegšanas laiks', ...questions]
            const lines = [
                headers.map(escape).join(','),
                ...responses.map(row => row.map(escape).join(','))
            ]

            const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${poll_title}.csv`
            a.click()
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error('Export failed:', err)
        } finally {
            setIsExporting(false)
        }
    }

    if (loading) return (
        <p className="flex h-screen items-center justify-center font-semibold text-gray-500">
            Ielādējas...
        </p>
    )

    if (!user) return <Navigate to="/login" />

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <DashboardHeader
                    title="Rezultāti"
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                />

                <main className="p-6 pt-24 lg:p-12 lg:pt-24 max-w-7xl w-full">

                    {/* single poll view */}
                    {id ? (
                        pollsLoading ? (
                            <p className="text-center text-gray-400 font-medium py-16">Ielādējas...</p>
                        ) : fetchError ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 bg-gray-100">
                                    <img
                                        src={fetchError === 'forbidden' ? close_icon : sad_face}
                                        className="w-8 h-8"
                                        alt=""
                                    />
                                </div>
                                <h2 className="font-bold text-gray-900 text-xl mb-2">
                                    {fetchError === 'forbidden' ? 'Piekļuve liegta' : 'Aptauja nav atrasta'}
                                </h2>
                                <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-6">
                                    {fetchError === 'forbidden'
                                        ? 'Jums nav atļaujas skatīt šīs aptaujas rezultātus.'
                                        : 'Aptauja ar šo adresi neeksistē vai ir dzēsta.'}
                                </p>
                                <Link to="/polls"><WithBackgroundBtn text="Uz aptaujām" /></Link>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-start justify-between mb-10">
                                    <div>
                                        <Link
                                            to="/polls"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-primary transition-colors mb-3"
                                        >
                                            <img src={dropdown_arrow_down} className="w-4 h-4 rotate-90 opacity-75" alt="" />
                                            Aptaujas
                                        </Link>
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className={`flex items-center gap-1.5 text-xs font-semibold ${singlePoll.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                                                {singlePoll.status === 'active' && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                                                {singlePoll.status === 'active' ? 'Aktīva' : singlePoll.status === 'draft' ? 'Melnraksts' : 'Slēgta'}
                                            </span>
                                            {singlePoll.categories?.map(cat => (
                                                <span key={cat} className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-md">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                        <h1 className="font-bold text-3xl tracking-tight text-gray-900">{singlePoll.title}</h1>
                                        {singlePoll.description && (
                                            <p className="text-base text-gray-500 mt-1 max-w-2xl">{singlePoll.description}</p>
                                        )}
                                    </div>
                                    <NoBackgroundBtn
                                        text={isExporting ? 'Eksportē...' : 'Eksportēt CSV'}
                                        onClick={exportCSV}
                                    />
                                </div>
                                <PollResultDetail poll={singlePoll} />
                            </>
                        )
                    ) : (
                        /* all polls overview */
                        <>
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h1 className="font-bold text-3xl tracking-tight mb-2 text-gray-900">Aptauju Rezultāti</h1>
                                    <p className="text-base text-gray-500">Skatiet atbilžu sadalījumu katrai aptaujai.</p>
                                </div>
                                <Link to="/polls">
                                    <WithBackgroundBtn text="Uz aptaujām" />
                                </Link>
                            </div>

                            <StatsCards stats={[
                                { label: 'Kopā aptaujas', value: polls.length },
                                { label: 'Kopējās balsis', value: 0 },
                                { label: 'Aktīvās aptaujas', value: polls.filter(p => p.status === 'active').length },
                            ]} />

                            {pollsLoading ? (
                                <p className="text-center text-gray-400 font-medium py-16">Ielādējas...</p>
                            ) : polls.length === 0 ? (
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-16 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                                        <img
                                            src={bar_chart_icon}
                                            className="w-8 h-8"
                                            style={{ filter: 'invert(11%) sepia(68%) saturate(4529%) hue-rotate(298deg) brightness(85%) contrast(106%)' }}
                                            alt=""
                                        />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">Nav nevienas aptaujas</h3>
                                    <p className="text-sm text-gray-400 mb-6 max-w-xs leading-relaxed">Izveidojiet aptauju, lai šeit redzētu tās rezultātus.</p>
                                    <Link to="/create-poll"><WithBackgroundBtn text="Izveidot aptauju" /></Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {polls.map(poll => {
                                        const isExpanded = expandedIds.has(poll.id)
                                        return (
                                            <div key={poll.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                                <button
                                                    onClick={() => toggleExpand(poll.id)}
                                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/60 transition-colors"
                                                >
                                                    <div className="min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                                            <span className={`flex items-center gap-1.5 text-xs font-semibold ${poll.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                                                                {poll.status === 'active' && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                                                                {poll.status === 'active' ? 'Aktīva' : poll.status === 'draft' ? 'Melnraksts' : 'Slēgta'}
                                                            </span>
                                                            {poll.categories?.map(cat => (
                                                                <span key={cat} className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-md">
                                                                    {cat}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <h3 className="font-bold text-gray-900 text-lg">{poll.title}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-4 shrink-0 ml-4">
                                                        <span className="hidden sm:block text-sm text-gray-400">
                                                            <span className="font-semibold text-gray-700">0</span> balsis
                                                        </span>
                                                        <img
                                                            src={dropdown_arrow_down}
                                                            className={`w-5 h-5 opacity-40 transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                </button>
                                                {isExpanded && (
                                                    <div className="border-t border-gray-100 px-6 pb-6 pt-6">
                                                        <PollResultDetail poll={poll} />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Results
