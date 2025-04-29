import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { TiThMenu } from "react-icons/ti";
import { category } from "../../services/courseDetail";

import {motion} from "motion/react"
import { animate } from "framer-motion";



const Navbar = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { totalItem } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [navbarCont, setNavbarCont] = useState(false);
  const [scrollY, setScrollY] = useState(false)


  useEffect(() => {
    fetchSubLinks();
  }, []);



  const fetchSubLinks = async () => {
    try {
      const result = await category();
      setSubLinks(result);
    } catch (error) {
      toast.error('Something went wrong')
    }
  };


  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  useEffect(()=>{
    const handleScroll  = ()=>{
      
      if(window.scrollY>10){
        setScrollY(true)
        console.log("Scrolled")
      }else{
        setScrollY(false)
      }
    }

      
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[])



  return (
    <motion.div  
    className={` right-1/2 translate-x-1/2 fixed z-[1001] ${scrollY?"w-[75%]":"w-full"} mx-auto top-2 h-20 flex justify-center items-center ${scrollY?"bg-[#0F0F0F]/90":"bg-[#0F0F0F]"} border-[1px] border-[#fff] rounded-lg z-10 duration-200 ease-linear drop-shadow-xl`}
>
      <div className="w-11/12 flex max-w-maxContent bg-inherit  items-center justify-between gap-2">
        <Link to={"/"}>
        <div>

          <img  src={"/assets/Logo/Logo-Full-Light.png"} width={160} height={42} loading="lazy" />
        </div>
        </Link>
        {
         navbarCont?<ImCross className={` sm:hidden  text-2xl p-1 h-[40px] w-[40px] ${token && "order-2 "}  text-white`} onClick={()=>setNavbarCont(!navbarCont)}/> :<TiThMenu className={` sm:hidden  text-2xl p-1 h-[40px] w-[40px] ${token && "order-2 "}  text-white`} onClick={()=>setNavbarCont(!navbarCont)}/>

        }
       
        <nav className={navbarCont?` absolute flex items-center justify-center top-[55px] z-10 p-4 left-[0px] w-full bg-inherit ${ location.pathname.includes('catalog') || location.pathname.includes('dashboard')?'bg-richblack-800':'bg-richblack-900'}`:'hidden sm:block'} >
          <ul className="flex sm:flex-row flex-col text-2xl  gap-4 md:gap-8  p-0 md:py-4 md:px-3 mr-4">
            {NavbarLinks.map((item, index) => {
              return (
                <li key={index}>
                  {item.title === "Catalog" ? (
                    <div className="flex items-center gap-1 cursor-pointer group relative">
                      <p
                        className={`text-sm font-inter text-white hover:scale-110 text-yellow-50":"text-white" }`}
                      >
                        {item.title}
                      </p>
                      <MdOutlineKeyboardArrowDown className="text-white" />

                      <div className="invisible flex flex-col  text-[#0F0F0F] divide-y-reverse rounded-2xl z-[1001] translate-x-[-51%] translate-y-[20%] bg-[#fff] duration-200 absolute left-[50%] top-[50%] group-hover:visible opacity-0 transition-all group-hover:opacity-100 lg:w-fit whitespace-nowrap">
                        <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded translate-x-[80%] translate-y-[-5%] bg-[#fff] "></div>
                        {subLinks && subLinks.length === 0 ? (
                            <div className=" animate-pulse p-6">

                            <div className="h-2 bg-[#666262] rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-[#666262] rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-[#666262] rounded-full dark:bg-gray-700"></div>
                        </div>
                        ) : 
                        (
                          subLinks?.filter((subLink)=>(subLink?.course?.length>0)).map((subLink, i, allLinks)=>{
                            return (
                              <Link  className={`${i !==allLinks.length-1? "":''} `} key={i} to={`/catalog/${subLink.name.split(' ').join("_").toLowerCase()}`}>
                              <motion.p  whileHover={{
                        scale:1.1,
                      }} className="px-8 py-4 text-sm text-[#0F0F0F] font-semibold ">{subLink.name}</motion.p>

                              </Link>

                            )
                          })
                        
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={item.path}>
                      <motion.p
                      whileHover={{
                        scale:1.3,
                        originX:0,
                        color:"#E5A317"
                      }}
                        className={`text-sm font-inter  ${
                          matchRoute(item?.path)
                            ? "text-[#E5A317]"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </motion.p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`sm:flex lg:flex-row space-x-4  items-center  ${token ?"flex order-1  ml-auto sm:ml-0":'hidden'}`}>
          {token && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
             <FiShoppingCart className="text-white mr-4 md:inline-block hidden "/>
              {totalItem > 0 && <span className=" absolute w-[16px] h-[16px] font-bold text-center bottom-2 left-3 bg-[#F1F2FF] rounded-full  text-xs text-black">{totalItem}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <motion.button
                    whileHover={{ scale: 1.1, background:"#fff",color:"#0F0F0F", boxShadow:"0px 0px 3px rgb(255,255,255)", transition:{duration:0.5, type:"spring", stiffness:200} }}
                whileTap={{scale:0.7}}
              className="text-richblack-50 text-nowrap rounded-2xl  sm:inline-block hidden border-[1px] text-sm border-[#F0F0F0] px-[12px] py-[6px] hover:scale-[1.04] duration-100 bg-[#0F0F0F]">
                Login
              </motion.button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <motion.button 
                 whileHover={{ scale: 1.1, background:"#fff",color:"#0F0F0F", boxShadow:"0px 0px 3px rgb(255,255,255)", transition:{duration:0.5, type:"spring", stiffness:200} }}
               whileTap={{scale:0.7}}
              className="text-richblack-50 md:inline-block rounded-2xl text-nowrap  border-[1px] text-sm border-[#F0F0F0] px-[12px] py-[6px] hover:scale-[1.04] duration-100 bg-[#0F0F0F]">
                Sign Up
              </motion.button>
            </Link>
          )}
          {token  && <ProfileDropDown />}

        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
