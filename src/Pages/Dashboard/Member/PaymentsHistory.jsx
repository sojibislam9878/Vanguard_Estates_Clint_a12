
import { Helmet } from "react-helmet";
import Spinner from "../../../Components/Spinner";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const PaymentsHistory = () => {
  const [searchText, setSearchText] = useState();
  const { user , loading} = useAuth();
  const [isLoading, setIsloading]=useState(true)
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo]=useState([])
  useEffect(()=>{
    
    fetch(`${import.meta.env.VITE_API_URL}/payment/${user?.email}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      setPaymentInfo(data)
      setIsloading(false)
    })

  },[ user?.email])

  const handleSearch = async (e) => {
    setIsloading(true)
    e.preventDefault();
    const {data}= await axiosSecure(`/payments/${user?.email}?search=${searchText}`)
    setPaymentInfo(data)
    setIsloading(false)
  };
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };


    if (loading || isLoading) {
      return <Spinner></Spinner>
    }
    return (
        <div className="p-4">
          <Helmet>
        <title>Dashboard | Payment History</title>
      </Helmet>
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