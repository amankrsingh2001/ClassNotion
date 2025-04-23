
import { Link } from "react-router-dom"

const Cpabutton = ({children, active, linkto, shadow,data,background, inActiveBackground}) =>{
    console.log(background)
   
    return <div onClick={data} className={`text-center  px-6 py-3 rounded-xl ease-linear hover:outline-double  hover:scale-105 transition-all delay-200 ${active?`${background}`:`${inActiveBackground}`} cursor-pointer`}>
        <Link to={linkto}>
            {children}       
        </Link>
    </div>
}



export default Cpabutton