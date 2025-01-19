import React from "react";

const BecomeATrainer = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-6">Become a Trainer</h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Share your fitness expertise with our community and inspire others to
        lead healthier lives.
      </p>
      <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Expertise
          </label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows="4"
            placeholder="Describe your fitness expertise"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BecomeATrainer;
