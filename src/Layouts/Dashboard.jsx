import { Outlet } from "react-router-dom";
import Sidebar from "../Components/ForDashboard/Sidebar";

const Dashboard = () => {
    return (
        <div>
            <div><Sidebar></Sidebar></div>
            <div><Outlet></Outlet></div>
        </div>
    );
};

export default Dashboard;