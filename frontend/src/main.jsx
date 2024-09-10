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
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
      <Toaster />
    </Provider>
  </StrictMode>
);
