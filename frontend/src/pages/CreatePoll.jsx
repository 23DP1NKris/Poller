import { useAuth } from "../context/AuthContext.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Sidebar from "../layouts/Sidebar.jsx"
import DashboardHeader from "../layouts/DashboardHeader.jsx"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import LargeInput from "../components/LargeInput.jsx"
import LargeTextArea from "../components/LargeTextarea.jsx"
import NoBackgroundBtn from "../components/NoBackgroundBtn.jsx"
import dropdown_arrow from "../assets/images/dropdown_arrow_down.png"
import trash_icon from "../assets/images/trash_icon.png"
import drag_handle from "../assets/images/drag_handle.png"
import info_icon from "../assets/images/info_icon.png"
import settings_icon from "../assets/images/settings_icon.png"
import tip_icon from "../assets/images/tip_icon.png"

function CreatePoll() {
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [draggedItemIndex, setDraggedItemIndex] = useState(null)
    const [isAddingCategory, setIsAddingCategory] = useState(false)
    const [newCategoryText, setNewCategoryText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})

    const [pollData, setPollData] = useState({
        title: '',
        description: '',
        isAnonymous: false,
        showStats: true,
        allowMultipleVotes: false,
        isPublic: true,
        hasDeadline: false,
        deadline: '',
        categories: ['Bizness']
    })

    const [questions, setQuestions] = useState([
        {
            id: Date.now(),
            text: '',
            isExpanded: true,
            isMultipleChoice: false,
            isRequired: false,
            options: ['', '']
        }
    ])

    const addQuestion = () => {
        setQuestions(prev => [
            ...prev,
            {
                id: Date.now() + Math.random(),
                text: '',
                isExpanded: true,
                isMultipleChoice: false,
                isRequired: false,
                options: ['', '']
            }
        ])
    }

    const removeQuestion = (id) => {
        if (questions.length > 1) {
            setQuestions(prev => prev.filter(q => q.id !== id))
        }
    }

    const handleQuestionTextChange = (index, value) => {
        setQuestions(prev => prev.map((q, i) =>
            i === index ? { ...q, text: value } : q
        ))
    }

    const toggleQuestionSetting = (index, field) => {
        setQuestions(prev => prev.map((q, i) =>
            i === index ? { ...q, [field]: !q[field] } : q
        ))
    }

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        setQuestions(prev => prev.map((q, i) => {
            if (i === questionIndex) {
                const newOptions = [...q.options]
                newOptions[optionIndex] = value
                return { ...q, options: newOptions }
            }
            return q
        }))
    }

    const addOption = (questionIndex) => {
        setQuestions(prev => prev.map((q, i) =>
            i === questionIndex ? { ...q, options: [...q.options, ''] } : q
        ))
    }

    const removeOption = (questionIndex, optionIndex) => {
        setQuestions(prev => prev.map((q, i) => {
            if (i === questionIndex && q.options.length > 1) {
                return { ...q, options: q.options.filter((_, idx) => idx !== optionIndex) }
            }
            return q
        }))
    }

    const addCategory = (catName) => {
        const trimmed = catName.trim()
        if (trimmed && !pollData.categories.includes(trimmed)) {
            setPollData({ ...pollData, categories: [...pollData.categories, trimmed] })
        }
        setNewCategoryText('')
        setIsAddingCategory(false)
    }

    const removeCategory = (catName) => {
        setPollData({
            ...pollData,
            categories: pollData.categories.filter(c => c !== catName)
        })
    }

    const handleDragStart = (e, index) => {
        setDraggedItemIndex(index)
        e.dataTransfer.effectAllowed = 'move'
        const img = new Image()
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        e.dataTransfer.setDragImage(img, 0, 0)
    }

    const handleDragOver = (e, index) => {
        e.preventDefault()
        if (draggedItemIndex === null || draggedItemIndex === index) return

        setQuestions(prev => {
            const newQuestions = [...prev]
            const draggedItem = newQuestions[draggedItemIndex]
            newQuestions.splice(draggedItemIndex, 1)
            newQuestions.splice(index, 0, draggedItem)
            return newQuestions
        })
        setDraggedItemIndex(index)
    }

    const handleDragEnd = () => {
        setDraggedItemIndex(null)
    }

    const validate = () => {
        const newErrors = {}

        if (!pollData.title.trim()) {
            newErrors.title = 'Aptaujas nosaukums ir obligāts.'
        }

        questions.forEach((q, qi) => {
            if (!q.text.trim()) {
                newErrors[`question_${qi}_text`] = `${qi + 1}. jautājumam jābūt tekstam.`
            }
            const filledOptions = q.options.filter(o => o.trim())
            if (filledOptions.length < 2) {
                newErrors[`question_${qi}_options`] = `${qi + 1}. jautājumam jābūt vismaz diviem variantiem.`
            }
        })

        return newErrors
    }

    const handleSubmit = async (status) => {
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({})
        setIsSubmitting(true)

        const payload = {
            title: pollData.title,
            description: pollData.description || null,
            status,
            is_anonymous: pollData.isAnonymous,
            show_stats: pollData.showStats,
            allow_multiple_votes: pollData.allowMultipleVotes,
            is_public: pollData.isPublic,
            expires_at: pollData.hasDeadline && pollData.deadline ? pollData.deadline : null,
            categories: pollData.categories.length > 0 ? pollData.categories : null,
            questions: questions.map(q => ({
                text: q.text,
                is_multiple_choice: q.isMultipleChoice,
                is_required: q.isRequired,
                options: q.options.filter(o => o.trim())
            }))
        }

        try {
            const token = localStorage.getItem('token')
            await axios.post('http://127.0.0.1:8000/api/polls', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            })
            navigate('/active-polls')
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors)
            } else {
                setErrors({ general: 'Kļūda saglabājot aptauju. Lūdzu mēģiniet vēlreiz.' })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading && !user) return (
        <p className="flex h-screen items-center justify-center font-semibold text-gray-500">
            Ielādējas...
        </p>
    )

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <DashboardHeader
                    title="Izveidot aptauju"
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                />

                <main className="p-6 pt-28 lg:p-12 lg:pt-32 max-w-7xl mx-auto w-full">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="font-bold text-3xl tracking-tight mb-2 text-gray-900">Izveidot jaunu aptauju</h1>
                            <p className="text-base text-gray-500 max-w-2xl">Definējiet savas aptaujas mērķi un jautājumus, lai iegūtu vērtīgu auditorijas viedokli.</p>
                        </div>
                        <NoBackgroundBtn text="Saglabāt melnrakstu" onClick={() => handleSubmit('draft')} />
                    </div>

                    {errors.general && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                            {errors.general}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-6">

                            {/* poll info */}
                            <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <img src={info_icon} className="w-5 h-5" alt="info" />
                                    <h3 className="text-lg font-bold text-gray-900">Aptaujas Informācija</h3>
                                </div>
                                <div className="space-y-6">
                                    <LargeInput
                                        text="Aptaujas nosaukums"
                                        placeholder="Ievadiet aptaujas nosaukumu..."
                                        value={pollData.title}
                                        onChange={(e) => setPollData({...pollData, title: e.target.value})}
                                        error={errors.title}
                                    />

                                    <LargeTextArea
                                        id="poll-desc"
                                        text="Apraksts"
                                        placeholder="Aprakstiet aptaujas mērķi un kontekstu..."
                                        value={pollData.description}
                                        maxLength={250}
                                        onChange={(e) => setPollData({...pollData, description: e.target.value})}
                                    />
                                </div>
                            </section>

                            {/* questions */}
                            {questions.map((question, questionIndex) => (
                                <section
                                    key={question.id}
                                    onDragOver={(e) => handleDragOver(e, questionIndex)}
                                    className={`bg-white rounded-2xl border shadow-sm transition-all duration-200 ${errors[`question_${questionIndex}_text`] || errors[`question_${questionIndex}_options`] ? 'border-red-300' : 'border-gray-200'} ${draggedItemIndex === questionIndex ? 'opacity-40 scale-95' : 'opacity-100'}`}
                                >
                                    <div className="flex items-center justify-between p-4 border-b border-gray-50">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, questionIndex)}
                                                onDragEnd={handleDragEnd}
                                                className="cursor-grab active:cursor-grabbing p-1"
                                            >
                                                <img src={drag_handle} className="w-5 h-5 opacity-30" alt="drag" />
                                            </div>
                                            <input
                                                type="text"
                                                value={question.text}
                                                onChange={(e) => handleQuestionTextChange(questionIndex, e.target.value)}
                                                placeholder="Ievadiet jautājumu..."
                                                className="bg-transparent font-bold text-gray-800 outline-none w-full border-b border-transparent focus:border-primary/30"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleQuestionSetting(questionIndex, 'isExpanded')}
                                                className={`p-2 rounded-lg hover:bg-gray-100 transition-transform ${!question.isExpanded ? '-rotate-90' : ''}`}
                                            >
                                                <img src={dropdown_arrow} className="w-5 h-5 opacity-60" alt="toggle" />
                                            </button>
                                            <button
                                                onClick={() => removeQuestion(question.id)}
                                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                            >
                                                <img src={trash_icon} className="w-5 h-5" alt="delete" />
                                            </button>
                                        </div>
                                    </div>

                                    {question.isExpanded && (
                                        <div className="p-6 space-y-6">
                                            <div className="flex flex-wrap items-center gap-8 py-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-medium text-gray-600">Vienas izvēles</span>
                                                    <button
                                                        onClick={() => toggleQuestionSetting(questionIndex, 'isMultipleChoice')}
                                                        className={`w-10 h-5 rounded-full transition-colors relative ${question.isMultipleChoice ? 'bg-primary' : 'bg-gray-200'}`}
                                                    >
                                                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${question.isMultipleChoice ? 'left-6' : 'left-1'}`} />
                                                    </button>
                                                    <span className="text-sm font-medium text-gray-600">Vairāku izvēļu</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-medium text-gray-600">Obligāts</span>
                                                    <button
                                                        onClick={() => toggleQuestionSetting(questionIndex, 'isRequired')}
                                                        className={`w-10 h-5 rounded-full transition-colors relative ${question.isRequired ? 'bg-primary' : 'bg-gray-200'}`}
                                                    >
                                                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${question.isRequired ? 'left-6' : 'left-1'}`} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {question.options.map((option, optionIndex) => (
                                                    <div key={optionIndex} className="flex items-center gap-3 group">
                                                        <div className="flex-1 p-3 bg-gray-50 rounded-xl border border-transparent group-focus-within:border-primary/20 transition-all">
                                                            <input
                                                                type="text"
                                                                value={option}
                                                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                                                placeholder={`${optionIndex + 1}. variants`}
                                                                className="bg-transparent w-full outline-none text-sm"
                                                            />
                                                        </div>
                                                        <button
                                                            onClick={() => removeOption(questionIndex, optionIndex)}
                                                            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                                {(errors[`question_${questionIndex}_text`] || errors[`question_${questionIndex}_options`]) && (
                                                    <p className="text-xs text-red-500 font-medium">
                                                        {errors[`question_${questionIndex}_text`] || errors[`question_${questionIndex}_options`]}
                                                    </p>
                                                )}
                                                <button
                                                    onClick={() => addOption(questionIndex)}
                                                    className="flex items-center gap-2 text-primary font-bold text-sm mt-2"
                                                >
                                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs">+</span>
                                                    Pievienot variantu
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            ))}

                            <button
                                onClick={addQuestion}
                                className="w-full py-8 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-bold flex flex-col items-center justify-center gap-2 hover:border-primary/40 hover:text-primary transition-all bg-white/50"
                            >
                                <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">+</span>
                                Pievienot jaunu jautājumu
                            </button>
                        </div>

                        {/* right side settings and tips */}
                        <div className="lg:col-span-4 space-y-6">
                            <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <div className="flex gap-2">
                                    <img src={settings_icon} alt="Aptaujas iestatījumi" className="h-6 w-6"/>
                                    <h3 className="text-md font-bold mb-6 flex items-center gap-2">Aptaujas Iestatījumi</h3>
                                </div>

                                <div className="space-y-1">
                                    <div className="py-4 flex justify-between items-start gap-4">
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">Anonīma balsošana</p>
                                            <p className="text-xs text-gray-400 leading-tight">Neuzkrāt respondentu personīgo informāciju</p>
                                        </div>
                                        <button
                                            onClick={() => setPollData({...pollData, isAnonymous: !pollData.isAnonymous})}
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
                                            onClick={() => setPollData({...pollData, showStats: !pollData.showStats})}
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
                                            onClick={() => setPollData({...pollData, allowMultipleVotes: !pollData.allowMultipleVotes})}
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
                                            onClick={() => setPollData({...pollData, isPublic: !pollData.isPublic})}
                                            className={`w-10 h-6 rounded-full shrink-0 transition-colors relative ${pollData.isPublic ? 'bg-primary' : 'bg-gray-200'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pollData.isPublic ? 'left-5' : 'left-1'}`} />
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
                                                    onClick={() => setPollData({...pollData, hasDeadline: !pollData.hasDeadline, deadline: ''})}
                                                    className={`w-8 h-4 rounded-full shrink-0 transition-colors relative ${!pollData.hasDeadline ? 'bg-primary' : 'bg-gray-200'}`}
                                                >
                                                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${!pollData.hasDeadline ? 'left-4' : 'left-0.5'}`} />
                                                </button>
                                            </div>
                                        </div>
                                        {pollData.hasDeadline && (
                                            <input
                                                type="date"
                                                value={pollData.deadline}
                                                onChange={(e) => setPollData({...pollData, deadline: e.target.value})}
                                                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-primary/50 focus:bg-white transition-all"
                                            />
                                        )}
                                    </div>

                                    {/* categories */}
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Kategorijas</label>
                                        <div className="flex flex-wrap gap-2">
                                            {pollData.categories.map(cat => (
                                                <span key={cat} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg flex items-center gap-1">
                                                    {cat}
                                                    <button onClick={() => removeCategory(cat)} className="ml-1 hover:text-red-500">✕</button>
                                                </span>
                                            ))}

                                            {isAddingCategory ? (
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
                                        text={isSubmitting ? 'Saglabā...' : 'Publicēt aptauju'}
                                        onClick={() => handleSubmit('active')}
                                    />
                                </div>
                            </section>

                            <section className="bg-white space-y-2 p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                                <div className="flex">
                                    <img src={tip_icon} alt="Padoms" className="h-6 w-6" />
                                    <h4 className="font-bold text-sm text-gray-900">Padoms</h4>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Pievienojiet vairāk jautājumus, lai uzzinātu precīzāku auditorijas viedokli par Jūsu tēmu! Pārdomātas kategorijas palīdzēs lietotājiem vieglāk atrast Jūsu aptauju.
                                </p>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CreatePoll
