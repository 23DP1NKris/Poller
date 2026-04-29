import { useState } from "react"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import settings_icon from "../assets/images/settings_icon.png"

function PollSettings({ pollData, setPollData, isSubmitting, onSubmit, submitText = 'Publicēt aptauju', errors = {} }) {
    const [isAddingCategory, setIsAddingCategory] = useState(false)
    const [newCategoryText, setNewCategoryText] = useState('')

    const today = new Date()
    const todayStr = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0')
    ].join('-')

    const addCategory = (catName) => {
        const trimmed = catName.trim()
        if (trimmed && !pollData.categories.includes(trimmed) && pollData.categories.length < 8) {
            setPollData({ ...pollData, categories: [...pollData.categories, trimmed] })
        }
        setNewCategoryText('')
        setIsAddingCategory(false)
    }

    const removeCategory = (catName) => {
        setPollData({ ...pollData, categories: pollData.categories.filter(c => c !== catName) })
    }

    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex gap-2">
                <img src={settings_icon} alt="Aptaujas iestatījumi" className="h-6 w-6" />
                <h3 className="text-md font-bold mb-6 flex items-center gap-2">Aptaujas Iestatījumi</h3>
            </div>

            <div className="space-y-1">
                <div className={`py-4 flex justify-between items-start gap-4 ${pollData.requiresAuth ? 'opacity-40' : ''}`}>
                    <div>
                        <p className="text-sm font-bold text-gray-800">Anonīma balsošana</p>
                        <p className="text-xs text-gray-400 leading-tight">Neuzkrāt respondentu personīgo informāciju</p>
                    </div>
                    <button
                        disabled={pollData.requiresAuth}
                        onClick={() => setPollData({ ...pollData, isAnonymous: !pollData.isAnonymous, requiresAuth: false })}
                        className={`w-10 h-6 rounded-full shrink-0 transition-colors relative ${pollData.isAnonymous ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pollData.isAnonymous ? 'left-5' : 'left-1'}`} />
                    </button>
                </div>

                <div className="py-4 flex justify-between items-start gap-4">
                    <div>
                        <p className="text-sm font-bold text-gray-800">Rādīt statistiku pirms beigām</p>
                        <p className="text-xs text-gray-400 leading-tight">Ļaut redzēt rezultātus uzreiz pēc balsošanas</p>
                    </div>
                    <button
                        onClick={() => setPollData({ ...pollData, showStats: !pollData.showStats })}
                        className={`w-10 h-6 rounded-full shrink-0 transition-colors relative ${pollData.showStats ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pollData.showStats ? 'left-5' : 'left-1'}`} />
                    </button>
                </div>

                <div className="py-4 flex justify-between items-start gap-4">
                    <div>
                        <p className="text-sm font-bold text-gray-800">Vairākas balsis vienam</p>
                        <p className="text-xs text-gray-400 leading-tight">Viens lietotājs var balsot vairākas reizes</p>
                    </div>
                    <button
                        onClick={() => setPollData({ ...pollData, allowMultipleVotes: !pollData.allowMultipleVotes })}
                        className={`w-10 h-6 rounded-full shrink-0 transition-colors relative ${pollData.allowMultipleVotes ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pollData.allowMultipleVotes ? 'left-5' : 'left-1'}`} />
                    </button>
                </div>

                <div className="py-4 flex justify-between items-start gap-4">
                    <div>
                        <p className="text-sm font-bold text-gray-800">Publiska aptauja</p>
                        <p className="text-xs text-gray-400 leading-tight">Redzama visiem lietotājiem</p>
                    </div>
                    <button
                        onClick={() => setPollData({ ...pollData, isPublic: !pollData.isPublic })}
                        className={`w-10 h-6 rounded-full shrink-0 transition-colors relative ${pollData.isPublic ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pollData.isPublic ? 'left-5' : 'left-1'}`} />
                    </button>
                </div>

                <div className={`py-4 flex justify-between items-start gap-4 ${pollData.isAnonymous ? 'opacity-40' : ''}`}>
                    <div>
                        <p className="text-sm font-bold text-gray-800">Tikai autorizētiem lietotājiem</p>
                        <p className="text-xs text-gray-400 leading-tight">Balsot var tikai reģistrēti lietotāji</p>
                    </div>
                    <button
                        disabled={pollData.isAnonymous}
                        onClick={() => setPollData({ ...pollData, requiresAuth: !pollData.requiresAuth, isAnonymous: false })}
                        className={`w-10 h-6 rounded-full shrink-0 transition-colors relative ${pollData.requiresAuth ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pollData.requiresAuth ? 'left-5' : 'left-1'}`} />
                    </button>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50 space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Aptaujas termiņš</label>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-500">Bez termiņa</span>
                            <button
                                onClick={() => setPollData({ ...pollData, hasDeadline: !pollData.hasDeadline, deadline: '' })}
                                className={`w-8 h-4 rounded-full shrink-0 transition-colors relative ${!pollData.hasDeadline ? 'bg-primary' : 'bg-gray-200'}`}
                            >
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${!pollData.hasDeadline ? 'left-4' : 'left-0.5'}`} />
                            </button>
                        </div>
                    </div>
                    {pollData.hasDeadline && (
                        <>
                            <input
                                type="date"
                                lang="en-GB"
                                min={todayStr}
                                value={pollData.deadline}
                                onChange={(e) => setPollData({ ...pollData, deadline: e.target.value })}
                                className={`w-full p-3 bg-gray-50 border rounded-xl text-sm outline-none focus:bg-white transition-all ${errors.deadline ? 'border-red-300 focus:border-red-400' : 'border-gray-100 focus:border-primary/50'}`}
                            />
                            {errors.deadline && (
                                <p className="text-xs text-red-500 font-medium mt-1.5">{errors.deadline}</p>
                            )}
                        </>
                    )}
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Kategorijas</label>
                    <div className="flex flex-wrap gap-2">
                        {pollData.categories.map(cat => (
                            <span key={cat} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg flex items-center gap-1">
                                {cat}
                                <button onClick={() => removeCategory(cat)} className="ml-1 hover:text-red-500">✕</button>
                            </span>
                        ))}

                        {pollData.categories.length < 8 && (
                            isAddingCategory ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newCategoryText}
                                        onChange={(e) => setNewCategoryText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addCategory(newCategoryText)}
                                        className="px-3 py-1 text-xs border border-primary/40 rounded-lg outline-none w-28 bg-gray-50"
                                        placeholder="Nosaukums..."
                                        autoFocus
                                    />
                                    <button onClick={() => addCategory(newCategoryText)} className="text-primary text-xs font-bold hover:underline">Pievienot</button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsAddingCategory(true)}
                                    className="px-3 py-1 border border-dashed border-gray-300 text-gray-400 text-xs font-bold rounded-lg hover:border-primary hover:text-primary transition-colors"
                                >
                                    + Pievienot jaunu
                                </button>
                            )
                        )}
                    </div>

                    <div className="mt-3">
                        <p className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Ieteiktās</p>
                        <div className="flex flex-wrap gap-2">
                            {['Tehnoloģijas', 'Izklaide', 'Dzīvesveids', 'Bizness', 'Skola']
                                .filter(c => !pollData.categories.includes(c))
                                .map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => addCategory(cat)}
                                        className="px-2 py-1 bg-gray-50 border border-gray-100 text-gray-500 text-xs rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        + {cat}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <WithBackgroundBtn
                    text={isSubmitting ? 'Saglabā...' : submitText}
                    onClick={() => onSubmit('active')}
                />
            </div>
        </section>
    )
}

export default PollSettings
