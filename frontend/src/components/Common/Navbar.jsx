import { Link, NavLink, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FiShoppingBag, FiChevronDown, FiArrowUpRight, FiHome, FiCompass, FiInfo, FiMessageCircle, FiUser, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "motion/react";

import { NavbarLinks } from "../../data/navbar-links";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { category } from "../../services/courseDetail";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const catalogPath = (name) => `/catalog/${name.split(" ").join("_").toLowerCase()}`;
const DOTS = ["bg-peach", "bg-magenta", "bg-violet", "bg-citrus", "bg-mint", "bg-orchid"];

const Navbar = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { totalItem } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [catalogSheet, setCatalogSheet] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchSubLinks = async () => {
      try {
        const result = await category();
        setSubLinks(result);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchSubLinks();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setCatalogSheet(false), [location.pathname]);

  const navigationLinks = NavbarLinks.map(item => token && item.title === "Home" ? { title: "Discover", path: "/courses" } : item);
  const matchRoute = (route) => matchPath({ path: route }, location.pathname);
  const catalogLinks = subLinks?.filter((subLink) => subLink?.course?.length > 0) ?? [];
  const isCatalogActive = location.pathname.startsWith("/catalog");
  const showCart = token && user?.accountType !== "Instructor";

  const CartButton = () => (
    <Link to="/dashboard/cart" aria-label="Cart" className="btn-icon relative">
      <FiShoppingBag />
      {totalItem > 0 && (
        <span className="absolute -top-0.5 -right-0.5 grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-brand text-[10px] font-bold text-foreground">
          {totalItem}
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* ───────── Top bar ───────── */}
      <header className="site-header sticky top-0 z-[1001]">
        <div
          className={`site-nav mx-auto max-w-maxContent flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300 ${
            scrolled ? "glass bg-surface/70 shadow-card" : "border border-transparent"
          }`}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="segmented">
              {navigationLinks.map((item) =>
                item.title === "Catalog" ? (
                  <li key={item.title} className="relative group">
                    <button className={`segmented-item flex items-center gap-1 ${isCatalogActive ? "segmented-item-active" : ""}`}>
                      {item.title}
                      <FiChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-4">
                      <div className="w-[340px] glass-strong bg-surface-2/90 p-2 rounded-3xl shadow-card">
                        <Link to="/courses" className="flex items-center justify-between px-3 py-3 mb-2 rounded-2xl bg-foreground/[0.06] text-sm">All courses <FiArrowUpRight /></Link>
                        <p className="eyebrow px-3 pt-2 pb-3">Categories</p>
                        {subLinks && subLinks.length === 0 ? (
                          <div className="space-y-2 p-1">
                            {[0, 1, 2].map((i) => (
                              <div key={i} className="skeleton h-12" />
                            ))}
                          </div>
                        ) : (
                          <div className="grid gap-1">
                            {catalogLinks.map((subLink, i) => (
                              <Link
                                key={subLink._id ?? i}
                                to={catalogPath(subLink.name)}
                                className="group/item flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl hover:bg-foreground/[0.06] transition"
                              >
                                <span className="flex items-center gap-3">
                                  <span className={`w-2 h-2 rounded-full ${DOTS[i % DOTS.length]}`} />
                                  <span className="text-sm font-medium text-foreground/90">{subLink.name}</span>
                                </span>
                                <span className="text-xs text-foreground/40 group-hover/item:hidden">{subLink.course.length} courses</span>
                                <FiArrowUpRight className="hidden group-hover/item:block text-foreground/70" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.title}>
                    <Link to={item.path} className={`segmented-item inline-flex items-center ${matchRoute(item?.path) ? "segmented-item-active" : ""}`}>
                      {item.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {showCart && <CartButton />}
            {token === null && (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm hidden sm:inline-flex">
                  Log in
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Get started
                </Link>
              </>
            )}
            {token && <ProfileDropDown />}
          </div>
        </div>
      </header>

      {/* ───────── Mobile dock ───────── */}
      <nav className="md:hidden fixed bottom-4 inset-x-0 z-[1001] flex justify-center px-4">
        <div className="flex items-center gap-1 p-1.5 rounded-full glass-strong bg-surface-2/80 shadow-card">
          {[
            { to: token ? "/courses" : "/", icon: FiHome, label: token ? "Discover" : "Home", end: true },
            { to: "/educators", icon: FiInfo, label: "Educators" },
            { to: "/contact-us", icon: FiMessageCircle, label: "Contact" },
          ].map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              aria-label={label}
              className={({ isActive }) =>
                `grid place-items-center w-12 h-12 rounded-full transition ${isActive ? "bg-foreground text-night" : "text-foreground/70"}`
              }
            >
              <Icon className="text-lg" />
            </NavLink>
          ))}
          <button
            aria-label="Catalog"
            onClick={() => setCatalogSheet(true)}
            className={`grid place-items-center w-12 h-12 rounded-full transition ${isCatalogActive ? "bg-foreground text-night" : "text-foreground/70"}`}
          >
            <FiCompass className="text-lg" />
          </button>
          <NavLink
            to={token ? "/dashboard/my-profile" : "/login"}
            aria-label="Account"
            className={({ isActive }) =>
              `grid place-items-center w-12 h-12 rounded-full transition ${
                isActive || location.pathname.startsWith("/dashboard") ? "bg-foreground text-night" : "bg-foreground/10 text-foreground"
              }`
            }
          >
            <FiUser className="text-lg" />
          </NavLink>
        </div>
      </nav>

      {/* Mobile catalog sheet */}
      <AnimatePresence>
        {catalogSheet && (
          <motion.div
            className="md:hidden fixed inset-0 z-[1002] bg-night/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCatalogSheet(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 inset-x-0 rounded-t-[32px] glass-strong bg-surface-2/95 p-5 pb-10"
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-foreground/20" />
              <div className="flex items-center justify-between mb-4">
                <p className="text-xl font-semibold">Browse catalog</p>
                <button className="btn-icon" onClick={() => setCatalogSheet(false)} aria-label="Close">
                  <FiX />
                </button>
              </div>
              <div className="grid gap-2">
                <Link to="/courses" className="row-item px-4 py-4 text-sm">Explore all courses <FiArrowUpRight /></Link>
                {catalogLinks.length === 0 && [0, 1, 2].map((i) => <div key={i} className="skeleton h-14" />)}
                {catalogLinks.map((subLink, i) => (
                  <Link key={subLink._id ?? i} to={catalogPath(subLink.name)} className="row-item">
                    <span className={`icon-circle ${i === 0 ? "" : "bg-foreground/10 text-foreground"}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${DOTS[i % DOTS.length]}`} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{subLink.name}</span>
                      <span className="block text-xs text-foreground/45">{subLink.course.length} courses</span>
                    </span>
                    <FiArrowUpRight className="text-foreground/50" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
