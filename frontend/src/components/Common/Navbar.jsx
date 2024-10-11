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



const Navbar = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { totalItem } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [navbarCont, setNavbarCont] = useState(false);
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



  return (
    <div className={`h-14 flex justify-center items-center  border-b-richblack-700 ${ location.pathname.includes('catalog') || location.pathname.includes('dashboard')?'bg-richblack-800':'bg-richblack-900'}`}>
      <div className="w-11/12 flex max-w-maxContent bg-inherit  items-center justify-between gap-2">
        <Link to={"/"}>
          <img src={"/assets/Logo/Logo-Full-Light.png"} width={160} height={42} loading="lazy" />
        </Link>
        {
         navbarCont?<ImCross className={` sm:hidden  text-2xl p-1 h-[40px] w-[40px]  text-white`} onClick={()=>setNavbarCont(!navbarCont)}/> :<TiThMenu className={` sm:hidden  text-2xl p-1 h-[40px] w-[40px]  text-white`} onClick={()=>setNavbarCont(!navbarCont)}/>

        }
       
        <nav className={navbarCont?` absolute flex items-center justify-center top-[55px] z-10 p-4 left-[0px] w-full bg-inherit ${ location.pathname.includes('catalog') || location.pathname.includes('dashboard')?'bg-richblack-800':'bg-richblack-900'}`:'hidden sm:block'} >
          <ul className="flex sm:flex-row flex-col  sm:gap-4 gap-6 sm:p-0 py-8 mr-4">
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

                      <div className="invisible flex flex-col z-20 text-white rounded-md translate-x-[-51%] translate-y-[20%] bg-richblack-800 absolute left-[50%] top-[50%] group-hover:visible opacity-0 transition-all duration-200 group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded translate-x-[80%] translate-y-[-5%] bg-richblack-800"></div>
                        {subLinks.length === 0 ? (
                          <div>Testing </div>
                        ) : (
                          subLinks?.filter((subLink)=>(subLink?.course?.length>0)).map((subLink, i)=>{
                            return (
                              <Link key={i} to={`/catalog/${subLink.name.split(' ').join("_").toLowerCase()}`}>
                              <p className="px-8 py-4 font-inter text-[#F1F2FF] font-bold">{subLink.name}</p>
                              </Link>
                            )
                          })
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={item.path}>
                      <p
                        className={`text-sm font-inter hover:text-yellow-25 hover:scale-110 duration-100 ${
                          matchRoute(item?.path)
                            ? "text-yellow-50"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="sm:flex hidden   lg:flex-row gap-2 items-center">
          {token && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
             <FiShoppingCart className="text-white mr-4"/>
              {totalItem > 0 && <span className=" absolute w-[16px] h-[16px] font-bold text-center bottom-2 left-3 bg-[#F1F2FF] rounded-full  text-xs text-black">{totalItem}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="text-richblack-50  text-nowrap rounded-md border-2 text-sm border-richblack-700 px-[12px] py-[6px] hover:scale-[1.04] duration-100 bg-richblack-800">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="text-richblack-50 md:inline-block hidden text-nowrap rounded-md border-2 text-sm border-richblack-700 px-[12px] py-[6px] hover:scale-[1.04] duration-100 bg-richblack-800">
                Sign Up
              </button>
            </Link>
          )}
          {token  && <ProfileDropDown />}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
