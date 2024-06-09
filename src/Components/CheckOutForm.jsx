import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "../CSS/CheckOutFrom.css"
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const CheckOutForm = ({price}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const {user}=useAuth()
    const[processing, setProcessing]=useState(false)
    const today = new Date()
    const onlyDate = today.toISOString().split('T')[0]
    const{memberPaymentInfo}=useAuth()
    // console.log(memberPaymentInfo);
    const axiosSecure=useAxiosSecure()
    const navigate=useNavigate()

    useEffect(() => {
        getClintSecret({price:price})
      }, [price]);

      const getClintSecret = async (price)=>{
        const {data} = await axiosSecure.post("/create-payment-intent", price)
        console.log(data.clientSecret);
        setClientSecret(data.clientSecret)
    }
  
    const handleSubmit = async (event) => {
      
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
      
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setProcessing(true)
        }
       // Confirm payment 
       const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email,
                name: user?.displayName,
            },
        },
    });

    if (confirmError) {
      
        console.log('[confirmError]', confirmError);
    } 

    if (paymentIntent?.status ==="succeeded") {
        const paymentInfo = {
            transactionId:paymentIntent.id,
            date:onlyDate,
            clintName: user?.displayName,
            clintEmail: user?.email,
            pay:price,
            paymentMonth:memberPaymentInfo?.month,
        }
        console.log(paymentInfo);
        const {data}= await axiosSecure.post("/paymentinfo" , paymentInfo)
        console.log(data);
        if (data.insertedId) {
          setProcessing(false)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment successfull",
            showConfirmButton: false,
            timer: 1500
          });
        }
        navigate("/dashboard/paymentshistory")
    }
};
    return (
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" className="btn bg-blue-500  text-white" disabled={!stripe || processing}>
       {processing?(<span><FaSpinner  className='text-3xl animate-spin'/></span>):(`Pay ${price} $`)}
      </button>
    </form>
    );
};
CheckOutForm.propTypes = {
  price: PropTypes.number
};
export default CheckOutForm;