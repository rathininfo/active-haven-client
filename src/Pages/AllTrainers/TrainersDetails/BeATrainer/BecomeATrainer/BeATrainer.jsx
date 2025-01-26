import React, { useState, useContext } from "react";
import Select from "react-select";
import { AuthContext } from "../../../../../Providers/AuthProvider";

const BeATrainer = () => {
  const { user } = useContext(AuthContext); // Assuming you're using a user context to fetch user data
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "", // Read-only email from context
    age: "",
    profileImage: "",
    specialization: "",
    availableDays: [],
    availableSlots: [], // This will now hold an array of selected time slots
    bio: "",
    yearsOfExperience: 0,
    socialLinks: {
      facebook: "",
      instagram: "",
    },
    additionalInfo: "",
    status: "pending",
  });

  // Options for React Select
  const dayOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const timeOptions = [
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
  ];

  const skillOptions = [
    "Yoga",
    "Meditation",
    "Pilates",
    "Cardio",
    "Strength Training",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (specialization) => {
    // Only store the last selected specialization as a string
    setFormData((prev) => ({
      ...prev,
      specialization: specialization, // Update specialization with a single string value
    }));
  };

  const handleDaysChange = (selectedOptions) => {
    setFormData({
      ...formData,
      availableDays: selectedOptions.map((option) => option.value),
    });
  };

  const handleAvailableSlotsChange = (selectedOptions) => {
    // Convert selected time slots to an array and update availableSlots
    setFormData((prev) => ({
      ...prev,
      availableSlots: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/trainersInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Trainer application submitted!");
        // Clear the form after submission
        setFormData({
          name: "",
          email: user?.email || "",
          age: "",
          profileImage: "",
          specialization: "",
          availableDays: [],
          availableSlots: [],
          bio: "",
          yearsOfExperience: 0,
          socialLinks: {
            facebook: "",
            instagram: "",
          },
          additionalInfo: "",
          status: "pending",
        });
      } else {
        console.error("Error submitting application:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting application: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center">Be a Trainer</h2>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label>Profile Image URL:</label>
        <input
          type="text"
          name="profileImage"
          value={formData.profileImage}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label>Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label>Years of Experience:</label>
        <input
          type="number"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label>Facebook:</label>
        <input
          type="url"
          value={formData.socialLinks.facebook}
          onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="https://facebook.com/your-profile"
        />
      </div>
      <div>
        <label>Instagram:</label>
        <input
          type="url"
          value={formData.socialLinks.instagram}
          onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="https://instagram.com/your-profile"
        />
      </div>
      <div>
        <label>Skills:</label>
        <div className="grid grid-cols-2 gap-2">
          {skillOptions.map((specialization) => (
            <label key={specialization} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.specialization === specialization} // Check if it's the selected specialization
                onChange={() => handleSkillsChange(specialization)} // Update with a single string
                className="w-4 h-4"
              />
              <span>{specialization}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label>Available Days:</label>
        <Select
          isMulti
          options={dayOptions}
          onChange={handleDaysChange}
          value={dayOptions.filter((option) =>
            formData.availableDays.includes(option.value)
          )}
          className="w-full"
        />
      </div>
      <div>
        <label>Available Time:</label>
        <Select
          isMulti
          options={timeOptions.map((time) => ({ value: time, label: time }))}
          onChange={handleAvailableSlotsChange}
          value={timeOptions
            .filter((time) => formData.availableSlots.includes(time))
            .map((time) => ({ value: time, label: time }))}
          className="w-full"
        />
      </div>
      <div>
        <label>Additional Info:</label>
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Apply
      </button>
    </form>
  );
};

export default BeATrainer;
