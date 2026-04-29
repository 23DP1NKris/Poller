import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import GuestHeader from "../layouts/GuestHeader.jsx"
import warning_icon from "../assets/images/warning_icon.png"
import checkmark_icon from "../assets/images/checkmark_icon.png"
import sad_face from "../assets/images/sad_face.png"
import arrow_icon from "../assets/images/dropdown_arrow_down.png"

function AnswerPoll() {
    const { id } = useParams()
    const navigate = useNavigate()
    const returnPath = localStorage.getItem('token') ? '/home' : '/'

    const [poll, setPoll] = useState(null)
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState(null)
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [alreadySubmitted, setAlreadySubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(null)
    const [triedNext, setTriedNext] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const sessionToken = localStorage.getItem('pollSessionToken')
        axios.get(`http://127.0.0.1:8000/api/public/polls/${id}`, {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(sessionToken ? { 'X-Session-Token': sessionToken } : {}),
            }
        })
            .then(res => {
                setPoll(res.data.poll)
                if (res.data.has_voted) setAlreadySubmitted(true)
            })
            .catch(err => setFetchError(err.response?.status === 403 ? 'inactive' : 'notfound'))
            .finally(() => setLoading(false))
    }, [id])

    const questions = poll?.questions ?? []
    const totalQuestions = questions.length
    const currentQuestion = questions[currentStep]
    const isLastQuestion = currentStep === totalQuestions - 1
    const isFirstQuestion = currentStep === 0
    const currentAnswers = answers[currentQuestion?.id] ?? []
    const canProceed = !currentQuestion?.is_required || currentAnswers.length > 0
    const progress = totalQuestions > 0 ? ((currentStep + 1) / totalQuestions) * 100 : 0

    const handleSelectOption = (questionId, optionId, isMultiple) => {
        setAnswers(prev => {
            const current = prev[questionId] ?? []
            if (isMultiple) {
                const next = current.includes(optionId)
                    ? current.filter(x => x !== optionId)
                    : [...current, optionId]
                return { ...prev, [questionId]: next }
            }
            return { ...prev, [questionId]: [optionId] }
        })
    }

    const handleNext = () => {
        if (submitting) return
        if (!canProceed) {
            setTriedNext(true)
            return
        }
        setTriedNext(false)
        if (isLastQuestion) {
            handleSubmit()
        } else {
            setCurrentStep(s => s + 1)
            setSubmitError(null)
        }
    }

    const handleBack = () => {
        if (!isFirstQuestion) {
            setCurrentStep(s => s - 1)
            setTriedNext(false)
        }
    }

    const handleSubmit = async () => {
        const formattedAnswers = Object.entries(answers).map(([questionId, optionIds]) => ({
            question_id: parseInt(questionId),
            option_ids: optionIds,
        }))

        let sessionToken = localStorage.getItem('pollSessionToken')
        if (!sessionToken) {
            sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36)
            localStorage.setItem('pollSessionToken', sessionToken)
        }

        const token = localStorage.getItem('token')

        setSubmitting(true)
        setSubmitError(null)
        try {
            await axios.post(`http://127.0.0.1:8000/api/public/polls/${id}/respond`, {
                answers: formattedAnswers,
            }, {
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    'X-Session-Token': sessionToken,
                },
            })
            setSubmitted(true)
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.message === 'Jūs jau esat atbildējuši uz šo aptauju.') {
                setAlreadySubmitted(true)
            } else {
                setSubmitError(err.response?.data?.message ?? 'Radās kļūda. Mēģiniet vēlreiz.')
            }
        } finally {
            setSubmitting(false)
        }
    }

    const wrapper = (children) => (
        <div className="h-screen flex flex-col bg-background-light">
            <GuestHeader />
            <main className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
                {children}
                <button
                    onClick={() => navigate(returnPath)}
                    className="text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors flex"
                >
                    <img src={arrow_icon} className="rotate-90 w-4 h-4 opacity-50"/> {localStorage.getItem('token') ? 'Uz sākumlapu' : 'Uz galveno lapu'}
                </button>
            </main>
        </div>
    )

    if (loading) return wrapper(
        <p className="text-gray-500 font-medium">Ielādējas...</p>
    )

    if (fetchError) return wrapper(
        <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-5">
                <img
                    src={fetchError === 'inactive' ? warning_icon : sad_face}
                    className="w-8 h-8"
                    alt=""
                />
            </div>
            <h2 className="font-bold text-gray-900 text-xl mb-2">
                {fetchError === 'inactive' ? 'Aptauja nav pieejama' : 'Aptauja nav atrasta'}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
                {fetchError === 'inactive'
                    ? 'Šī aptauja pašlaik nav aktīva vai nav publiski pieejama.'
                    : 'Aptauja ar šo adresi neeksistē vai ir dzēsta.'}
            </p>
        </div>
    )

    if (alreadySubmitted) return wrapper(
        <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5">
                <img src={warning_icon} className="w-8 h-8" alt="" />
            </div>
            <h2 className="font-bold text-gray-900 text-xl mb-2">Jūs jau esat balsojuši</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
                Šo aptauju var aizpildīt tikai vienreiz.
            </p>
        </div>
    )

    if (submitted) return wrapper(
        <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-5">
                <img src={checkmark_icon} className="w-8 h-8" alt="" />
            </div>
            <h2 className="font-bold text-gray-900 text-2xl mb-2">Paldies!</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
                Jūsu atbildes ir veiksmīgi iesniegtas.
            </p>
        </div>
    )

    return (
        <div className="h-screen flex flex-col bg-background-light overflow-hidden">
            <GuestHeader />

            <main className="flex-1 flex items-center justify-center px-6 overflow-y-auto py-8">
                <div className="w-full max-w-2xl">

                    {poll.categories?.length > 0 && (
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-5">
                            {poll.categories.join(" · ")}
                        </p>
                    )}

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">
                        {currentQuestion.text}
                        {currentQuestion.is_required && (
                            <span className="text-primary ml-1">*</span>
                        )}
                    </h1>

                    <p className="text-xs font-medium text-gray-400 mb-6">
                        {currentQuestion.is_multiple_choice
                            ? 'Var izvēlēties vairākus variantus'
                            : 'Izvēlieties vienu variantu'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = currentAnswers.includes(option.id)
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleSelectOption(
                                        currentQuestion.id,
                                        option.id,
                                        currentQuestion.is_multiple_choice
                                    )}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 w-full cursor-pointer
                                        ${isSelected
                                            ? 'bg-primary border-primary text-white shadow-md'
                                            : 'bg-white border-gray-200 hover:border-primary/40 text-gray-800 hover:shadow-sm'
                                        }`}
                                >
                                    <span className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold
                                        ${isSelected ? 'border-white/50 text-white' : 'border-gray-300 text-gray-500'}`}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="flex-1 text-sm font-medium">{option.text}</span>
                                    {isSelected && (
                                        <img
                                            src={checkmark_icon}
                                            className="w-5 h-5 shrink-0"
                                            style={{ filter: 'brightness(0) invert(1)' }}
                                            alt=""
                                        />
                                    )}
                                </button>
                            )
                        })}
                    </div>

                    {triedNext && !canProceed && (
                        <p className="text-xs text-red-500 font-medium mb-4">Šis jautājums ir obligāts. Lūdzu izvēlieties atbildi.</p>
                    )}

                    {submitError && (
                        <p className="text-sm text-red-500 mb-4">{submitError}</p>
                    )}

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            disabled={isFirstQuestion}
                            className={`shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
                                ${isFirstQuestion
                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                    : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary cursor-pointer'
                                }`}
                        >
                            <img src={arrow_icon} className={`w-4 h-4 rotate-90 ${isFirstQuestion ? 'opacity-20' : 'opacity-60'}`} alt="" />
                        </button>

                        <div className="flex-1 h-0.5 bg-gray-300 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gray-800 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <span className="shrink-0 text-sm text-gray-500">
                            {currentStep + 1}. no {totalQuestions} jautājumiem
                        </span>

                        <button
                            onClick={handleNext}
                            disabled={submitting}
                            className={`shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all
                                ${!submitting
                                    ? 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md cursor-pointer'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {submitting ? 'Sūta...' : isLastQuestion ? 'Iesniegt' : 'Turpināt'}
                            {!submitting && (
                                <img src={arrow_icon} className="w-4 h-4 -rotate-90 brightness-0 invert" alt="" />
                            )}
                        </button>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default AnswerPoll
