import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";

import { categories } from "../../services/api";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import toast from "react-hot-toast";
import { category } from "../../services/courseDetail";



const Navbar = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { totalItem } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    fetchSubLinks();
  }, []);



  const fetchSubLinks = async () => {
    try {
      const result = await category();
      setSubLinks(result);
    } catch (error) {
      toast.error('Something went wrong')
      console.log("Failed to fetch the category list", error);
    }
  };

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="h-14 flex justify-center items-center bg-richblack-900 border-b-richblack-700">
      <div className="w-11/12 flex max-w-maxContent items-center justify-between gap-2">
        <Link to={"/"}>
          <img src={logo} width={160} height={42} loading="lazy" />
        </Link>

        <nav>
          <ul className="flex gap-4 mr-4">
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
        <div className="flex gap-2 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaCartPlus />
              {totalItem > 0 && <span>{totalItem}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="text-richblack-50 rounded-md border-2 text-sm  border-richblack-700 px-[12px] py-[6px] hover:scale-[1.04] duration-100 bg-richblack-800">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="text-richblack-50 rounded-md border-2 text-sm border-richblack-700 px-[12px] py-[6px] hover:scale-[1.04] duration-100 bg-richblack-800">
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
