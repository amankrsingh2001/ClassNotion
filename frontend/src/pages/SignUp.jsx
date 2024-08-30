import SignUpTemp from "../components/core/Auth/SignUpTemp"
import img from '../assets/Images/signup.webp'
import frame from '../assets/Images/frame.png'
import Countrycode from '../data/countrycode.json'


const SignUp = () =>{
    return <SignUpTemp image={img} frame={frame} title={'Join the millions learning to code with StudyNotion for free'} description={'Build skills for today, tomorrow, and beyond.'} code={Countrycode}/>
}

export default SignUp