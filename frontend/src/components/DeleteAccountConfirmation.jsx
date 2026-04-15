import { useState, useEffect } from "react"

function DeleteAccountConfirmation({ isConfirmOpen, onClose, onConfirm, loading }) {
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        let timer

        if (isConfirmOpen) {
            if (countdown > 0) {
                timer = setTimeout(() => setCountdown(prev => prev - 1), 1000)
            }
        } else {
            setCountdown(5)
        }

        return () => clearTimeout(timer)
    }, [isConfirmOpen, countdown])

    useEffect(() => {
        if (isConfirmOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isConfirmOpen])

    if (!isConfirmOpen) return null

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transition-all">
                <h2 className="text-2xl font-bold text-primary mb-4 text-center">Vai Jūs esat pārliecināti?</h2>
                <p className="text-gray-500 text-center mb-8">
                    Šī darbība ir neatgriezeniska. Visi Jūsu dati tiks neatgriezeniski dzēsti no mūsu sistēmas.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        disabled={countdown > 0 || loading}
                        onClick={onConfirm}
                        className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                            countdown > 0 || loading
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-red-700 text-white hover:bg-red-600 shadow-lg shadow-red-200"
                        }`}
                    >
                        {loading ? "Dzēš..." : countdown > 0 ? `Dzēst kontu (${countdown})` : "Es saprotu, dzēst kontu"}
                    </button>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full py-3 text-primary font-bold hover:underline duration-300"
                    >
                        Atcelt
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountConfirmation