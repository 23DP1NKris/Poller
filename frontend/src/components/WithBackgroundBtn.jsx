function WithBackgroundBtn(props) {
    return (
            <button onClick={props.onClick} className={`${props.color} px-9 py-[14px] text-white border-none rounded-[15px] font-bold text-[16px] cursor-pointer transition-colors duration-300 hover:opacity-90 hover:scale-102 transition-transform duration-300`}>
            {props.text}
        </button>
    )
}

export default WithBackgroundBtn