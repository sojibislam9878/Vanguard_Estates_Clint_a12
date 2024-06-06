import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Root from "../Layouts/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Apartment from "../Pages/Apartment";
import Dashboard from "../Layouts/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile";
import MakePayment from "../Pages/Dashboard/Member/MakePayment";
import PaymentsHistory from "../Pages/Dashboard/Member/PaymentsHistory";
import Announcement from "../Pages/Dashboard/Announcement";
import AdminPro from "../Pages/Dashboard/Admin/AdminPro";
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons";
import ManageMembers from "../Pages/Dashboard/Admin/ManageMembers";
import AgreementRequests from "../Pages/Dashboard/Admin/AgreementRequests";
import CompletePayment from "../Pages/Dashboard/Member/CompletePayment";

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
    {
      path:"/dashboard",
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:"/dashboard",
          element:<MyProfile></MyProfile>
        },
        {
          path:"announcments",
          element:<Announcement></Announcement>
        },
        // member routs 
        {
          path:"makepayment",
          element:<MakePayment></MakePayment>
        },
        {
          path:"paymentshistory",
          element:<PaymentsHistory></PaymentsHistory>
        },
        // admin routes 
        {
          path:"adminprofile",
          element:<AdminPro></AdminPro>
        },
        {
          path:"managemembers",
          element:<ManageMembers></ManageMembers>
        },
        {
          path:"makeannouncement",
          element:<MakeAnnouncement></MakeAnnouncement>
        },
        {
          path:"agreementrequests",
          element:<AgreementRequests></AgreementRequests>
        },
        {
          path:"managecoupons",
          element:<ManageCoupons></ManageCoupons>
        },
      ]
    },
    
    {
      path:"/completepayment",
      element:<CompletePayment></CompletePayment>
    },
  ]);