import { useAuth } from "../context/AuthContext.jsx"
import { useState, useEffect } from "react"
import { useNavigate, useParams, Navigate } from "react-router-dom"
import axios from "axios"
import Sidebar from "../layouts/Sidebar.jsx"
import DashboardHeader from "../layouts/DashboardHeader.jsx"
import PollInfoSection from "../layouts/PollInfoSection.jsx"
import PollSettings from "../layouts/PollSettings.jsx"
import dropdown_arrow from "../assets/images/dropdown_arrow_down.png"
import close_icon from "../assets/images/close_icon.png"
import play_button_icon from "../assets/images/play_button_icon.png"
import trash_icon from "../assets/images/trash_icon.png"
import drag_handle from "../assets/images/drag_handle.png"
import tip_icon from "../assets/images/tip_icon.png"

function EditPoll() {
    const { user, loading } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [draggedItemIndex, setDraggedItemIndex] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [pollStatus, setPollStatus] = useState(null)
    const [errors, setErrors] = useState({})

    const [pollData, setPollData] = useState({
        title: '',
        description: '',
        isAnonymous: false,
        showStats: true,
        allowMultipleVotes: false,
        isPublic: true,
        requiresAuth: false,
        hasDeadline: false,
        deadline: '',
        categories: []
    })

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const fetchPoll = async () => {
            const token = localStorage.getItem('token')
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/polls/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
                })
                const poll = res.data.poll
                setPollStatus(poll.status)
                setPollData({
                    title: poll.title,
                    description: poll.description || '',
                    isAnonymous: poll.is_anonymous,
                    showStats: poll.show_stats,
                    allowMultipleVotes: poll.allow_multiple_votes,
                    isPublic: poll.is_public,
                    requiresAuth: poll.requires_auth,
                    hasDeadline: !!poll.expires_at,
                    deadline: poll.expires_at ? poll.expires_at.substring(0, 10) : '',
                    categories: poll.categories || []
                })
                setQuestions(poll.questions.map(q => ({
                    id: Date.now() + Math.random(),
                    questionId: q.id,
                    text: q.text,
                    isExpanded: true,
                    isMultipleChoice: q.is_multiple_choice,
                    isRequired: q.is_required,
                    options: q.options.map(o => ({ optionId: o.id, text: o.text }))
                })))
            } catch (err) {
                console.error('Failed to fetch poll:', err)
                navigate('/polls')
            } finally {
                setIsFetching(false)
            }
        }
        fetchPoll()
    }, [id])

    const addQuestion = () => {
        setQuestions(prev => [...prev, {
            id: Date.now() + Math.random(),
            questionId: null,
            text: '',
            isExpanded: true,
            isMultipleChoice: false,
            isRequired: false,
            options: [{ optionId: null, text: '' }, { optionId: null, text: '' }]
        }])
    }

    const removeQuestion = (id) => {
        if (questions.length > 1) setQuestions(prev => prev.filter(q => q.id !== id))
    }

    const handleQuestionTextChange = (index, value) => {
        setQuestions(prev => prev.map((q, i) => i === index ? { ...q, text: value } : q))
    }

    const toggleQuestionSetting = (index, field) => {
        setQuestions(prev => prev.map((q, i) => i === index ? { ...q, [field]: !q[field] } : q))
    }

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        setQuestions(prev => prev.map((q, i) => {
            if (i !== questionIndex) return q
            const newOptions = [...q.options]
            newOptions[optionIndex] = { ...newOptions[optionIndex], text: value }
            return { ...q, options: newOptions }
        }))
    }

    const addOption = (questionIndex) => {
        setQuestions(prev => prev.map((q, i) =>
            i === questionIndex ? { ...q, options: [...q.options, { optionId: null, text: '' }] } : q
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
            const next = [...prev]
            const item = next[draggedItemIndex]
            next.splice(draggedItemIndex, 1)
            next.splice(index, 0, item)
            return next
        })
        setDraggedItemIndex(index)
    }

    const handleDragEnd = () => setDraggedItemIndex(null)

    const validate = () => {
        const newErrors = {}
        if (!pollData.title.trim()) {
            newErrors.title = 'Aptaujas nosaukums ir obligāts.'
        }
        if (pollData.hasDeadline && pollData.deadline) {
            const selected = new Date(pollData.deadline + 'T00:00:00')
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (selected < today) {
                newErrors.deadline = 'Termiņam jābūt nākotnē.'
            }
        }
        questions.forEach((q, qi) => {
            if (!q.text.trim()) {
                newErrors[`question_${qi}_text`] = `${qi + 1}. jautājumam jābūt tekstam.`
            }
            if (q.options.filter(o => o.text.trim()).length < 2) {
                newErrors[`question_${qi}_options`] = `${qi + 1}. jautājumam jābūt vismaz diviem aizpildītiem variantiem.`
            }
        })
        return newErrors
    }

    const normalizeErrors = (serverErrors) => {
        const result = {}
        for (const [key, messages] of Object.entries(serverErrors)) {
            const msg = Array.isArray(messages) ? messages[0] : messages
            const textMatch = key.match(/^questions\.(\d+)\.text$/)
            const optionsMatch = key.match(/^questions\.(\d+)\.options/)
            if (textMatch) {
                result[`question_${textMatch[1]}_text`] = msg
            } else if (optionsMatch) {
                const k = `question_${optionsMatch[1]}_options`
                if (!result[k]) result[k] = msg
            } else {
                result[key] = msg
            }
        }
        return result
    }

    const handleClose = async () => {
        const token = localStorage.getItem('token')
        if (pollStatus === 'closed') {
            try {
                await axios.patch(`http://127.0.0.1:8000/api/polls/${id}/open`, {}, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
                })
                setPollStatus('active')
            } catch (err) {
                console.error('Failed to open poll:', err)
            }
        } else {
            try {
                await axios.patch(`http://127.0.0.1:8000/api/polls/${id}/close`, {}, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
                })
                setPollStatus('closed')
            } catch (err) {
                console.error('Failed to close poll:', err)
            }
        }
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
            requires_auth: pollData.requiresAuth,
            expires_at: pollData.hasDeadline && pollData.deadline ? pollData.deadline : null,
            categories: pollData.categories.length > 0 ? pollData.categories : null,
            questions: questions.map(q => ({
                id: q.questionId ?? null,
                text: q.text,
                is_multiple_choice: q.isMultipleChoice,
                is_required: q.isRequired,
                options: q.options
                    .filter(o => o.text.trim())
                    .map(o => ({ id: o.optionId ?? null, text: o.text }))
            }))
        }

        try {
            const token = localStorage.getItem('token')
            await axios.put(`http://127.0.0.1:8000/api/polls/${id}`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            })
            navigate('/polls')
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(normalizeErrors(err.response.data.errors))
            } else {
                setErrors({ general: 'Kļūda saglabājot aptauju. Lūdzu mēģiniet vēlreiz.' })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) return (
        <p className="flex h-screen items-center justify-center font-semibold text-gray-500">
            Ielādējas...
        </p>
    )

    if (!user) return <Navigate to="/login" />

    if (isFetching) return (
        <p className="flex h-screen items-center justify-center font-semibold text-gray-500">
            Ielādējas...
        </p>
    )

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <DashboardHeader
                    title="Rediģēt aptauju"
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                />

                <main className="p-6 pt-28 lg:p-12 lg:pt-32 max-w-7xl mx-auto w-full">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="font-bold text-3xl tracking-tight mb-2 text-gray-900">Rediģēt aptauju</h1>
                            <p className="text-base text-gray-500 max-w-2xl">Mainiet aptaujas saturu un iestatījumus. Esošās atbildes tiks saglabātas.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleClose}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                {pollStatus === 'closed' ? (
                                    <>
                                        <img src={play_button_icon} className="w-4 h-4 opacity-50" alt="" />
                                        Atvērt aptauju
                                    </>
                                ) : (
                                    <>
                                        <img src={close_icon} className="w-4 h-4 opacity-50" alt="" />
                                        Slēgt aptauju
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {errors.general && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                            {errors.general}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-6">
                            <PollInfoSection pollData={pollData} setPollData={setPollData} errors={errors} />

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
                                                                value={option.text}
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
                                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs leading-none pb-px">+</span>
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
                                <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl leading-none pb-px">+</span>
                                Pievienot jaunu jautājumu
                            </button>
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <PollSettings
                                pollData={pollData}
                                setPollData={setPollData}
                                isSubmitting={isSubmitting}
                                onSubmit={handleSubmit}
                                submitText="Saglabāt izmaiņas"
                                errors={errors}
                            />

                            <section className="bg-white space-y-2 p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-1">
                                    <img src={tip_icon} className="w-4 h-4" alt="tip" />
                                    <h4 className="font-bold text-sm text-gray-900">Padoms</h4>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Rediģējot aptauju, esošo jautājumu saraksts tiks pilnībā aizstāts. Pārliecinieties, ka visi vajadzīgie jautājumi ir saglabāti.
                                </p>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default EditPoll
