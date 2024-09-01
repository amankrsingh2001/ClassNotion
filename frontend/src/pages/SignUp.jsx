import SignUpTemp from "../components/core/Auth/SignUpTemp"
import frame from '../assets/Images/frame.png'
import Countrycode from '../data/countrycode.json'


const SignUp = () =>{

    return <SignUpTemp frame={frame} code={Countrycode}/>
}

export default SignUp