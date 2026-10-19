import * as Icons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from "react-router-dom";

// variant "row" = desktop sidebar row, "pill" = mobile segmented pill
const SidebarLink = ({ link, iconName, variant = "row" }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const active = matchRoute(link.path);

  if (variant === "pill") {
    return (
      <NavLink
        to={link.path}
        className={`segmented-item shrink-0 inline-flex items-center gap-2 whitespace-nowrap ${
          active ? "segmented-item-active !bg-white !text-night" : ""
        }`}
      >
        {Icon && <Icon className="text-base" />}
        {link.name}
      </NavLink>
    );
  }

  return (
    <NavLink
      to={link.path}
      className={`group flex items-center gap-3 p-1.5 pr-4 rounded-full text-sm font-medium transition ${
        active ? "bg-white/[0.08] text-white" : "text-white/55 hover:text-white hover:bg-white/[0.04]"
      }`}
    >
      <span
        className={`grid place-items-center shrink-0 w-10 h-10 rounded-full transition ${
          active
            ? "bg-white text-night"
            : "bg-white/[0.06] border border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/[0.1]"
        }`}
      >
        {Icon && <Icon className="text-[17px]" />}
      </span>
      <span className="whitespace-nowrap truncate">{link.name}</span>
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-citrus" />}
    </NavLink>
  );
};

export default SidebarLink;
