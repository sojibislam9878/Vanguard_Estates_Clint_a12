import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div>
            <h1 className="text-red-600">I am root</h1>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Root;