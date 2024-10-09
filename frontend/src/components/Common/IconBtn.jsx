import { FiEdit } from "react-icons/fi";

const IconBtn = ({text, onclick, children, outline = false, customClasses, type,disabled}) =>{
    return <button
    className={`${customClasses} "text-white"`}
    disabled={disabled}
    onClick={onclick}
    >
        {
            children ?(<>
                <span className="bg-yellow-50 px-8 py-3 rounded-md flex gap-2 text-black">{children} </span>
            </>):(
                <span className="bg-yellow-50 px-8 py-3 rounded-md text-black">{text} </span>)
        }
    </button>
}

export default IconBtn