import SignUpTemp from "../components/core/Auth/SignUpTemp"

import Countrycode from '../data/countrycode.json'


const SignUp = () =>{

    return <SignUpTemp frame={'/assets/Images/frame.png'} code={Countrycode}/>
}

export default SignUp