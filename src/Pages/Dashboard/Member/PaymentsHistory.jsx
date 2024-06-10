
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

const PaymentsHistory = () => {
  const [searchText, setSearchText] = useState("");
  const [paymentInfo, setPaymentInfo] = useState([]);
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!loading && user?.email) {
      try {
        const { data } = await axiosSecure(`/payment/${user?.email}?search=${searchText}`);
        console.log(data);
        setPaymentInfo(data);
      } catch (error) {
        console.error("Error fetching payment info:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };


    
    return (
        <div className="p-4">
          <div className="border-b-2 border-dashed pb-6 lg:flex justify-center items-center gap-6 mt-6">
        <h1 className="text-center text-4xl font-bold flex-1">
          All payments info here <sup><span className="text-red-400">{paymentInfo.length}</span></sup>
        </h1>
        {/* Search */}
        <div className="join mt-3 w-full lg:w-2/3 mx-auto flex-1 border">
          <input
            type="text"
            name="search"
            className="input input-bordered join-item focus:outline-none w-full"
            placeholder="Search Month Name"
            value={searchText}
            onChange={handleInputChange}
          />
          <button
            onClick={handleSearch}
            className="btn join-item text-xl"
          >
            Search
          </button>
        </div>
      </div>
           <div>
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr  className='text-lg'>
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
        <td>{payInfo?.pay} $</td>
        <td className="capitalize">{payInfo.paymentMonth}</td>
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