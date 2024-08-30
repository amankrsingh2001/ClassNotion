import LoginTemp from "../components/core/Auth/LoginTemp"
import image from '../assets/Images/login.webp'
import frame from '../assets/Images/frame.png'

const Login = () =>{
    return <LoginTemp image = {image} frame = {frame} title={'Welcome Back'} description={'Build skills for today, tomorrow, and beyond.'}/>
}

export default Login