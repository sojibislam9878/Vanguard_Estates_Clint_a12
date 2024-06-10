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
import AdminRoute from "../PrivetRoutes/AdminRoutes";
import MemberRoutes from "../PrivetRoutes/MemberRoutes";

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
          element:<MemberRoutes><PrivetRoute><MakePayment></MakePayment></PrivetRoute></MemberRoutes>
        },
        {
          path:"paymentshistory",
          element:<MemberRoutes><PrivetRoute><PaymentsHistory></PaymentsHistory></PrivetRoute></MemberRoutes>
        },
        // admin routes 
        {
          path:"adminprofile",
          element:<AdminRoute><PrivetRoute><AdminPro></AdminPro></PrivetRoute></AdminRoute>
        },
        {
          path:"managemembers",
          element:<AdminRoute><PrivetRoute><ManageMembers></ManageMembers></PrivetRoute></AdminRoute>
        },
        {
          path:"makeannouncement",
          element:<AdminRoute><PrivetRoute><MakeAnnouncement></MakeAnnouncement></PrivetRoute></AdminRoute>
        },
        {
          path:"agreementrequests",
          element:<AdminRoute><PrivetRoute><AgreementRequests></AgreementRequests></PrivetRoute></AdminRoute>
        },
        {
          path:"managecoupons",
          element:<AdminRoute><PrivetRoute><ManageCoupons></ManageCoupons></PrivetRoute></AdminRoute>
        },
      ]
    },
    
    {
      path:"/completepayment",
      element:<CompletePayment></CompletePayment>
    },
  ]);