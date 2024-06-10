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
import ErrorPage from "../Pages/ErrorPage";
import Test from "../Pages/Test";
import PrivetRoute from "../PrivetRoutes/PrivetRoutes";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
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
          path: "/test",
          element:<Test></Test>,
        },
        {
          path: "/register",
          element:<Register></Register>,
        },
        {
          path: "/apartment",
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
          element:<PrivetRoute><MyProfile></MyProfile></PrivetRoute>
        },
        {
          path:"announcments",
          element:<PrivetRoute><Announcement></Announcement></PrivetRoute>
        },
        // member routs 
        {
          path:"makepayment",
          element:<PrivetRoute><MakePayment></MakePayment></PrivetRoute>
        },
        {
          path:"paymentshistory",
          element:<PrivetRoute><PaymentsHistory></PaymentsHistory></PrivetRoute>
        },
        // admin routes 
        {
          path:"adminprofile",
          element:<PrivetRoute><AdminPro></AdminPro></PrivetRoute>
        },
        {
          path:"managemembers",
          element:<PrivetRoute><ManageMembers></ManageMembers></PrivetRoute>
        },
        {
          path:"makeannouncement",
          element:<PrivetRoute><MakeAnnouncement></MakeAnnouncement></PrivetRoute>
        },
        {
          path:"agreementrequests",
          element:<PrivetRoute><AgreementRequests></AgreementRequests></PrivetRoute>
        },
        {
          path:"managecoupons",
          element:<PrivetRoute><ManageCoupons></ManageCoupons></PrivetRoute>
        },
      ]
    },
    
    {
      path:"/completepayment",
      element:<CompletePayment></CompletePayment>
    },
  ]);