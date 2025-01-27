import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = ({ trainer, slot, plan, price, userName, userEmail }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!price) return; // Ensure price is present
    axiosSecure
      .post("/create-payment-intent", { price }) // Send price as an object
      .then((res) => {
        console.log("Payment Intent Response:", res.data);
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => console.error("Error creating payment intent:", error));
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    if (!clientSecret) {
      setErrorMessage("Client secret is missing or invalid.");
      return;
    }

    setProcessing(true);
    setErrorMessage("");

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setErrorMessage(error.message);
        setProcessing(false);
        return;
      }

      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (paymentError) {
        setErrorMessage(paymentError.message);
        setProcessing(false);
        return;
      }

      await axiosSecure.post("/save-payment-info", {
        paymentIntentId: paymentIntent.id,
        trainer,
        slot,
        plan,
        price,
        userName,
        userEmail,
      });

      Swal.fire({
        title: "Payment SuccessFully",
        text: "You clicked the button!",
        icon: "success",
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (!trainer || !slot || !plan || !price || !userName || !userEmail) {
    return <p className="text-red-500">Required data is missing.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#32325d",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#fa755a" },
          },
        }}
        className="border p-2 mb-4 rounded-md"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded"
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
