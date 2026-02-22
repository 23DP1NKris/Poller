function AuthBtn(props) {
    return (
        <button
            onClick={props.onClick}
            className="text-xs flex items-center justify-center gap-3 w-full h-11 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium sm:text-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
            type="button">
            <img src={props.image} className="w-5 h-5" />
            {props.text}
        </button>
    )
}

export default AuthBtn