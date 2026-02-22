function OutlineBtn(props) {
    return (
        <button onClick={props.onClick} className="text-sm font-bold text-gray-900 border border-gray-300 shadow-sm px-4 py-2 rounded-lg hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition duration-200 ease-in-out">
            {props.text}
        </button>
    )
}

export default OutlineBtn