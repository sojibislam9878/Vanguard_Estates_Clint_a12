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
        <div className="p-4">
           <h1>All payments info here <span className="text-red-400">{paymentInfo?.length}</span></h1>
           <div>
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>TxID</th>
        <th>Payed Amount</th>
        <th>Month</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        paymentInfo?.map((payInfo, i)=><tr key={payInfo._id} className={`bg-${i % 2 === 0 ? 'base-300' : 'white'} border`}>
        <th>{i+1}</th>
        <td>{payInfo?.transactionId}</td>
        <td>{payInfo?.pay}</td>
        <td>{payInfo.paymentMonth}</td>
        <td>{payInfo.date}</td>
      </tr>)
      }
    </tbody>
  </table>
</div>
           </div>
        </div>
    );
};

export default PaymentsHistory;