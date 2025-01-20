import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../../../Providers/AuthProvider";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK); // Replace with your Stripe publishable key

const Payment = () => {
  const location = useLocation();
  const { trainer, slot, plan, price } = location.state || {};
  const { user } = useContext(AuthContext);

  // If required data is missing
  if (!trainer || !slot || !plan || !price) {
    return (
      <p className="text-center text-red-500">
        Invalid payment details. Please go back and try again.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Payment Page</h1>
      <div className="bg-gray-100 p-4 rounded shadow mb-6">
        <p className="text-lg">
          <strong>Trainer Name:</strong> {trainer}
        </p>
        <p className="text-lg">
          <strong>Slot:</strong> {slot}
        </p>
        <p className="text-lg">
          <strong>Package:</strong> {plan}
        </p>
        <p className="text-lg">
          <strong>Price:</strong> ${price}
        </p>
        <p className="text-lg">
          <strong>Your Name:</strong> {user.displayName}
        </p>
        <p className="text-lg">
          <strong>Your Email:</strong> {user.email}
        </p>
      </div>

      {/* Stripe Payment Form */}
      <Elements stripe={stripePromise}>
        <CheckoutForm
          trainer={trainer}
          slot={slot}
          plan={plan}
          price={price}
          userName={user.displayName}
          userEmail={user.email}
        />
      </Elements>
    </div>
  );
};

export default Payment;
