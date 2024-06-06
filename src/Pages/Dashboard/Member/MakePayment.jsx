import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from '../../../Components/CheckOutForm';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const MakePayment = () => {
    return (
        <div>
            <div>
            <Elements stripe={stripePromise}>
      <CheckOutForm></CheckOutForm>
    </Elements>
            </div>
        </div>
    );
};

export default MakePayment;