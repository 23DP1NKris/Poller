function AuthBtn(props) {
    return (
        <button onClick={props.onClick} className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:scale-102 duration-300 transition-transform">
            <img src={props.img} className="w-5"></img>
            {props.text}
        </button>
    )
}

export default AuthBtn