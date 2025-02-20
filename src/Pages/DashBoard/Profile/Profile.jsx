import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Custom hook for secure Axios calls

const Profile = () => {
  const auth = getAuth(); // Firebase auth instance
  const user = auth.currentUser; // Currently authenticated user
  // State variables
  const [name, setName] = useState(user.displayName || ""); // User's name
  const [profilePicture, setProfilePicture] = useState(user.photoURL || ""); // User's profile picture
  const [profileLink, setProfileLink] = useState(""); // Direct image link input
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const axiosSecure = useAxiosSecure(); // Axios instance with secure headers
  const navigate = useNavigate(); // Navigation handler

  // Handle changes in profile picture link
  const handleProfileLinkChange = (e) => {
    setProfileLink(e.target.value);
    setProfilePicture(e.target.value); // Update preview image
  };

  // Handle profile update form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update user profile in Firebase
      await updateProfile(user, {
        displayName: name,
        photoURL: profilePicture,
      });

      // Update user profile in the backend
      const updatedData = {
        name,
        photoURL: profilePicture,
      };

      const response = await fetch(
        `https://fitness-tracker-server-side-nine.vercel.app/users/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      // If the response is not ok, handle the error
      if (!response) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      // Success notification
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto md:5 lg:ml-12 p-4">
      <h1 className="text-3xl font-semibold mb-6">Profile Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full max-w-md mt-2"
            placeholder="Enter your name"
          />
        </div>

        {/* Profile Picture Link */}
        <div>
          <label htmlFor="profileLink" className="block text-lg font-medium">
            Profile Picture Link
          </label>
          <input
            type="url"
            id="profileLink"
            value={profileLink}
            onChange={handleProfileLinkChange}
            className="input input-bordered w-full max-w-md mt-2"
            placeholder="Enter a valid image URL"
          />
          {profilePicture && (
            <img
              src={profilePicture}
              alt="Profile Preview"
              className="mt-4 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        {/* Email - Read-only */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            disabled
            className="input input-bordered w-full max-w-md mt-2"
            readOnly
          />
        </div>

        {/* Last Login - Read-only */}
        <div>
          <label htmlFor="lastLogin" className="block text-lg font-medium">
            Last Login
          </label>
          <input
            type="text"
            id="lastLogin"
            value={user.metadata.lastSignInTime}
            disabled
            className="input input-bordered w-full max-w-md mt-2"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="btn btn-primary w-full max-w-md mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
