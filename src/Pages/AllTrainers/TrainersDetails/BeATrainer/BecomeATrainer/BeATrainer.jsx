import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import Select from "react-select";

const BeATrainer = () => {
  const user = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "", // Autofill email from the user context
    age: "",
    profileImage: null,
    skills: [],
    availableDays: [],
    availableTime: "",
    otherInfo: "",
    status: "pending", // Default status
  });

  const navigate = useNavigate();

  const availableDaysOptions = [
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        skills: checked
          ? [...prevState.skills, value]
          : prevState.skills.filter((skill) => skill !== value),
      }));
    } else if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        profileImage: e.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSelectDays = (selectedOptions) => {
    setFormData((prevState) => ({
      ...prevState,
      availableDays: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for file upload
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "skills" || key === "availableDays") {
        data.append(key, formData[key].join(",")); // Join skills and availableDays arrays
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/trainers", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Trainer application submitted successfully!");
        navigate("/dashboard"); // Redirect after submission
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Be a Trainer</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email (Read-only)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Skills
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["Yoga", "Strength Training", "Cardio", "Pilates", "HIIT"].map(
              (skill) => (
                <div key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    id={skill}
                    name="skills"
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor={skill} className="text-sm text-gray-700">
                    {skill}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Available Days */}
        <div className="mb-4">
          <label
            htmlFor="availableDays"
            className="block text-sm font-medium text-gray-700"
          >
            Available Days
          </label>
          <Select
            id="availableDays"
            name="availableDays"
            isMulti
            options={availableDaysOptions}
            value={availableDaysOptions.filter((option) =>
              formData.availableDays.includes(option.value)
            )}
            onChange={handleSelectDays}
            closeMenuOnSelect={false}
            placeholder="Select available days"
            isSearchable={false} // Disables search
            required
          />
        </div>

        {/* Available Time */}
        <div className="mb-4">
          <label
            htmlFor="availableTime"
            className="block text-sm font-medium text-gray-700"
          >
            Available Time
          </label>
          <input
            type="text"
            id="availableTime"
            name="availableTime"
            value={formData.availableTime}
            onChange={handleChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Other Info */}
        <div className="mb-4">
          <label
            htmlFor="otherInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Other Info
          </label>
          <textarea
            id="otherInfo"
            name="otherInfo"
            value={formData.otherInfo}
            onChange={handleChange}
            rows="4"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default BeATrainer;
