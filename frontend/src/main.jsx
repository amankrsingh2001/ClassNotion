import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./components/core/Auth/VerifyEmail.jsx";
import UpdatePassword from "./components/core/Auth/UpdatePassword.jsx";
import ResetPasswordTemp from "./components/core/Auth/ResetPasswordTemp.jsx";
import ConfirmChange from "./components/core/Auth/ConfirmChange.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Myprofile from "./components/core/Dashboard/Myprofile.jsx";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses.jsx";
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Setting from "./components/core/Dashboard/Setting.jsx";
import Cart from "./components/core/Dashboard/Cart/Cart.jsx";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse.jsx";
import MyCourses from "./components/core/Dashboard/MyCourses.jsx";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse.jsx";
import Catalog from "./pages/Catalog.jsx";
import CourseDetail from './pages/CourseDetails';
import ViewCourse from "./pages/ViewCourse.jsx";
import VideoDetails from "./components/core/viewCourse/VideoDetails.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { 
        path:'/about',
        element:<About/>

      },
      {
        path:'/dashboard',
        element:<PrivateRoute>
            <Dashboard/>
        </PrivateRoute>,
        children:[
          {
            path:'my-profile',
            element:<Myprofile/>
          },{
            path:'enrolled-courses',
            element:<EnrolledCourses/>
          },{
            path:"setting",
            element:<Setting/>
          },{
            path:"cart",
            element:<Cart/>
          },{
            path:'add-course',
            element:<AddCourse/>
          },{
            path:'my-Courses',
            element:<MyCourses/>
          },{
            path:'edit-course/:courseId',
            element:<EditCourse/>
          }

        ]
      },{
        path:'catalog/:catalogName',
        element:<Catalog/>
      },{
        path:'courses/:courseId',
        element:<CourseDetail/>
      }, {
        path: "/view-course",
        element: <PrivateRoute><ViewCourse /></PrivateRoute>,
        children: [
          {
            path: ":courseId/section/:sectionId/sub-section/:subSectionId",
            element: <VideoDetails />,
          },
        ],
      },
      {
        path:'/contact-us',
        element:<Contact/>
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: "/reset-password",
    element: <ResetPasswordTemp />,
  },
  {
    path: "/update-password/:id",
    element: <UpdatePassword />,
  },
  {
    path:'/confirmChange',
    element: <ConfirmChange/>
  }
]);

createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <RouterProvider router={Router} />
      <Toaster />
    </Provider>

);
