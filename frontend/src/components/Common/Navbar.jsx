import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.allCategory);
      console.log(result.data.allCategory);
    } catch (error) {
      console.log("Failed to fetch the category list", error);
    }
  };

  const matchRoute = ( route ) => {
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

                      <div className="invisible flex flex-col z-20 text-white rounded-md translate-x-[-51%] translate-y-[20%] bg-richblack-600 absolute left-[50%] top-[50%] group-hover:visible opacity-0 transition-all duration-200 group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded translate-x-[80%] translate-y-[-5%] bg-richblack-600"></div>
                      {
                        subLinks.length === 0?<div>Testing </div>:(
                            subLinks.map((links, index)=>{
                              return <Link to={`/catalog/${links.name.split(' ').join('_').toLowerCase()}`}  key={index}>
                                <p className="px-4 py-2">{links.name}</p>
                              </Link>
                            })
                      )
                      }
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
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
