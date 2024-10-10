import LoginTemp from "../components/core/Auth/LoginTemp"
import Navbar from "../components/Common/Navbar"

const Login = () =>{
    return<div>
         <LoginTemp image = {'/assets/Images/login.webp'} frame = {'/assets/Images/frame.png'} title={'Welcome Back'} description={'Build skills for today, tomorrow, and beyond.'}/>
    </div>
}

export default Login