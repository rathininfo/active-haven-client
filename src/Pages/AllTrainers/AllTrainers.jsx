import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllTrainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/trainers")
      .then((res) => res.json())
      .then((data) => setTrainers(data))
      .catch((error) => console.error("Error fetching trainers:", error));
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-semibold text-gray-800 mb-12 text-center">
          Meet Our Trainers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <p className="text-center text-gray-600 mb-2">
                {trainer.yearsOfExperience} years of experience
              </p>
              <div className="flex justify-center space-x-4 mb-4">
                {trainer.socialLinks.facebook && (
                  <a
                    href={trainer.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-800"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
                {trainer.socialLinks.instagram && (
                  <a
                    href={trainer.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
                {trainer.socialLinks.twitter && (
                  <a
                    href={trainer.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-600"
                  >
                    <i className="fab fa-twitter"></i>
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
  );
};

export default AllTrainers;
