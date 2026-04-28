import LargeInput from "../components/LargeInput.jsx"
import LargeTextArea from "../components/LargeTextarea.jsx"
import info_icon from "../assets/images/info_icon.png"

function PollInfoSection({ pollData, setPollData, errors }) {
    return (
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
                    onChange={(e) => setPollData({ ...pollData, title: e.target.value })}
                    error={errors.title}
                />
                <LargeTextArea
                    id="poll-desc"
                    text="Apraksts"
                    placeholder="Aprakstiet aptaujas mērķi un kontekstu..."
                    value={pollData.description}
                    maxLength={250}
                    onChange={(e) => setPollData({ ...pollData, description: e.target.value })}
                />
            </div>
        </section>
    )
}

export default PollInfoSection
