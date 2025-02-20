import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddClass = () => {
  // Class name options
  const classOptions = [
    "Zen Fusion",
    "Fitness Fiesta",
    "Body Blast",
    "Sweat & Shine",
    "Rhythm Revolution",
    "Core Fusion",
    "Pilates Powerhouse",
    "Circuit Fusion",
    "Kickboxing Cardio",
    "High-intensity interval training (HIIT)",
    "Flex & Flow",
    "Spin & Sculpt",
    "Power Sculpt",
    "Warrior Workout",
    "Dance Cardio Party",
    "Booty Bootcamp",
    "Bounce & Burn",
    "Mindful Movement",
    "Strength & Grace",
    "HIIT Hype",
    "Box & Burn",
    "TRX Total Body",
    "Strong Nation",
  ];

  const [className, setClassName] = useState(""); // State to store selected class name
  const [imageUrl, setImageUrl] = useState(""); // Changed to store image URL
  const [details, setDetails] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Handle form input changes
  const handleClassNameChange = (e) => setClassName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value); // Handle image URL input
  const handleDetailsChange = (e) => setDetails(e.target.value);
  const handleAdditionalInfoChange = (e) => setAdditionalInfo(e.target.value);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const classData = {
      className,
      imageUrl,
      details,
      additionalInfo,
    };

    // Sending POST request to backend
    fetch("https://fitness-tracker-server-side-nine.vercel.app/addClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Show success alert with SweetAlert2
          Swal.fire({
            title: "Success!",
            text: "Class added successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            // Reset the form fields after success
            setClassName("");
            setImageUrl("");
            setDetails("");
            setAdditionalInfo("");
          });
        } else {
          // Show error alert if there's an issue
          Swal.fire({
            title: "Error!",
            text: "There was an issue adding the class.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Show error alert if the fetch fails
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Add a New Class
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Class Name:
          </label>
          <select
            value={className}
            onChange={handleClassNameChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a class</option>
            {classOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Class Image URL:
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={handleImageUrlChange}
            placeholder="Enter image URL"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Class Details:
          </label>
          <textarea
            value={details}
            onChange={handleDetailsChange}
            placeholder="Enter class details"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Additional Info:
          </label>
          <textarea
            value={additionalInfo}
            onChange={handleAdditionalInfoChange}
            placeholder="Enter any additional info"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
