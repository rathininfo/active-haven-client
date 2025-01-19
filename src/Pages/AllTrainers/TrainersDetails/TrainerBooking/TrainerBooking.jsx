import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TrainerBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trainer, slot } = location.state || {}; // Destructure trainer and slot from state

  // If state is missing or invalid, show an error message
  if (!trainer || !slot) {
    return (
      <p className="text-center text-red-500">
        Invalid booking details. Please try again.
      </p>
    );
  }

  // Handle the "Join Now" button click
  const handleJoinNow = (plan) => {
    const price = plan === "Basic" ? 10 : plan === "Standard" ? 50 : 100;

    const paymentData = {
      trainer: trainer.name,
      slot: slot,
      plan: plan,
      price: price,
      name: "Your Name", // Replace with actual user data
      email: "your.email@example.com", // Replace with actual user data
    };

    navigate("/payment", { state: paymentData });
  };

  return (
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
  );
};

export default TrainerBooking;
