import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import "./App.css";
import Footer from "./pages/Footer";
import Navbar from "./components/Common/Navbar";
import WorkspaceShell from "./components/workspace/WorkspaceShell";
import Ambient from "./components/ui/Ambient";

const App = () => {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";
  const isWorkspace = location.pathname === "/courses" || location.pathname.startsWith("/educators");
  const isPlayer = location.pathname.startsWith("/view-course");

  return (
    <div className="relative isolate w-full min-h-screen text-foreground flex flex-col font-sans">
      <Ambient />
      {!isAuthPage && !isWorkspace && <Navbar />}
      {/* bottom padding leaves room for the mobile dock */}
      <main className={`flex-1 flex flex-col ${!isAuthPage && !isWorkspace ? "pb-28 md:pb-0" : ""}`}>
        {isWorkspace ? <WorkspaceShell><Outlet /></WorkspaceShell> : <Outlet />}
      </main>
      {!isAuthPage && !isPlayer && !isWorkspace && <Footer />}
    </div>
  );
};

export default App;
