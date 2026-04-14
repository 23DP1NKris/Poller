function BulletpointBox(props) {
    return(
        <span className="flex items-center gap-1.5 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-primary uppercase">
            <div className="w-1 h-1 rounded-full bg-primary"></div>
            {props.text}
        </span>
    )
}

export default BulletpointBox