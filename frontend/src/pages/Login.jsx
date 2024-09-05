import LoginTemp from "../components/core/Auth/LoginTemp"
import image from '../assets/Images/login.webp'
import frame from '../assets/Images/frame.png'
import Navbar from "../components/Common/Navbar"

const Login = () =>{
    return<div>
         <LoginTemp image = {image} frame = {frame} title={'Welcome Back'} description={'Build skills for today, tomorrow, and beyond.'}/>
    </div>
}

export default Login