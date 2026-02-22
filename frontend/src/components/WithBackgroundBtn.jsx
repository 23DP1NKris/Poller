function WithBackgroundBtn(props) {
    return (
            <button onClick={props.onClick} type={props.type} className="bg-primary text-white px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide hover:bg-opacity-90 shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5 w-full w-auto">
            {props.text}
        </button>
    )
}

export default WithBackgroundBtn