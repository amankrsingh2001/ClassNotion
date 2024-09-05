import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Resetpassword from "./pages/ResetPassword.jsx";
import {Provider } from 'react-redux'
import { store } from "./store/store.jsx";
import {Toaster} from 'react-hot-toast'

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
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
    path: "/resetPassword",
    element: <Resetpassword />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={Router}>
      <StrictMode>
        <App />
        <Toaster/>
      </StrictMode>
    </RouterProvider>
  </Provider>
);
