import { Outlet } from "react-router-dom";
import Home from "./pages/Home";
import './App.css'
import Footer from "./pages/Footer";



const App = () =>{
  return <div className="w-screen min-h-screen bg-richblack-900  flex flex-col font-inter">
    <Outlet></Outlet>
    <Footer/>

  </div>
}

export default App;