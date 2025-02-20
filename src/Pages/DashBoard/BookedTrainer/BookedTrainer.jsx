import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const BookedTrainer = () => {
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [image, setImageURL] = useState(""); // State for image URL input

  useEffect(() => {
    const fetchTrainerInfo = async () => {
      try {
        const response = await fetch(
          "https://fitness-tracker-server-side-nine.vercel.app/paymentData"
        );
        if (!response) {
          throw new Error("Failed to fetch trainer info");
        }
        const data = await response.json();
        setTrainerInfo(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerInfo();
  }, []);

  const handleReviewSubmit = () => {
    if (rating === 0 || feedback.trim() === "") {
      Swal.fire("Error", "Please provide a rating and feedback", "error");
      return;
    }

    // Save the review to the database (this is a placeholder for your actual backend call)
    fetch("https://fitness-tracker-server-side-nine.vercel.app/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trainerId: trainerInfo._id,
        rating,
        feedback,
        image, // Include image URL in the review submission
      }),
    })
      .then((response) => response.json())
      .then(() => {
        Swal.fire("Success", "Thank you for your review!", "success");
        setShowReviewModal(false); // Close the modal after submission
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          "There was an error submitting your review.",
          "error"
        );
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Trainer Info
      </h2>
      <div className="space-y-2">
        <div className="text-lg text-gray-700">
          <strong className="font-medium text-gray-900">Name:</strong>{" "}
          {trainerInfo.trainer}
        </div>
        <div className="text-lg text-gray-700">
          <strong className="font-medium text-gray-900">Slot:</strong>{" "}
          {trainerInfo.slot}
        </div>
        <div className="text-lg text-gray-700">
          <strong className="font-medium text-gray-900">Class:</strong>{" "}
          {trainerInfo.classes}
        </div>
      </div>

      <button
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => setShowReviewModal(true)}
      >
        Leave a Review
      </button>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            <div className="flex mb-4">
              <span className="mr-2">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer ${
                    star <= rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border p-2 rounded-md"
              placeholder="Write your feedback here..."
            ></textarea>

            {/* Image URL Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImageURL(e.target.value)}
                className="w-full border p-2 rounded-md mt-2"
                placeholder="Enter an image URL"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Close
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
