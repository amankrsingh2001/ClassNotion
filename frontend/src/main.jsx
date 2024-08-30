import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      }
    ]
   
   
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={Router}>
      <StrictMode>
        <App />
      </StrictMode>
  </RouterProvider>
);
