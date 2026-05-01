import { useNavigate } from 'react-router-dom'

function NotificationCard({ text, level, pollId }) {
    const navigate = useNavigate()

    const clickable = !!pollId

    return (
        <div
            onClick={() => clickable && navigate(`/results/${pollId}`)}
            className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-start gap-3 transition-all ${clickable ? 'cursor-pointer hover:border-primary/20 hover:shadow-md' : ''}`}
        >
            <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${level === 'success' ? 'bg-green-400' : level === 'info' ? 'bg-primary' : 'bg-gray-300'}`} />
            <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
        </div>
    )
}

export default NotificationCard
