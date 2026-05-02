import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Sidebar from '../layouts/Sidebar.jsx'
import DashboardHeader from '../layouts/DashboardHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import bar_chart_icon from '../assets/images/bar_chart_icon.png'
import active_polls_icon from '../assets/images/active_polls.png'
import user_icon from '../assets/images/user_icon.png'
import admin_icon from '../assets/images/admin_icon.png'

//added mock data with ai
const mockStats = {
    totalUsers: 142,
    totalPolls: 67,
    totalResponses: 3821,
    activePolls: 23,
}

const mockUsers = [
    { id: 1, username: 'Jānis Bērziņš',   email: 'janis@piemers.lv',   polls: 8,  joined: '2026-01-10', role: 'user' },
    { id: 2, username: 'Anna Kalniņa',     email: 'anna@piemers.lv',    polls: 3,  joined: '2026-01-22', role: 'user' },
    { id: 3, username: 'Pēteris Ozoliņš', email: 'peteris@piemers.lv', polls: 12, joined: '2026-02-05', role: 'user' },
    { id: 4, username: 'Marta Liepiņa',   email: 'marta@piemers.lv',   polls: 1,  joined: '2026-02-18', role: 'user' },
    { id: 5, username: 'Kārlis Vītols',   email: 'karlis@piemers.lv',  polls: 5,  joined: '2026-03-01', role: 'user' },
    { id: 6, username: 'Ilze Krūmiņa',    email: 'ilze@piemers.lv',    polls: 0,  joined: '2026-03-14', role: 'user' },
    { id: 7, username: 'PollerDemo',       email: 'demo@poller.lv',     polls: 20, joined: '2026-01-01', role: 'user' },
]

const mockPolls = [
    { id: 1,  title: 'Kāds ir tavs iecienītākais gadalaiks?',       author: 'PollerDemo',       responses: 54, status: 'active' },
    { id: 2,  title: 'Kādu transportu izmanto, dodoties uz darbu?', author: 'PollerDemo',       responses: 38, status: 'active' },
    { id: 3,  title: 'Kāda mūzika tev patīk visvairāk?',           author: 'PollerDemo',       responses: 71, status: 'active' },
    { id: 4,  title: 'Kāds sports tev patīk?',                     author: 'Jānis Bērziņš',   responses: 22, status: 'active' },
    { id: 5,  title: 'Kādas ir tavas vasaras aktivitātes?',         author: 'Anna Kalniņa',    responses: 15, status: 'active' },
    { id: 6,  title: 'Kāda ir tava darba vide?',                   author: 'Pēteris Ozoliņš', responses: 49, status: 'closed' },
    { id: 7,  title: 'Vai tev ir mājdzīvnieks?',                   author: 'PollerDemo',       responses: 63, status: 'active' },
    { id: 8,  title: 'Kādus sociālos tīklus tu izmanto?',          author: 'Kārlis Vītols',   responses: 31, status: 'active' },
    { id: 9,  title: 'Kā tu svin Ziemassvētkus?',                  author: 'Marta Liepiņa',   responses: 8,  status: 'draft'  },
    { id: 10, title: 'Latvija vai ārzemēs — kur dzīvot?',          author: 'PollerDemo',       responses: 44, status: 'active' },
]

const statusStyles = {
    active: 'text-green-600 bg-green-50',
    closed: 'text-red-600 bg-red-50',
    draft:  'text-amber-600 bg-amber-50',
}

const statusLabels = {
    active: 'Aktīva',
    closed: 'Slēgta',
    draft:  'Melnraksts',
}

const primaryFilter = 'invert(11%) sepia(68%) saturate(4529%) hue-rotate(298deg) brightness(85%) contrast(106%)'

function Dashboard() {
    const { user, loading } = useAuth()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')
    const [userSearch, setUserSearch] = useState('')
    const [pollSearch, setPollSearch] = useState('')

    if (loading) return (
        <p className="flex h-screen items-center justify-center font-semibold text-gray-500">Ielādējas...</p>
    )

    if (!user) return <Navigate to="/login" />
    if (user.role !== 'admin') return <Navigate to="/home" />

    const filteredUsers = mockUsers.filter(u =>
        u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase())
    )

    const filteredPolls = mockPolls.filter(p =>
        p.title.toLowerCase().includes(pollSearch.toLowerCase()) ||
        p.author.toLowerCase().includes(pollSearch.toLowerCase())
    )

    const tabs = [
        { key: 'overview', label: 'Pārskats' },
        { key: 'users',    label: 'Lietotāji' },
        { key: 'polls',    label: 'Aptaujas'  },
    ]

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <DashboardHeader title="Administrācija" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                <main className="p-6 pt-24 lg:p-12 lg:pt-24 max-w-7xl w-full">

                    {/* header */}
                    <div className="mb-8">
                        <h1 className="font-bold text-3xl tracking-tight text-gray-900 mb-1">Admin panelis</h1>
                        <p className="text-base text-gray-500">Sistēmas pārskats un pārvaldība.</p>
                    </div>

                    {/* tabs */}
                    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* overview */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                <StatCard icon={user_icon}        iconBg="bg-blue-50"      value={mockStats.totalUsers}     label="Lietotāji" />
                                <StatCard icon={active_polls_icon} iconBg="bg-green-50"   value={mockStats.activePolls}    label="Aktīvās aptaujas" />
                                <StatCard icon={admin_icon}        iconBg="bg-primary/10" iconFilter={primaryFilter} value={mockStats.totalPolls}     label="Kopā aptaujas" />
                                <StatCard icon={bar_chart_icon}    iconBg="bg-amber-50"   iconFilter="invert(60%) sepia(80%) saturate(400%) hue-rotate(5deg)" value={mockStats.totalResponses}  label="Kopā atbildes" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* recent users */}
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                        <h2 className="font-bold text-gray-900">Jaunākie lietotāji</h2>
                                        <button onClick={() => setActiveTab('users')} className="text-xs font-semibold text-primary hover:underline">
                                            Skatīt visus
                                        </button>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {mockUsers.slice(0, 5).map(u => (
                                            <div key={u.id} className="px-6 py-3 flex items-center justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-gray-900 truncate">{u.username}</p>
                                                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                                                </div>
                                                <span className="text-xs text-gray-400 shrink-0">{u.joined}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* recent polls */}
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                        <h2 className="font-bold text-gray-900">Jaunākās aptaujas</h2>
                                        <button onClick={() => setActiveTab('polls')} className="text-xs font-semibold text-primary hover:underline">
                                            Skatīt visas
                                        </button>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {mockPolls.slice(0, 5).map(p => (
                                            <div key={p.id} className="px-6 py-3 flex items-center justify-between gap-4">
                                                <p className="text-sm font-semibold text-gray-900 truncate flex-1">{p.title}</p>
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md shrink-0 ${statusStyles[p.status]}`}>
                                                    {statusLabels[p.status]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* users */}
                    {activeTab === 'users' && (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <h2 className="font-bold text-gray-900">Visi lietotāji <span className="text-gray-400 font-normal text-sm">({filteredUsers.length})</span></h2>
                                <input
                                    type="text"
                                    value={userSearch}
                                    onChange={e => setUserSearch(e.target.value)}
                                    placeholder="Meklēt pēc vārda vai e-pasta..."
                                    className="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary/50 w-full sm:w-64 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                            <th className="px-6 py-3 text-left">Lietotājs</th>
                                            <th className="px-6 py-3 text-left">E-pasts</th>
                                            <th className="px-6 py-3 text-left">Aptaujas</th>
                                            <th className="px-6 py-3 text-left">Reģistrācija</th>
                                            <th className="px-6 py-3 text-left">Loma</th>
                                            <th className="px-6 py-3 text-left">Darbības</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredUsers.map(u => (
                                            <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-semibold text-gray-900">{u.username}</td>
                                                <td className="px-6 py-4 text-gray-500">{u.email}</td>
                                                <td className="px-6 py-4 text-gray-700 font-medium">{u.polls}</td>
                                                <td className="px-6 py-4 text-gray-400">{u.joined}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${u.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                                                        {u.role === 'admin' ? 'Admins' : 'Lietotājs'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors">
                                                        Bloķēt
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredUsers.length === 0 && (
                                    <p className="text-center text-gray-400 text-sm py-10">Nav rezultātu.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* polls */}
                    {activeTab === 'polls' && (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <h2 className="font-bold text-gray-900">Visas aptaujas <span className="text-gray-400 font-normal text-sm">({filteredPolls.length})</span></h2>
                                <input
                                    type="text"
                                    value={pollSearch}
                                    onChange={e => setPollSearch(e.target.value)}
                                    placeholder="Meklēt pēc nosaukuma vai autora..."
                                    className="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary/50 w-full sm:w-72 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                            <th className="px-6 py-3 text-left">Nosaukums</th>
                                            <th className="px-6 py-3 text-left">Autors</th>
                                            <th className="px-6 py-3 text-left">Atbildes</th>
                                            <th className="px-6 py-3 text-left">Statuss</th>
                                            <th className="px-6 py-3 text-left">Darbības</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredPolls.map(p => (
                                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs truncate">{p.title}</td>
                                                <td className="px-6 py-4 text-gray-500">{p.author}</td>
                                                <td className="px-6 py-4 text-gray-700 font-medium">{p.responses}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${statusStyles[p.status]}`}>
                                                        {statusLabels[p.status]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors">
                                                        Dzēst
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredPolls.length === 0 && (
                                    <p className="text-center text-gray-400 text-sm py-10">Nav rezultātu.</p>
                                )}
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    )
}

export default Dashboard
