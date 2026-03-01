import dropdown_arrow from "../assets/images/dropdown_arrow_down.png"
import {useState} from "react"

function FAQItem(props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border border-gray-300 rounded-xl overflow-hidden bg-gray-100">
            <div>
                <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-5 flex flex items-center justify-between text-left group">
                    <span className="font-bold group-hover:text-primary transition-colors">{props.question}</span>
                    <img src={dropdown_arrow} alt="dropdown toggle" className={`h-5 w-5 object-contain transition-transform duration-400 ${isOpen ? "rotate-180" : "rotate-0"}`}/>
                </button>
            </div>
            <div hidden={!isOpen} className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                {props.answer}
            </div>
        </div>

    )
}

export default FAQItem