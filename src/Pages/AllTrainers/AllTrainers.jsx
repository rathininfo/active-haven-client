import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Helmet } from "react-helmet";

const AllTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fitness-tracker-server-side-nine.vercel.app/trainersInfo") // Updated to match backend route
      .then((res) => res.json())
      .then((data) => setTrainers(data));
    setLoading(false);
  }, []);

  // Show loading spinner when data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full" />
      </div>
    );
  }

  console.log(trainers, "trainers");

  return (
    <>
      <Helmet>
        <title>Active Haven |All Classes</title>
      </Helmet>
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-semibold text-gray-800 mb-12 text-center">
            Meet Our Trainers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Iterate through all trainers */}
            {trainers.map((trainer) => (
              <div
                key={trainer._id}
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={trainer.profileImage}
                  alt={trainer.name}
                  className="rounded-full w-32 h-32 mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold text-gray-800 text-center">
                  {trainer.name}
                </h3>
                <p className="text-center text-gray-600 mb-2">{trainer.bio}</p>
                <h2 className="text-center text-gray-600 mb-2 font-bold">
                  Year of Experience: {trainer.yearsOfExperience}
                </h2>
                <div className="flex justify-center space-x-4 mb-4">
                  {trainer.socialLinks?.facebook && (
                    <a
                      href={trainer.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaFacebook />
                    </a>
                  )}
                  {trainer.socialLinks?.instagram && (
                    <a
                      href={trainer.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaInstagram />
                    </a>
                  )}
                </div>
                <div className="text-center mb-4">
                  <strong>Available Slots:</strong>
                  <ul className="text-gray-600 list-disc list-inside">
                    {trainer.availableSlots.map((slot, index) => (
                      <li key={index}>{slot}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={`/trainerDetails/${trainer._id}`}
                  className="block mx-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                  Know More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllTrainers;
