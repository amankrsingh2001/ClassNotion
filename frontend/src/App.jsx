import { Outlet, useLocation } from "react-router-dom";

import "./App.css";
import Footer from "./pages/Footer";
import Navbar from "./components/Common/Navbar";
import Ambient from "./components/ui/Ambient";

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";
  const isPlayer = location.pathname.startsWith("/view-course");

  return (
    <div className="relative isolate w-full min-h-screen text-white flex flex-col font-sans">
      <Ambient />
      {!isAuthPage && <Navbar />}
      {/* bottom padding leaves room for the mobile dock */}
      <main className={`flex-1 flex flex-col ${!isAuthPage ? "pb-28 md:pb-0" : ""}`}>
        <Outlet />
      </main>
      {!isAuthPage && !isPlayer && <Footer />}
    </div>
  );
};

export default App;
