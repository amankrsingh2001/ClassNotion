import ContactPage from "../components/Common/ContactPage"
import ReviewSlider from "../components/Common/ReviewSlider"
import ContactInfo from "../components/core/ContactUs/ContactInfo"

const Contact = () =>{
    return <div className="w-full min-h-[calc(100vh-12.5rem)] flex flex-col justify-evenly items-start">
        <div className="flex w-full flex-col lg:flex-row  justify-evenly items-start">
        <ContactInfo/>
        <ContactPage/>
        </div>
       
        <ReviewSlider/>
    </div>
}
export default Contact