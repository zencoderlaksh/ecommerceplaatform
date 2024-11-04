// src/components/StripeCheckout.js
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/Slices/cartSlice"; // Assuming you have a clearCart action

const stripePromise = loadStripe(
  "pk_test_51QElDnLmEtYq2UbDzpKU7VAR1ZVPbnKsYb9Gm1OZ60FiscLjmk7Sk88XvVhJJVwisO2H9b5NXyKCx0Olpl7AUhao00wcjgnTpp"
);

const StripeCheckout = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      "YOUR_CLIENT_SECRET",
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // Clear the cart after successful payment
        dispatch(clearCart());
        alert("Payment successful!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border rounded p-2 mb-4" />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Pay ${totalAmount.toFixed(2)}
      </button>
    </form>
  );
};

export default StripeCheckout;
