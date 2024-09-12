const IconBtn = ({text, onclick, children, outline = false, customClasses, type,disabled}) =>{
    console.log(text)
    return <button
    className="text-white"
    disabled={disabled}
    onClick={onclick}
    >
        {
            children ?(<>
                <span className="text-white">{text}</span>{children}
            </>):(text)
        }
    </button>
}

export default IconBtn