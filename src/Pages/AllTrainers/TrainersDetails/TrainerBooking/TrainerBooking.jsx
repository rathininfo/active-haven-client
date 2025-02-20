import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { Helmet } from "react-helmet";

const TrainerBooking = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { trainer, slot } = location.state || {}; // Destructure trainer and slot from state

  // State to handle loading or errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!trainer || !slot) {
      setError("Invalid booking details. Please try again.");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [trainer, slot]); // Run effect when trainer or slot changes

  if (loading) {
    return <p className="text-center text-blue-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Handle the "Join Now" button click
  const handleJoinNow = (plan) => {
    const price = plan === "Basic" ? 10 : plan === "Standard" ? 50 : 100;
    const paymentData = {
      trainer: trainer.name,
      className: trainer.className,
      slot: slot,
      plan: plan,
      price: price,
      name: user.displayName, // Replace with actual user data
      email: user.email, // Replace with actual user data
    };

    axios
      .post(
        "https://fitness-tracker-server-side-nine.vercel.app/paymentData",
        paymentData
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error while submitting payment data:", err);
      });
    navigate("/payment", { state: paymentData });
  };

  return (
    <>
      <Helmet>
        <title>Active Haven | Trainer Booking</title>
      </Helmet>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Trainer Booking Page</h1>
        <h2 className="text-xl font-semibold">Trainer: {trainer.name}</h2>
        <p className="text-lg">Selected Slot: {slot}</p>

        {/* Membership Plans */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Membership Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Basic", "Standard", "Premium"].map((plan, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-lg font-bold">{plan} Membership</h3>
              <ul className="list-disc list-inside text-gray-600 mb-2">
                {plan === "Basic" && (
                  <>
                    <li>Access to gym facilities</li>
                    <li>Use of cardio and strength training equipment</li>
                    <li>Access to locker rooms and showers</li>
                  </>
                )}
                {plan === "Standard" && (
                  <>
                    <li>All Basic benefits</li>
                    <li>Access to group fitness classes</li>
                    <li>Discounts on massage or nutrition counseling</li>
                  </>
                )}
                {plan === "Premium" && (
                  <>
                    <li>All Standard benefits</li>
                    <li>Personal training sessions</li>
                    <li>Additional amenities like sauna or steam room</li>
                  </>
                )}
              </ul>
              <p className="text-xl font-bold">
                ${index === 0 ? 10 : index === 1 ? 50 : 100}
              </p>
              <button
                onClick={() => handleJoinNow(plan)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Join Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrainerBooking;
