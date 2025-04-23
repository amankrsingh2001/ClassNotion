import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import { HilightText } from "./HilightText";
import CourseCard from "./CourseCard";
import {motion} from "motion/react"
import { AnimatePresence } from "framer-motion";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
    
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [active,setActive] = useState(0)

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
  };

  return (
    <>
      <div className="relative w-11/12 ">
        <div className="text-4xl font-semibold text-center text-white">
          Unlock the <HilightText color={'bg-gradient-to-l from-[#A393BF] to-[#A293BF] text-transparent bg-clip-text'} text={"Power of Code"} />
        </div>

        <p className="text-center text-lg m-4 text-white font-bask">
          Learn to build anything you can imagine
        </p>

        <motion.div className="flex rounded-full mx-auto w-fit  border-[#fff] border-[1px]  ">
          {tabName.map((el, index) => {
            return (
              <div
                className={`text-sm flex flex-row items-center gap-2 shadow-2xl shadow-[#a293bf]
            ${
                  currentTab === el
                    ? "bg-[#a293bf] text-[#fff] font-medium"
                    : "text-[#fff] "
                } rounded-3xl duration-200 cursor-pointer  hover:text-richblack-5 px-5 py-4`}
                key={index}
                onClick={() => setMyCards(el)}
              >
                {el}
              </div>
            );
          })}
        </motion.div>
      </div>
      <div className="justify-center  gap-10  text-[#F1F2FF] flex flex-col sm:flex-row drop-shadow-xl relative  bottom-[-80px]">
        {courses.map((el, index) => {
          return <>

                 <CourseCard key={index} setActive={setActive} active={active} index={index} data={el} />
            
          </>;
        })}
      </div>
    </>
  );
};
export default ExploreMore;
