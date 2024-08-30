
import { Link } from "react-router-dom"

const Cpabutton = ({children, active, linkto, shadow}) =>{
    return <div className={`text-center text-[12px] px-6 py-3 rounded-md font-bold hover:scale-105 transition-all delay-200 ${active?`bg-yellow-50 text-black`:`bg-richblack-800`} cursor-pointer`}>
        <Link to={linkto}>
            {children}       
        </Link>
    </div>
}

export default Cpabutton