import { Outlet, useLocation } from "react-router-dom";

import './App.css'
import Footer from "./pages/Footer";
import Navbar from "./components/Common/Navbar";



const App = () =>{
  const location = useLocation()
  console.log(location.pathname)
  return <div className="w-screen min-h-screen bg-[#0F0F0F]  flex flex-col font-inter">
    {
      (location.pathname !== '/signup' && location.pathname !== '/login' ) && <Navbar/>
    }
    <Outlet>
    </Outlet>
    {
      (location.pathname !== '/signup' && location.pathname !== '/login' ) && <Footer/>
    }

  </div>
}

export default App;