import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VscDashboard, VscSignOut, VscSettingsGear } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import userOnClickOutside from "../../../hooks/useOnClickOutside";
import { logOut } from "../../../services/authApi";

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const ref = useRef(null);

  userOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  const logOutHandler = () => {
    setOpen(false);
    dispatch(logOut(navigate));
  };

  const itemClass = "flex w-full items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/[0.06] transition";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        className="block rounded-full p-[2px] bg-brand transition hover:shadow-glow"
      >
        <img src={user?.image} alt={user?.firstName} className="w-10 h-10 rounded-full object-cover border-2 border-night" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[calc(100%+12px)] right-0 z-[1000] w-64 glass-strong bg-surface-2/95 rounded-3xl p-2 shadow-card"
          >
            <div className="flex items-center gap-3 p-3">
              <img src={user?.image} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-foreground/45">{user?.accountType}</p>
              </div>
            </div>
            <div className="divider my-1" />
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)} className={itemClass}>
              <VscDashboard className="text-base" /> Dashboard
            </Link>
            <Link to="/dashboard/setting" onClick={() => setOpen(false)} className={itemClass}>
              <VscSettingsGear className="text-base" /> Settings
            </Link>
            <button onClick={logOutHandler} className={`${itemClass} hover:!text-rose`}>
              <VscSignOut className="text-base" /> Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropDown;
