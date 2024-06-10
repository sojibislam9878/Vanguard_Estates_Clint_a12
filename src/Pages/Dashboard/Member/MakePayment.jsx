
import paymentbg from '../../../assets/Images/paymentbg.jpg'
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';
const MakePayment = () => {
    const {user, loading, setMemberPaymentInfo} = useAuth()
    const navigate =useNavigate()
    const axiosSecure = useAxiosSecure()
    
    const {data:agreement}= useQuery({
        queryKey:["agreement"],
        enabled: !loading && !!user?.email,
        queryFn:async ()=>{
            const {data} = await axiosSecure(`/agreement/${user?.email}`)
            console.log(data);
            return data
        }
    })

    // const { data: agree } = useQuery({
    //     queryKey: ['agree'],
    //     queryFn: async () => {
    //       const { data } = await axios(`/agreement/${user?.email}`)
    //       console.log(data);
    //       return data
    //     },
    //   })

    const handleSubmit=(event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());
        setMemberPaymentInfo(formObject)
        console.log(formObject);
        navigate("/completepayment")
    }
    return (
        <div
        style={{ backgroundImage:`url(${paymentbg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",} }
         className='flex flex-col justify-center p-4  mx-auto h-screen my-auto'>
            <div>
            <Helmet>
        <title>Dashboard | Make Payment</title>
      </Helmet>
            <form onSubmit={handleSubmit}>
         <div className='w-2/3 mx-auto backdrop-blur-lg border p-4 rounded-xl'>
         <div className='lg:flex justify-between gap-6 '>
          <div className='w-full'>
            <p className='font-bold mb-2 '>Member email :</p>
            <input name='memberEmail' defaultValue={user?.email} readOnly className='w-full px-2 py-3 rounded-lg focus:outline-none '></input>
          </div>
          <div className='w-full mt-4 lg:mt-0'>
            <p className='font-bold mb-2 ' >Floor No :</p>
            <input name='floorNo' defaultValue={agreement?.floor_number} readOnly className='w-full px-2 py-3 rounded-lg focus:outline-none '></input>
          </div>
          </div>
         <div className='lg:flex justify-between gap-6 mt-4 lg:mt-2'>
          <div className='w-full'>
            <p className='font-bold mb-2 '>Block Name :</p>
            <input name='blockNo' defaultValue={agreement?.block_name} readOnly className='w-full px-2 py-3 rounded-lg focus:outline-none '></input>
          </div>
          <div className='w-full mt-4 lg:mt-0'>
            <p className='font-bold mb-2 ' >Apartment No :</p>
            <input name='apartmentNo' defaultValue={agreement?.apartment_number} readOnly className='w-full px-2 py-3 rounded-lg focus:outline-none '></input>
          </div>
          </div>
         <div className='lg:flex justify-between gap-6 mt-4 lg:mt-2'>
          <div className='w-full'>
            <p className='font-bold mb-2 '>Rent :</p>
            <input name='rent' defaultValue={agreement?.rent} readOnly className='w-full px-2 py-3 rounded-lg focus:outline-none '></input>
          </div>
          <div className='w-full mt-4 lg:mt-0'>
            <p className='font-bold mb-2 ' >Month :</p>
            <select id="dropdown" name="month" className='w-full px-2 py-3 rounded-lg focus:outline-none'>
            <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june" selected>June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
    </select>
          </div>
          </div>
         <input type="submit" value={"Pay Now"} className='btn w-full mt-6 text-xl font-bold' />
         </div>
        </form>

    </div>
        </div>
    );
};

export default MakePayment;