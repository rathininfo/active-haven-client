import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error.message);
      alert("Payment failed. Please try again.");
    } else {
      console.log("Payment Method:", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-2 mb-4" />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded"
        disabled={!stripe}
      >
        Pay ${price}
      </button>
    </form>
  );
};

export default CheckoutForm;
