import ContactPage from "../components/Common/ContactPage"
import ReviewSlider from "../components/Common/ReviewSlider"
import ContactInfo from "../components/core/ContactUs/ContactInfo"

const Contact = () =>{
    return <div className="w-full h-screen flex lg:flex-row justify-evenly items-start">
        <ContactInfo/>
        <ContactPage/>
        {/* <ReviewSlider/> */}
    </div>
}
export default Contact