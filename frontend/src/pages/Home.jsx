import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { HilightText } from "../components/core/HomePage/HilightText";
import Cpabutton from "../components/core/HomePage/Cpabutton";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import LearningLanguage from "../components/core/HomePage/LearningLanguage";
import CardImage from "../components/core/HomePage/CardImage";
import { LogoCard } from "../components/core/HomePage/LogoCard";
import CardData from "../data/CardData";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ReviewSlider from "../components/Common/ReviewSlider";
import { ContainerScroll } from "../components/ui/ContainerScroll";
import { motion } from "motion/react";

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 0,
      offset: 20,
      mirror: false,
    });
  }, []);

  const onClickHandler = () => {
    if (token) {
      toast.error(
        "You are already logged in please logout and signup as a instructor"
      );
    } else {
      navigate("/signup");
    }
  };

  const variants = {
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.5,
      },
    },
  };

  const innerh1 = {
    hidden: { x: -300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 2.7, type:"spring",
      stiffness:200 } },
  };
  const innerh3 = {
    hidden: { x: 200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 2.2 , type:"spring",
      stiffness:300} },
  };

  return (

    <>
      <div className="min-h-screen bg-[url('/public/assets/Images/landing.png')] text-white py-12">
        <div className="container mx-auto px-4 flex flex-col items-center justify-start gap-10">
          <button
            onClick={onClickHandler}
            className="btn-animate px-4 py-2  rounded-3xl text-white mt-20"
          >
            Join as an Instructor
          </button>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="py-8 w-full md:w-[70%] px-4 bg-[#0F0F0F]/60 space-y-6 border-b-[0.5px] border-t-[0.5px] border-[#E5A317] overflow-hidden shadow-sm bg-blend-saturation rounded-2xl"
          >
            <motion.h1
              variants={innerh1}
              className="md:text-5xl text-2xl text-center font-semibold tracking-wide font-bask"
            >
              Empower Your Future with{" "}
              <span className="bg-gradient-to-r from-[#E5A317] to-[#fff] text-transparent bg-clip-text">
                Coding Skills
              </span>
            </motion.h1>
            <motion.h3
              variants={innerh3}
              className="font-inter text-center py-3 hidden md:block w-[80%] mx-auto"
            >
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </motion.h3>
          </motion.div>

          <div className="w-[40%] flex flex-col sm:flex-row justify-center gap-4 sm:gap-12">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 3px rgb(255,255,255)",
                transition: { duration: 0.5, type: "spring", stiffness: 200 },
              }}
              className="border-2 border-white p-2 px-3 rounded-3xl"
            >
              Learn More
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.2,
                background: "#fff",
                color: "#0F0F0F",
                boxShadow: "0px 0px 3px rgb(255,255,255)",
                transition: { duration: 0.5 },
              }}
              className="bg-white rounded-3xl py-2  px-3 text-[#0F0F0F] border-[2px] font-bask font-semibold border-[#0f0f0f]"
            >
              Book A Demo
            </motion.button>
          </div>

          <div className="  p-4 rounded-2xl items-center justify-center gap-6  mt-8 flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 lg:w-1/3  rounded-tl-3xl rounded-br-3xl overflow-hidden">
              <video
                muted
                autoPlay
                loop
                className="rounded-[28px] w-full h-full object-cover drop-shadow-md"
              >
                <source src={"/assets/Images/banner.mp4"} className=""></source>
              </video>
            </div>

            <div className="w-full md:w-1/2  p-4 text-white text-center md:text-left">
             {/* pending */}
            </div>
          </div>
        </div>
      </div>

      <div className=" w-[80%] mx-auto px-24 flex  justify-center">
        <CodeBlock
          buttonBackground={"bg-[#A393BF] text-white"}
          inActiveBackground={"bg-white text-[#A393BF]"}
          position={"lg:flex-row flex-col"}
          heading={
            <div className="text-4xl font-semibold text-white ">
              Unlock Your{" "}
              <HilightText
                color={
                  "from-[#A293BF] to-[#C2B1E0] text-transparent bg-clip-text bg-gradient-to-r"
                }
                text={"Coding Potential"}
              />{" "}
              With our
              <HilightText
                color={
                  "from-[#A293BF] to-[#C2B1E0] text-transparent bg-clip-text bg-gradient-to-r"
                }
                text={"Online Courses"}
              />
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
            linkto: "/about",
            active: false,
          }}
          codeBlock={`<!DOCTYPE html>  \n <head><title>Example</ \n title><linkrel="stylesheet"href="styles.css"> \n </head> \n <body> \n <h1> <a herf='/>Header</a>
                              </h1>
                              <nav> <a herf="/three">Three<a/>
                              </nav>
                          `}
          codeColor={"text-[#A393BF]"}
          backgroundGradient={
            "bg-[linear-gradient(123.77deg,#1FA2FF_-6.46%,#73648A_59.04%,#A393BF_124.53%)]"
          }
        />
   
      </div>

      <div className=" w-[80%] mx-auto px-24 flex justify-center">
        <CodeBlock
          inActiveBackground={"bg-white text-[#F7B1AB]"}
          buttonBackground={"bg-[#F7B1AB] text-white"}
          position={"lg:flex-row-reverse flex-col"}
          heading={
            <div className="text-4xl font-semibold text-white">
              Start{" "}
              <HilightText
                color={
                  "from-[#E9BCB7] to-[#e2bcb9] text-transparent bg-clip-text bg-gradient-to-r"
                }
                text={"Coding In Seconds"}
              />
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
            linkto: "/about",
            active: false,
          }}
          codeBlock={`<!DOCTYPE html>  \n <head><title>Example</ \n title><linkrel="stylesheet"href="styles.css"> \n </head> \n <body> \n <h1> <a herf='/>Header</a>
              </h1>
              <nav> <a herf="/three">Three<a/>
              </nav>
          `}
          codeColor={"text-[#F7B1AB]"}
          backgroundGradient={
            "bg-[linear-gradient(123.77deg,#8A2BE2_-6.46%,#A393BF_59.04%,#0F0F0F_124.53%)]"
          }
        />
      </div>

      <div className="px-4 mt-10">
               <ExploreMore />
         </div>
          

     <div className=" relative h-96 bg-contain flex justify-center items-center flex-col mt-28 " >

     
             <p className="text-4xl  font-bask bg-gradient-to-tr from-[#A393BF] to-white text-transparent bg-clip-text "> Get the skills you need for a job that is in demand </p> 


                <div data-aos="fade-left" className="flex flex-col gap-10 md:w-[40%] items-start py-4">
                   <p className="text-sm text-center text-white">
                   The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                   </p>

               </div>

     </div>
          <div className="w-full h-[70vh] flex justify-center items-center">
          <div className="w-9/12 flex lg:flex-row flex-col justify-between">
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
                      <img  src='/assets/Images/TimelineImage.png'/>
                    </div>
                    <div className="absolute  z-[10] bottom-[-40px] drop-shadow-xl gap-4 px-8 py-5 bg-[#E4A51C] flex">

                          <div className="flex items-center gap-4 ">
                            <p className="text-2xl text-white">10+</p>
                            <p className="text-black text-sm">Years <br/> Experience</p>

                        </div>

                          <div className="flex">
                            <hr className="border-[1px] h-[90%] border-black"/>
                          </div>

                          <div className="flex items-center gap-4">
                            <p className="text-2x text-white text-center">250 </p>
                            <p className="text-black text-sm text-nowrap">Types of <br/>Courses</p>

                        </div>
                    </div>
                  </div>
              </div>
          </div>
     
          <div className="w-full flex flex-col items-center justify-center mt-12 ">
        <CardImage/>

           <div className="w-[80%] h-[100px] flex justify-center items-end mb-14">
          <Cpabutton active={true}>
                Learn More
              </Cpabutton>
          </div>
        </div>

        <div className="w-full text-white self-center flex flex-col sm:flex-row  lg:justify-evenly items-center">
</div>
    </>
  );
};

{
  /**/
}

export default Home;
