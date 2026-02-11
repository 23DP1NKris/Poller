function OutlineBtn(props) {
    return (
        <button onClick={props.onClick} className="w-auto text-gray-500 hover:text-gray-600 rounded-lg outline-gray-500 outline-1 p-1 px-4 hover:scale-102 transition-transform">
            {props.text}
        </button>
    )
}

export default OutlineBtn