
function AuthInput(props) {
    return (
        <input name={props.name} type={props.type} placeholder={props.placeholder} autoComplete="off" className="w-full p-3 bg-gray-100 rounded-lg outline-1px outline-gray-200 focus:scale-101 transition-transform duration-300" />
    )
}

export default AuthInput