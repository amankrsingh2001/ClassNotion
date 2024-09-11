import AboutCard from "../components/core/About.jsx/AboutCard";
import AboutDetail from "../components/core/About.jsx/AboutDetail";
import AboutGrid from "../components/core/About.jsx/AboutGrid";
import ContactForm from "../components/core/About.jsx/ContactForm";

const About = () => {
  return (
    <div className="w-screen flex flex-col ">
      <section>
        <div className="w-full min-h-[calc(100vh-12.5rem)] bg-richblack-800 flex flex-col items-center relative">
          <div className="w-11/12  flex flex-col py-10 justify-around lg:gap-12 gap-8 lg:items-center mt-20 ">
            <p className="text-[#999DAA]">About us</p>

            <div className="flex flex-col justify-between  items-center gap-10">
              <div className="flex flex-col lg:items-center gap-1">
                <h1 className="lg:text-4xl text-2xl lg:text-center font-inter text-[#f1f2ff] tracking-light">
                  Driving Innovation in Online Education for a
                </h1>
                <h1 className="bg-clip-text text-transparent from-[#E65C00] to-[#F9D423] [background-image:linear-gradient(118.41deg,#E65C00_-6.05%,#F9D423_106.11%)] text-2xl font-bold lg:text-4xl tracking-wide">
                  Brighter Future
                </h1>
              </div>

              <div className="lg:w-[50%] ">
                <p className="text-[#838894] lg:text-center ">
                  Studynotion is at the forefront of driving innovation in
                  online education. We're passionate about creating a brighter
                  future by offering cutting-edge courses, leveraging emerging
                  technologies, and nurturing a vibrant learning community.
                </p>
              </div>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col justify-evenly border-2 gap-2  lg:gap-4 lg:absolute bottom-[-80px]">
            <div className="">
              <img src="../src/assets/Images/aboutus1.webp" />
            </div>
            <div className="">
              <img src="../src/assets/Images/aboutus2.webp" />
            </div>
            <div className="">
              <img src="../src/assets/Images/aboutus3.webp" />
            </div>
          </div>
        </div>
      </section>
      {/*section-2 */}

      <section>
        <div className=" w-full flex justify-center items-center lg:h-[500px]">
          <div className="lg:w-[70%]">
            <h2 className="lg:text-3xl text-xl lg:p-6 p-8 font-bold text-[#AFB2BF] lg:text-center">
              We are passionate about revolutionizing the way we learn. Our
              innovative platform{" "}
              <span className="text-[#12D8FA]">combines technology,</span>{" "}
              <span className="bg-clip-text text-transparent [background-image:linear-gradient(117.83deg,#FF512F_-4.8%,#F09819_107.46%)]">
                expertise,
              </span>{" "}
              and community to create an
              <span className="bg-clip-text text-transparent from-[#E65C00] to-[#F9D423] [background-image:linear-gradient(118.41deg,#E65C00_-6.05%,#F9D423_106.11%)]">
                {" "}
                unparalleled educational experience.
              </span>{" "}
            </h2>
          </div>
        </div>
      </section>

      {/* section-3 */}
      <section>
        <div className="w-11/12 flex lg:flex-row flex-col justify-around items-center p-10">
          <AboutCard
            heading={"Our Founding Story"}
            textColor={'bg-clip-text text-transparent via-[#FD1D1D] to-[#FCB045] [background-image:linear-gradient(117.95deg,#833AB4_-2.4%,#FD1D1D_52.25%,#FCB045_106.89%)]'}
            description1={
              "Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world."
            }
            description2={
              "As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential."
            }
          />
          <div className="lg:w-[40%] w-full">
          <img className="lg:w-full w-full p-4 md:p-0" src="../src/assets/Images/FoundingStory.png" />
          </div>
        </div>
      </section>

      {/* section-4 */}

      <section>
        <div className="w-11/12 flex lg:flex-row flex-col justify-around items-center p-10 mt-10">
          <AboutCard
            heading={"Our Vision"}
            textColor={'bg-clip-text text-transparent [background-image:linear-gradient(117.83deg,#FF512F_-4.8%,#F09819_107.46%)]'}
            description1={
              "With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience."
            }
            description2={""}
          />
          <AboutCard heading={'Our Mission'}  description1={'our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.'} description2={''}
            textColor={'bg-clip-text text-transparent bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] [background-image:linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)]'}
          />
        </div>
      </section>


            {/* section-4 */}

            <div className="w-full bg-richblack-800 lg:px-4 p-8">
                <AboutDetail/>
            </div>


            {/* section-5 */}

            <div className="flex flex-col gap-5 justify-center items-center ">
                <AboutGrid/>
                <ContactForm/>                
            </div>


    </div>
  );
};

export default About;
