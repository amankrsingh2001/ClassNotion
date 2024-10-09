import Sidebar from "../components/core/Dashboard/Sidebar"
import { Outlet } from "react-router-dom";

const Dashboard = () =>{
    //fix loading 

    return <div className="relative w-full flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar/>
        <div className="h-full w-full overflow-auto">
            <div className="mx-auto w-full  py-10">
                <Outlet/>
            </div>
        </div>
    </div>
}

export default Dashboard