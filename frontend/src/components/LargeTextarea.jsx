function LargeTextArea(props) {
    return (
        <div className="w-full">
            <label
                className="block text-sm font-semibold text-gray-900 mb-1"
                htmlFor={props.id}
            >
                {props.text}
            </label>

            <textarea
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 min-h-30 resize-none
                ${props.error
                    ? "border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 bg-white focus:border-primary focus:ring-1 focus:ring-primary"
                }`}
                id={props.id}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />

            {props.error && (
                <span className="text-red-500 text-xs ml-1 font-medium mt-1 block">
                    {props.error}
                </span>
            )}
        </div>
    )
}

export default LargeTextArea