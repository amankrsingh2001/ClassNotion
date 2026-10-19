import ContactPage from "../components/Common/ContactPage"
import ReviewSlider from "../components/Common/ReviewSlider"
import ContactInfo from "../components/core/ContactUs/ContactInfo"

const Contact = () =>{
    return <div className="w-full flex flex-col gap-24 py-12 md:py-16">
        <section className="container-x grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
                <ContactInfo/>
            </div>
            <ContactPage/>
        </section>

        <ReviewSlider/>
    </div>
}
export default Contact
