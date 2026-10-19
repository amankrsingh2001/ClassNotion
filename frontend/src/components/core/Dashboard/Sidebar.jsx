import { sidebarLinks } from "../../../data/dashboard-links";
import { logOut } from "../../../services/authApi";
import { useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../Common/ConfirmationModal";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const openLogoutModal = () =>
    setConfirmationModal({
      text1: "Are You Sure",
      text2: "You will be logged Out of your Account",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(logOut(navigate)),
      btn2Handler: () => setConfirmationModal(null),
    });

  const visibleLinks = sidebarLinks.filter((link) => !(link.type && user?.accountType !== link.type));
  const settingsLink = { name: "Settings", path: "/dashboard/setting" };

  return (
    <>
      {/* Mobile / tablet: scrollable segmented pills */}
      <nav className="lg:hidden w-full -mx-1 px-1 overflow-x-auto no-scrollbar">
        <div className="segmented">
          {visibleLinks.map((link) => (
            <SidebarLink link={link} iconName={link.icon} key={link.id} variant="pill" />
          ))}
          <SidebarLink link={settingsLink} iconName="VscSettingsGear" variant="pill" />
          <button
            type="button"
            onClick={openLogoutModal}
            className="segmented-item shrink-0 inline-flex items-center gap-2 whitespace-nowrap !text-rose/80 hover:!text-rose"
          >
            <FiLogOut className="text-base" />
            Log out
          </button>
        </div>
      </nav>

      {/* Desktop: slim glass sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] shrink-0 sticky top-24 z-10 glass p-4 max-h-[calc(100vh-7.5rem)]">
        <div className="relative flex items-center gap-3 p-2 pb-5">
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-magenta/25 blur-3xl pointer-events-none" />
          <div className="relative shrink-0 p-[2px] bg-brand rounded-full">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="w-12 h-12 rounded-full object-cover bg-surface-2 border-2 border-night"
            />
          </div>
          <div className="relative min-w-0">
            <p className="text-[15px] font-semibold leading-tight truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <span className="pill h-6 mt-1.5 text-[11px]">{user?.accountType}</span>
          </div>
        </div>

        <div className="divider mx-2" />

        <p className="eyebrow px-3 pt-5 pb-3 text-[10px]">Menu</p>
        <nav className="flex flex-col gap-1 overflow-y-auto no-scrollbar">
          {visibleLinks.map((link) => (
            <SidebarLink link={link} iconName={link.icon} key={link.id} />
          ))}
        </nav>

        <div className="mt-auto pt-6 flex flex-col gap-1">
          <div className="divider mx-2 mb-3" />
          <SidebarLink link={settingsLink} iconName="VscSettingsGear" />
          <button
            type="button"
            onClick={openLogoutModal}
            className="group flex items-center gap-3 p-1.5 pr-4 rounded-full text-sm font-medium text-white/55 hover:text-rose hover:bg-rose/10 transition"
          >
            <span className="grid place-items-center shrink-0 w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 group-hover:border-rose/30 group-hover:bg-rose/15 transition">
              <FiLogOut className="text-[16px]" />
            </span>
            Log out
          </button>
        </div>
      </aside>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
