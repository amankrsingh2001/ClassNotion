import { Block } from "../components/Common/Block";

import { FaYoutube, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import {footerData, Plans, Community, FooterLink2} from "../data/footer-links";

import { Link } from "react-router-dom";

const Footer = () => {
  const subjects = FooterLink2[0].links;
  const Languages = FooterLink2[1].links;
  const carrer = FooterLink2[2].links;

  return (
    <div className="h-[728px] w-full  bg-[#161D29] flex justify-center items-center ">
      {" "}
      {/*Outer */}
      <div className="w-11/12 max-w-maxContent h-[80%] flex flex-col gap-2">
        <div className="h-[90%] w-full drop-shadow-2xl flex flex-1 items-stretch">
          {" "}
          {/* Inner */}
          {/* Section 1 */}
          <div className=" w-[50%] justify-between py-4  flex gap-4">
            <div className=" gap-2 ">
              <div className="flex text-[#C5C7D4] items-center py-2">
                <img className="h-6 mr-2" src={'/assets/Logo/Logo-Small-Light.png'} />
                <p className="font-inter font-semibold">CLASS NOTION</p>
              </div>
              <div className="m-2 text-[#6E727F]">
                <h3 className="font-semibold font-inter text-[#AFB2BF] p-2">
                  Company
                </h3>
                <div className="text-xs flex flex-col gap-2">
                  <p className="px-2 ">About</p>
                  <p className="px-2">Carrer</p>
                  <p className="px-2">Affilates</p>
                </div>
              </div>
              <div className="flex flex-row gap-[8px] p-2 text-[#6E727F]">
                <Link to={""}>
                  <FaYoutube />
                </Link>

                <Link to={""}>
                  <FaFacebook />
                </Link>

                <Link to={""}>
                  <FaTwitter />
                </Link>

                <Link to={""}>
                  <FaLinkedin />
                </Link>
              </div>
            </div>

            {/*Block-2 */}

            <div className="text-[#AFB2BF] ">
              <h3 className="font-semibold font-inter p-2">Resource</h3>
              <div className="text-xs text-[#6E727F] ">
                <Block resource={footerData} />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold font-inter p-2">Support</h3>
                <div className="text-xs text-[#6E727F] ">
                  <Link>
                    <p className="p-2">Help Center</p>
                  </Link>
                </div>
              </div>
            </div>

            {/*Block-2 */}

            <div className="flex flex-col gap-4 ">
              <div className="text-[#AFB2BF]">
                <h3 className="font-semibold font-inter p-2">Plans</h3>
                <div className="text-xs text-[#6E727F]">
                  <Block resource={Plans} />
                </div>
              </div>

              <div className="text-[#AFB2BF]">
                <h3 className="font-semibold font-inter p-2">Community</h3>
                <div className="text-xs text-[#6E727F]">
                  <Block resource={Community} />
                </div>
              </div>
            </div>
          </div>
          <hr className="border-[1px] ml-12 mr-12 h-[96%] mt-6 border-[#2C333F]" />
          {/*Section 2 */}

          <div className="flex justify-between w-[48%] gap-4">
            <div className="py-4">
              <h3 className="text-[#AFB2BF] font-semibold font-inter p-2">
                Subjects
              </h3>
              <div className="text-xs text-[#6E727F]">
                <Block resource={subjects} />
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-[#AFB2BF] font-semibold font-inter p-2">
                Language
              </h3>
              <div className="text-xs text-[#6E727F]">
                <Block resource={Languages} />
              </div>
            </div>
            <div className="p-4">
            <h3 className="text-[#AFB2BF] font-semibold font-inter p-2">
              Carrer building
            </h3>
            <div className="text-xs text-[#6E727F]">
              <Block resource={carrer} />
            </div>
          </div>
          </div>
         
        </div>
        <hr className="border-[1px]  mt-6 border-[#2C333F]" />

        <div className="flex justify-between pt-6">
          <div className="flex text-xs gap-2 text-[#AFB2BF]">
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
            <p>Terms & Conditions</p>
          </div>

          <div className="flex text-xs gap-2 text-[#AFB2BF]">
            <p>Made with ❤️ Aman &copy; 2024 ClassNotion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
