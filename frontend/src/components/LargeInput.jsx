function LargeInput(props) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-900"
                   htmlFor={props.htmlFor}>{props.text}</label>
            <input
                className="w-full rounded-lg border-1 border-gray-200 bg-white px-4 h-11 text-sm outline-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
                id={props.id} placeholder={props.placeholder} type={props.type}/>
        </div>
    )
}

export default LargeInput