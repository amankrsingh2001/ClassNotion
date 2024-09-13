const IconBtn = ({text, onclick, children, outline = false, customClasses, type,disabled}) =>{
    return <button
    className="text-white"
    disabled={disabled}
    onClick={onclick}
    >
        {
            children ?(<>
                <span className="text-white bg-yellow-50">{text}</span>
            </>):(<span className="bg-yellow-50 px-8 py-3 rounded-xl text-black">{text}</span>)
        }
    </button>
}

export default IconBtn