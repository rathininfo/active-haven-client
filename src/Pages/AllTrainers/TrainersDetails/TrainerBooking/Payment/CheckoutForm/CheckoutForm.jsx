import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";

const CheckoutForm = ({ trainer, slot, plan, price, userName, userEmail }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  console.log(price);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price })

      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      await axiosSecure.post("/paymentData", {
        paymentIntentId: paymentIntent.id,
        trainer,
        slot,
        plan,
        price,
        userName,
        userEmail,
      });

      alert("Payment successful!");
    } catch (err) {
      console.error("Payment error:", err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-2 mb-4" />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded"
        disabled={!stripe || !elements || !clientSecret || processing}
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
