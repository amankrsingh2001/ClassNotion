import Sidebar from "../components/core/Dashboard/Sidebar"
import { Outlet } from "react-router-dom";

const Dashboard = () =>{
    //fix loading 

    return <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar/>
        <div className="h-[calc(100vh-3rem)] overflow-auto">
            <div className="mx-auto w-11/12 max-w-maxContent py-10">
                <Outlet/>
            </div>
        </div>
    </div>
}

export default Dashboard