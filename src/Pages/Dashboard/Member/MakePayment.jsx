import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from '../../../Components/CheckOutForm';
import paymentbg from '../../../assets/Images/paymentbg.jpg'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const MakePayment = () => {
    const {user, loading} = useAuth()
    
    const {data:agreement}= useQuery({
        queryKey:["agreement"],
        enabled: !loading && !!user?.email,
        queryFn:async ()=>{
            const {data} = await axios(`http://localhost:3000/agreement/${user?.email}`)
            console.log(data);
            return data
        }
    })

    // const { data: agree } = useQuery({
    //     queryKey: ['agree'],
    //     queryFn: async () => {
    //       const { data } = await axios(`http://localhost:3000/agreement/${user?.email}`)
    //       console.log(data);
    //       return data
    //     },
    //   })
    return (
        <div
        style={{ backgroundImage:`url(${paymentbg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",} }
         className='flex flex-col justify-center p-4  mx-auto h-screen my-auto'>
            <div className='shadow-2xl p-4 backdrop-blur-md lg:w-2/3 lg:mx-auto rounded-xl'>
            <div className='text-white text-xl font-bold'>
                <div className='flex justify-start'>
                    <p className='flex-1'>Apartment No: {agreement.apartment_number}</p>
                    <p className='flex-1'>Block No: {agreement.block_name}</p>
                </div>
                <div className='flex justify-start mt-8'>
                    <p className='flex-1'>Floor No: {agreement.floor_number}</p>
                    <p className='flex-1'>Rent No: {agreement.rent}$/month</p>
                </div>
            </div>
            <div className='w-full mt-8'>
            <Elements stripe={stripePromise}>
      <CheckOutForm></CheckOutForm>
    </Elements>
            </div>
            </div>
        </div>
    );
};

export default MakePayment;