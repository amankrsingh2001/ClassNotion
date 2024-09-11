import ContactPage from "../components/Common/ContactPage"
import ContactInfo from "../components/core/ContactUs/ContactInfo"

const Contact = () =>{
    return <div className="w-full h-screen flex lg:flex-row justify-evenly items-start">
        <ContactInfo/>
        <ContactPage/>
    </div>
}
export default Contact