import { IoChatbox } from "react-icons/io5";
import { FaEarthAsia } from "react-icons/fa6";

const ContactInfo = () =>{
    return <div className="w-fit  flex mt-12 rounded-lg relative left-10 lg:left-20 bg-richblack-800  p-2">
        <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-3">
                    <IoChatbox className="text-white"/>
                <h1 className="text-[#F1F2FF] text-xl">Chat On Us</h1>
                </div>
                <p className="text-[#999DAA] px-6 text-sm">Our friendly team is here to help.</p>
                <a href="mailto:@gmail.com" className="text-[#999DAA] px-6 text-sm">example@gmail.com</a>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-3">
                <FaEarthAsia className="text-white"/>
                <h1 className="text-[#F1F2FF] text-xl ">Visit Us</h1>
                </div>
                <p className="text-[#999DAA] px-6 text-sm">Come and say hello at our office HQ.</p>
                <a herf="" className="text-[#999DAA] px-6 text-sm">Here is the location/ address</a>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-3">
                    <IoChatbox className="text-white"/>
                <h1 className="text-[#F1F2FF] text-xl ">Call us</h1>
                </div>
                <p className="text-[#999DAA] px-6 text-sm">Mon - Fri From 8am to 5pm.</p>
                <a href="tel:+91" className="text-[#999DAA] px-6 text-sm">+123 456 7890</a>
            </div>
        </div>
    </div>
}

export default ContactInfo