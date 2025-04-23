import Sidebar from "../components/core/Dashboard/Sidebar"
import { Outlet } from "react-router-dom";

const Dashboard = () =>{
    //fix loading 

    return <div className="relative w-screen h-screen flex">
        <Sidebar/>
        <div className="h-full w-full overflow-auto">
            <div className="mx-auto w-full  py-10">
                <Outlet/>
            </div>
        </div>
    </div>
}

export default Dashboard