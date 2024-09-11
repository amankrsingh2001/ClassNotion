import ContactPage from "../../Common/ContactPage";

const ContactForm = () =>{
    return <div className="w-11/12 flex flex-col items-center p-2 gap-6 ">
        <h1 className="text-4xl text-white">Get In Touch</h1>
        <p className="text-[#838894] text-md">We’d love to here for you, Please fill out this form.</p>
        <ContactPage />

    </div>
}

export default ContactForm;