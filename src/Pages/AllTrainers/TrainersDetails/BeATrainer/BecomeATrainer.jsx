import React from "react";
import { useNavigate } from "react-router-dom";

const BecomeATrainer = () => {
  const navigate = useNavigate();

  const handleBecomeTrainerClick = () => {
    navigate("/become-a-trainer"); // Redirect to the "Become a Trainer" page
  };
  return (
    <section className="bg-gray-100 py-10 mt-10 text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Passionate About Fitness? Join Us!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Become a trainer and inspire others to achieve their fitness goals.
        </p>
        <button
          onClick={handleBecomeTrainerClick}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Become a Trainer
        </button>
      </div>
    </section>
  );
};

export default BecomeATrainer;
