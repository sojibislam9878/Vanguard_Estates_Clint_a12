import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Root from "../Layouts/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Apartment from "../Pages/Apartment";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Root></Root>,
      children: [
        {
          path: "/",
          element:<Home></Home>,
        },
        {
          path: "/login",
          element:<Login></Login>,
        },
        {
          path: "/register",
          element:<Register></Register>,
        },
        {
          path: "apartment",
          element:<Apartment></Apartment>,
        },
      ],
    },
  ]);