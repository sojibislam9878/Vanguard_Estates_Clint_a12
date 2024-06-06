import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "../CSS/CheckOutFrom.css"
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth";
const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const {user}=useAuth()
    const today = new Date()
    const onlyDate = today.toISOString().split('T')[0]

    useEffect(() => {
        getClintSecret({price:200})
      }, []);

      const getClintSecret = async (price)=>{
        const {data} = await axios.post("http://localhost:3000/create-payment-intent", price)
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

    if (paymentIntent.status ==="succeeded") {
        const paymentInfo = {
            transactionId:paymentIntent.id,
            date:onlyDate,
            clintName: user?.displayName,
            clintEmail: user?.email,
            cardBrand: paymentIntent.card?.brand,
        }
        console.log(paymentInfo);
        const {data}= await axios.post("http://localhost:3000/paymentinfo" , paymentInfo)
        console.log(data);
        if (data.insertedId) {
            alert("payment succees")
        }
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
      <button type="submit" className="btn" disabled={!stripe}>
        Pay
      </button>
    </form>
    );
};

export default CheckOutForm;