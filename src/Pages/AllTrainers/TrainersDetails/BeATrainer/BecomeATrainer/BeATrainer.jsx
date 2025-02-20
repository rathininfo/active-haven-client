import React, { useState, useContext } from "react";
import Select from "react-select";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AuthContext } from "../../../../../Providers/AuthProvider";

const BeATrainer = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    age: "",
    profileImage: "",
    specialization: "",
    booking: 0,
    classDescription: "",
    availableDays: [],
    availableSlots: [],
    bio: "",
    yearsOfExperience: 0,
    socialLinks: {
      facebook: "",
      instagram: "",
    },
    additionalInfo: "",
    status: "Pending",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeClass = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (specialization) => {
    setFormData((prev) => ({
      ...prev,
      specialization: specialization,
    }));
  };

  const handleClassesChange = (className) => {
    setFormData((prev) => ({
      ...prev,
      className: className,
    }));
  };

  const handleDaysChange = (selectedOptions) => {
    setFormData({
      ...formData,
      availableDays: selectedOptions.map((option) => option.value),
    });
  };

  const handleAvailableSlotsChange = (selectedOptions) => {
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
      const response = await fetch(
        "https://fitness-tracker-server-side-nine.vercel.app/trainersInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application is now pending approval.",
          confirmButtonColor: "#3085d6",
        });

        // Clear the form after submission
        setFormData({
          name: "",
          email: user?.email || "",
          age: "",
          profileImage: "",
          specialization: "",
          offerClasses: "",
          booking: 0,
          classDescription: "",
          availableDays: [],
          availableSlots: [],
          bio: "",
          yearsOfExperience: 0,
          socialLinks: {
            facebook: "",
            instagram: "",
          },
          additionalInfo: "",
          status: "Pending",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "There was an error submitting your application. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to the server. Please check your internet connection and try again.",
        confirmButtonColor: "#d33",
      });
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
                checked={formData.specialization === specialization}
                onChange={() => handleSkillsChange(specialization)}
                className="w-4 h-4"
              />
              <span>{specialization}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>Classes:</label>
        <div className="grid grid-cols-2 gap-2">
          {classOptions.map((className) => (
            <label key={className} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.className === className}
                onChange={() => handleClassesChange(className)}
                className="w-4 h-4"
              />
              <span>{className}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>Class Description:</label>
        <textarea
          name="classDescription"
          value={formData.classDescription}
          onChange={handleChangeClass}
          className="w-full border p-2 rounded"
          required
        />
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
