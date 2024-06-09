import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../../../Components/CheckOutForm';
import { loadStripe } from '@stripe/stripe-js';
import useAuth from '../../../Hooks/useAuth';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const CompletePayment = () => {
    const {memberPaymentInfo}=useAuth()
    const [couponCode, setCouponCode]=useState()
    const [searchCode, setSearchCode]=useState()
    const [discount, setDiscount]=useState()
    const [validOffer , setValidOffer]=useState(false)
    const [haveToPay, setHaveToPay]=useState(memberPaymentInfo.rent)
    const axiosSecure=useAxiosSecure()

        const {data:code}=useQuery({
            queryKey:["couponCode", searchCode],
            enabled:!!searchCode,
            queryFn: async()=>{
                const {data}= await axiosSecure(`/couponsvalidation/${searchCode}`)
                console.log(data);
                return data
                
            },
        })
    const handleCoupons =()=>{
        if (!couponCode) {
            return alert("enter a coupon code")
        }
        setSearchCode(couponCode)
    }

    useEffect(()=>{
        if (code?.notFound) {
            alert(code?.notFound)
        }else{
            const totalDiscount =( memberPaymentInfo?.rent * code?.percentage) / 100
        const discountedRent = memberPaymentInfo?.rent - totalDiscount
        console.log(discountedRent);
        setDiscount(totalDiscount)
        if (isNaN(discountedRent)) {
            return
        }else{
            setHaveToPay(discountedRent)
            setValidOffer(true)
        }
        }
        

    },[code, discount, haveToPay, memberPaymentInfo?.rent])

    return (
        <div className='p-4 h-screen flex justify-center items-center'>
    <div className='shadow-2xl w-full p-4 backdrop-blur-md lg:w-2/3 lg:mx-auto rounded-xl bg-[#D8136B] bg-opacity-80'>
            <div className=' text-xl font-bold'>
                <div className='text-white'>
                    <table>
                        <tbody>
                            <tr>
                                <td>You have to pay: </td>
                                <td> {memberPaymentInfo.rent}</td>
                            </tr>
                            {
                                validOffer && (
                                    <>
                                    <tr className='border-b-2 mb-2'>
                                <td>Total discount :</td>
                                <td className='flex justify-end'>-{discount}</td>
                            </tr>
                            <tr>
                                <td>Amount to Pay :</td>
                                <td className='flex justify-end'>{haveToPay}</td>
                            </tr>
                                    </>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="join mt-6">
              <input
              type="text"
              onBlur={(e)=>setCouponCode(e.target.value)}
                className="input input-bordered join-item focus:outline-none"
                placeholder="Have any Coupon Code?"
              />
              <button onClick={handleCoupons} className="btn join-item ">
                    Apply
              </button>
            </div>
            </div>
            <div className='w-full mt-8'>
            <Elements stripe={stripePromise}>
            <CheckOutForm price={haveToPay}></CheckOutForm>
             </Elements>
            </div>
            </div>
</div>
    );
};

export default CompletePayment;