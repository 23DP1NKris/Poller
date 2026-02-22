function NoBackgroundBtn(props) {
    return (
        <button onClick={props.onClick} className="px-8 py-3 rounded-lg font-bold text-sm tracking-wide border-2 border-primary/50 shadow-lg transform hover:-translate-y-0.5 text-primary transition-all w-full sm:w-auto">
            {props.text}
        </button>
    )
}

export default NoBackgroundBtn