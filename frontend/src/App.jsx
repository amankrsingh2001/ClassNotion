import { Outlet } from "react-router-dom";

import './App.css'
import Footer from "./pages/Footer";
import Navbar from "./components/Common/Navbar";



const App = () =>{
  return <div className="w-screen min-h-screen bg-richblack-900  flex flex-col font-inter">
    <Navbar />
    <Outlet>
    </Outlet>
    <Footer/>

  </div>
}

export default App;