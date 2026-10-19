import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container-x pt-4 pb-10 lg:pt-8 lg:pb-16">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        <Sidebar />
        <main className="relative w-full min-w-0 flex-1 min-h-[calc(100vh-10rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
