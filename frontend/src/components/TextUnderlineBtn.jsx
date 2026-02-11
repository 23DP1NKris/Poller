function TextUnderlineBtn(props) {
    return (
        <button onClick={props.onClick} className="bg-transparent border-none text-text-dark underline font-semibold text-lg cursor-pointer px-[5px] py-[10px] transition-colors duration-300 hover:text-accent-grey">
            {props.text}
        </button>
    )
}

export default TextUnderlineBtn