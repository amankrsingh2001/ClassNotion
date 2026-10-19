import { FiMessageCircle, FiMapPin, FiPhone, FiChevronRight } from "react-icons/fi";

const METHODS = [
    {
        icon: FiMessageCircle,
        title: "Chat with us",
        detail: "Our friendly team is here to help.",
        linkText: "example@gmail.com",
        href: "mailto:@gmail.com",
    },
    {
        icon: FiMapPin,
        title: "Visit us",
        detail: "Come and say hello at our office HQ.",
        linkText: "Here is the location/ address",
        href: undefined,
    },
    {
        icon: FiPhone,
        title: "Call us",
        detail: "Mon - Fri From 8am to 5pm.",
        linkText: "+123 456 7890",
        href: "tel:+91",
    },
]

const ContactInfo = () =>{
    return <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
            <span className="pill w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-citrus" /> Contact
            </span>
            <h1 className="h-display text-5xl sm:text-6xl lg:text-7xl text-foreground">
                Let’s <span className="text-gradient">talk</span>
            </h1>
            <p className="text-foreground/55 text-base md:text-lg max-w-md">
                Questions, ideas or partnerships — reach out through any channel below and we’ll get back within a day.
            </p>
        </div>

        <div className="flex flex-col gap-2.5">
            {METHODS.map(({ icon: Icon, title, detail, linkText, href }) => {
                const Tag = href ? "a" : "div"
                return <Tag key={title} href={href} className="row-item group">
                    <span className="icon-circle"><Icon className="text-lg" /></span>
                    <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-medium text-foreground">{title}</p>
                        <p className="text-xs text-foreground/45 truncate">{detail}</p>
                        <p className="mt-0.5 text-sm text-foreground/80 truncate">{linkText}</p>
                    </div>
                    <FiChevronRight className="shrink-0 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Tag>
            })}
        </div>
    </div>
}

export default ContactInfo
