import { FaArrowRight } from "react-icons/fa6";
import {  useNavigate } from "react-router-dom";
import { HilightText } from "../components/core/HomePage/HilightText";
import Cpabutton from "../components/core/HomePage/Cpabutton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import LearningLanguage from "../components/core/HomePage/LearningLanguage";
import CardImage from "../components/core/HomePage/CardImage";
import { LogoCard } from "../components/core/HomePage/LogoCard";
import CardData from '../data/CardData'
import ExploreMore from "../components/core/HomePage/ExploreMore";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ReviewSlider from "../components/Common/ReviewSlider";



const Home = () => {
  const {token} = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 0,
      offset: 400,
      mirror: false,
    });
  }, []);

  const onClickHandler = () =>{
    if(token){
      toast.error('You are already logged in please logout and signup as a instructor')
    }else{
      navigate('/signup')
    }
  }

  return (
    <div>
      {/*Section-1 */}
      <div className="mx-auto relative flex flex-col w-screen items-center text-white justify-between">
        <div
          className={`absolute z-[0] top-0 h-screen left-0 w-full  overflow-hidden bg-[url(../src/assets/Images/image.jpg)] bg-cover bg-no-repeat opacity-50`}
        ></div>

        <div className="relative z-1 w-11/12  max-w-maxContent flex flex-col items-center">
            <div className="group mt-16 shadow-[0px_1px_2px_0px_#fffefebc] p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-105 w-fit">
              <div className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                <button onClick={()=>onClickHandler()}>Become an Instructor</button>
                <FaArrowRight />
              </div>
            </div>
          {/*Heading section */}
          <div className="text-center font-semibold text-4xl animate-wiggle font-inter mt-7">
            Empower Your Future with
            <HilightText text={"Coding Skills"} style={"sky"} />
          </div>

          <div className="mt-4 text-[#838894] w-[70%] animate-wiggleNext text-lg font-inter font-medium text-center">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>

          <div className="flex justify-center gap-7 mt-8">
            <Cpabutton
              active={true}
              linkto={"/signup"}
              shadow={"drop-shadow-xl"}
            >
              {" "}
              Learn More{" "}
            </Cpabutton>
            <Cpabutton
              active={false}
              linkto={"/login"}
              shadow={"drop-shadow-2xl"}
            >
              {" "}
              Book A Demo{" "}
            </Cpabutton>
          </div>
          {/* video section */}
          <div className="my-40">
            <video muted autoPlay loop className="rounded-lg drop-shadow-md">
              <source src={Banner}></source>
            </video>
          </div>

          {/*Code section 1 */}
          <div data-aos="fade-right">
            <CodeBlock
              position={"lg:flex-row"}
              heading={
                <div className="text-4xl font-semibold">
                  Unlock Your <HilightText text={"Coding Potential"} /> With our
                  online Courses
                </div>
              }
              subHeading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              cpa1={{
                btnText: "Try it yourself",
                linkto: "/signup",
                active: true,
              }}
              cpa2={{
                btnText: "Learn more",
                linkto: "/login",
                active: false,
              }}
              codeBlock={`<!DOCTYPE html>  \n <head><title>Example</ \n title><linkrel="stylesheet"href="styles.css"> \n </head> \n <body> \n <h1> <a herf='/>Header</a> 
                              </h1>
                              <nav> <a herf="/three">Three<a/>
                              </nav>
                          `}
              codeColor={"text-[yellow]"}
              backgroundGradient={
                "bg-[linear-gradient(123.77deg,#1FA2FF_-6.46%,#12D8FA_59.04%,#A6FFCB_124.53%)]"
              }
            />
          </div>
          <div data-aos="fade-left">
            <CodeBlock
              position={"lg:flex-row-reverse"}
              heading={
                <div className="text-4xl font-semibold">
                  Start <HilightText text={"Coding In Seconds"} />
                </div>
              }
              subHeading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
              cpa1={{
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true,
              }}
              cpa2={{
                btnText: "Learn more",
                linkto: "/login",
                active: false,
              }}
              codeBlock={`<!DOCTYPE html>  \n <head><title>Example</ \n title><linkrel="stylesheet"href="styles.css"> \n </head> \n <body> \n <h1> <a herf='/>Header</a> 
                              </h1>
                              <nav> <a herf="/three">Three<a/>
                              </nav>
                          `}
              codeColor={"text-[white]"}
              backgroundGradient={
                "bg-[linear-gradient(123.77deg,#8A2BE2_-6.46%,#FFA500_59.04%,#F8F8FF_124.53%)]"
              }
            />
          </div>
        </div>
              <ExploreMore />
      </div>
      {/*Section-1 */}

     

      <div className="bg-pure-greys-5 text-black">
        <div className="h-[310px] bg-[url(../src/assets/Images/bghome.svg)] mt-12 bg-contain ">
          <div className="w-11/12 h-2/3 max-w-maxContent flex  justify-center items-center gap-5 mx-auto">
            <div className="flex flex-row gap-7 mt-12 items-center justify-center text-white ">
              <Cpabutton active={true} linkto={"/signup"}>
                <div className="flex gap-1 items-center ">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </Cpabutton>

              <Cpabutton active={false} linkto={"/signup"}>
                <div className="flex gap-1 items-center ">Learn More</div>
              </Cpabutton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
              <div className="flex flex-row gap-5 mb-10 mt-[95px]">

                <div data-aos="fade-right" className="text-4xl font-semibold w-[45%]">
                Get the skills you need for a <HilightText text={'job that is in demand'}/>
                </div>

                <div data-aos="fade-left" className="flex flex-col gap-10 w-[40%] items-start">
                  <p className="text-[16px]">
                  The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                  </p>
                  <Cpabutton active={true}>
                      <div>Learn More</div>
                  </Cpabutton>
              </div>     
          </div>



          <div className="w-11/12 flex flex-row justify-between">
                <div data-aos='fade-right' className="flex flex-col p-6 justify-center">
                {
                  CardData.map((cardValue)=>{
                   return (<LogoCard key={cardValue.id} index={cardValue.id} name={cardValue.name} description={cardValue.description} logo={cardValue.logo}/>)
                  })
                }
                </div>

                  <div data-aos='fade-left' className="relative flex justify-center">

                    <div className="bg-[linear-gradient(123.77deg,#1FA2FF_-6.46%,#12D8FA_59.04%,#A6FFCB_124.53%)] opacity-[30%] blur-xl rounded-[45%] left-[-14px] absolute z-[-1] h-[80%] w-[108%] p-4"></div>
                    <div className="">
                      <img  src='../src/assets/Images/TimelineImage.png'/>
                    </div>
                    <div className="absolute  z-[10] bottom-[-40px] drop-shadow-xl gap-4 px-8 py-5 bg-[#014A32] flex">
                      
                          <div className="flex items-center gap-4 ">
                            <p className="text-2xl text-white">10</p>
                            <p className="text-[#05A77B] text-sm">Years <br/> Experience</p>
                      
                        </div>

                          <div className="flex">
                            <hr className="border-[1px] h-[90%] border-[#396c5e]"/>
                          </div>

     
                          <div className="flex items-center gap-4">
                            <p className="text-2xl text-white">250</p>
                            <p className="text-[#05A77B] text-sm text-nowrap">Types of <br/>Courses</p>
               
                        </div>
                    </div>
                  </div>
              </div>
        </div>
      </div>

       <div className="w-full flex flex-col items-center justify-center bg-white ">
       <LearningLanguage/>
       <CardImage/>
          
          <div className="w-[80%] h-[100px] flex justify-center items-end mb-14">
         <Cpabutton active={true}>
               Learn More
             </Cpabutton>
         </div>
       </div>

       <div className="w-11/12 text-white flex justify-evenly items-center">

            <div data-aos='fade-left' className="w-[40%]  relative flex justify-center p-10">
                  <div className="w-full  z-[2] ">
                      <img  src="../src/assets/Images/Instructor.png"/>
                    </div>  

                    <div className="bg-white w-[85%] h-[85%] absolute top-[24px] left-[24px]">
                     
                    </div>
            </div>

            {/*second Section */}
            <div data-aos='fade-right' className=" gap-6 flex flex-col w-[28%] " >
                <div className="text-4xl">
                  Become an <br/> <HilightText text={'Instructor'}/>
                </div>
                <p className="text-[#838894] text-sm">
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>
                <div className="flex ">
                <Cpabutton active={true}>
                    Start Teaching Today
                    <FaArrowRight className="inline m-2"/>
                  </Cpabutton>
                </div>
                  
                    


            </div>

       </div>
            <ReviewSlider/>

    </div>
  );
};

{/**/}

export default Home;
