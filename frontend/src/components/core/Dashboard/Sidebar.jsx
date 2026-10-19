import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiChevronsLeft, FiX } from "react-icons/fi";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logOut } from "../../../services/authApi";
import SidebarLink from "./SidebarLink";
import ConfirmationModal from "../../Common/ConfirmationModal";

const Sidebar = ({ collapsed = false, onToggleCollapsed, mobileOpen = false, onCloseMobile }) => {
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

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event) => event.key === "Escape" && onCloseMobile?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, onCloseMobile]);

  const visibleLinks = sidebarLinks.filter((link) => !(link.type && user?.accountType !== link.type));
  const settingsLink = { name: "Settings", path: "/dashboard/setting" };

  // `compact` only applies on desktop; the mobile drawer is always expanded.
  const content = (compact) => (
    <div className="flex flex-col h-full">
      {/* User */}
      <div className={`flex items-center gap-3 border-b border-foreground/[0.07] ${compact ? "justify-center px-2 py-4" : "px-4 py-4"}`}>
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          title={compact ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}` : undefined}
          className="w-9 h-9 shrink-0 rounded-full object-cover bg-surface-2"
        />
        {!compact && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-foreground/55 truncate mt-0.5">{user?.accountType}</p>
          </div>
        )}
        {!compact && onCloseMobile && mobileOpen && (
          <button type="button" className="btn-icon lg:hidden" onClick={onCloseMobile} aria-label="Close menu">
            <FiX />
          </button>
        )}
      </div>

      {/* Main nav */}
      <nav className={`flex-1 overflow-y-auto no-scrollbar py-4 ${compact ? "px-2" : "px-3"}`} aria-label="Dashboard">
        {!compact && <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-foreground/45">Menu</p>}
        <ul className="flex flex-col gap-0.5">
          {visibleLinks.map((link) => (
            <li key={link.id}>
              <SidebarLink link={link} iconName={link.icon} collapsed={compact} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className={`border-t border-foreground/[0.07] py-3 flex flex-col gap-0.5 ${compact ? "px-2" : "px-3"}`}>
        <SidebarLink link={settingsLink} iconName="VscSettingsGear" collapsed={compact} />
        <button
          type="button"
          onClick={openLogoutModal}
          title={compact ? "Log out" : undefined}
          className={`group flex items-center gap-3 h-10 rounded-lg text-sm font-medium text-foreground/60 hover:text-rose hover:bg-rose/10 transition ${
            compact ? "justify-center px-0" : "px-3"
          }`}
        >
          <FiLogOut className="text-[17px] shrink-0" />
          {!compact && "Log out"}
        </button>
        {onToggleCollapsed && (
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`hidden lg:flex items-center gap-3 h-10 rounded-lg text-sm text-foreground/50 hover:text-foreground hover:bg-foreground/[0.05] transition ${
              compact ? "justify-center px-0" : "px-3"
            }`}
          >
            <FiChevronsLeft className={`text-[17px] shrink-0 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
            {!compact && "Collapse"}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: docked to the left edge, full height under the navbar */}
      <aside
        className={`hidden lg:block shrink-0 sticky top-[var(--nav-h,64px)] h-[calc(100vh-var(--nav-h,64px))] border-r border-foreground/[0.08] bg-[var(--panel)] transition-[width] duration-300 ease-out overflow-hidden ${
          collapsed ? "w-[72px]" : "w-[248px]"
        }`}
      >
        {content(collapsed)}
      </aside>

      {/* Tablet / mobile: off-canvas drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[1100] bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
        aria-hidden
      />
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-[1101] w-[280px] max-w-[85vw] bg-[var(--panel)] border-r border-foreground/[0.08] shadow-2xl transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
        inert={mobileOpen ? undefined : ""}
      >
        {content(false)}
      </aside>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
