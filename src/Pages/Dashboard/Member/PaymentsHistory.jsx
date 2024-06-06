import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const PaymentsHistory = () => {
    const {user, loading} =useAuth() 
    const {data:paymentInfo}= useQuery({
        queryKey:["paymentIndfo"],
        enabled: !loading && !!user?.email,
        queryFn: async()=>{
            const {data}= await axios(`http://localhost:3000/payment/${user?.email}`)
            console.log(data);
            return(data)
        }
    })
    return (
        <div>
           <h1>All payments info here <span className="text-red-400">{paymentInfo.length}</span></h1>
           <div>

           </div>
        </div>
    );
};

export default PaymentsHistory;