import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import BeATrainer from "./BeATrainer/BecomeATrainer";
import { Helmet } from "react-helmet";

const TrainersDetails = () => {
  const navigate = useNavigate();
  const trainer = useLoaderData();

  const handleSlotClick = (slot) => {
    navigate(`/trainerBooking/${trainer.id}`, { state: { trainer, slot } });
  };

  return (
    <>
      <Helmet>
        <title>Active Haven | Details</title>
      </Helmet>
      <div className="container mx-auto p-4">
        {/* Page Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Trainer Information Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center md:items-start">
              <img
                src={trainer.profileImage}
                alt={trainer.name}
                className="w-48 h-48 object-cover rounded-full shadow-lg mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">{trainer.name}</h1>

              {/* Specialization */}
              <p className="text-gray-600 font-medium">
                <strong>Expertise:</strong>{" "}
                {trainer.specialization || "Not specified"}
              </p>
            </div>
          </section>

          {/* Available Slots Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Available Slots</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {trainer.availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotClick(slot)}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow hover:bg-red-700 transition"
                >
                  {slot}
                </button>
              ))}
            </div>
          </section>
        </div>
        <BeATrainer />
      </div>
    </>
  );
};

export default TrainersDetails;
