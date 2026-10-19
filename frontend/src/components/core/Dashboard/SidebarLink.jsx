import * as Icons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({ link, iconName, collapsed = false }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const active = matchPath({ path: link.path, caseSensitive: false, end: false }, location.pathname);

  return (
    <NavLink
      to={link.path}
      title={collapsed ? link.name : undefined}
      aria-label={collapsed ? link.name : undefined}
      className={`relative flex items-center gap-3 h-10 rounded-lg text-sm font-medium transition-colors ${
        collapsed ? "justify-center px-0" : "px-3"
      } ${
        active
          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
          : "text-foreground/65 hover:text-foreground hover:bg-foreground/[0.05]"
      }`}
    >
      {active && !collapsed && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-[var(--accent)]" />}
      {Icon && <Icon className="text-[18px] shrink-0" />}
      {!collapsed && <span className="truncate">{link.name}</span>}
    </NavLink>
  );
};

export default SidebarLink;
