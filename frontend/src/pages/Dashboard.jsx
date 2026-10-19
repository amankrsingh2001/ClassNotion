import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { sidebarLinks } from "../data/dashboard-links";

const STORAGE_KEY = "classnotion-sidebar-collapsed";

const readCollapsed = () => {
  try { return localStorage.getItem(STORAGE_KEY) === "1"; } catch { return false; }
};

// Keeps --nav-h in sync with the real navbar height so the sidebar sits flush beneath it.
const useNavHeight = () => {
  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const apply = () => document.documentElement.style.setProperty("--nav-h", `${header.offsetHeight}px`);
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useNavHeight();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const toggleCollapsed = () => {
    setCollapsed((value) => {
      try { localStorage.setItem(STORAGE_KEY, value ? "0" : "1"); } catch { /* storage unavailable */ }
      return !value;
    });
  };

  const current = [...sidebarLinks, { name: "Settings", path: "/dashboard/setting" }].find((link) =>
    location.pathname.toLowerCase().startsWith(link.path.toLowerCase())
  );

  return (
    <div className="flex items-start w-full">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={toggleCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 min-w-0">
        {/* Tablet / mobile: page title + menu button */}
        <div className="lg:hidden sticky top-[var(--nav-h,64px)] z-30 flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-foreground/[0.07] bg-[var(--panel)]">
          <button type="button" className="btn-icon" onClick={() => setMobileOpen(true)} aria-label="Open dashboard menu">
            <FiMenu />
          </button>
          <p className="text-sm font-medium truncate">{current?.name || "Dashboard"}</p>
        </div>

        <main className="relative w-full min-w-0 min-h-[calc(100vh-var(--nav-h,64px))] px-4 sm:px-6 lg:px-10 pt-6 pb-10 lg:pt-8 lg:pb-16">
          <div className="mx-auto w-full max-w-[1200px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
