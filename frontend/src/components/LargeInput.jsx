function LargeInput(props) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-900"
                   htmlFor={props.htmlFor}>
                {props.text}
            </label>

            <input
                className={`w-full rounded-lg border border-gray-200 bg-white px-4 h-11 text-sm outline-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400
                ${props.error ? "border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500" : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"}`}
                id={props.id}
                placeholder={props.placeholder}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
            />

            {props.error && (
            <span className="text-red-500 text-xs ml-1 font-medium">
                {props.error}
            </span>)}
        </div>
    )
}

export default LargeInput
