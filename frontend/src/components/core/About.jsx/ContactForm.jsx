import ContactPage from "../../Common/ContactPage";

const ContactForm = () =>{
    return <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 lg:gap-16 items-start">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <p className="eyebrow">Say hi</p>
            <h2 className="h-display text-4xl md:text-6xl text-foreground">
                Get in <span className="text-gradient">touch</span>
            </h2>
            <p className="text-foreground/55 text-lg max-w-md">We’d love to hear from you. Please fill out this form.</p>
        </div>
        <ContactPage />
    </div>
}

export default ContactForm;
