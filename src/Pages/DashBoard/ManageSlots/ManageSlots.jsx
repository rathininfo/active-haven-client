import React, { useState, useEffect } from "react";

const ManageSlots = () => {
  const [slots, setSlots] = useState([]); // State to store all the slots
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the slots from the server
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(
          "https://fitness-tracker-server-side-nine.vercel.app/addSlot"
        );
        const data = await response.json();
        setSlots(data); // Set slots data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching slots:", error);
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  // Delete slot functionality
  const handleDelete = async (slotId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this slot?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `https://fitness-tracker-server-side-nine.vercel.app/slots/${slotId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Slot deleted successfully!");
          setSlots(slots.filter((slot) => slot._id !== slotId)); // Remove the deleted slot from the state
        } else {
          alert("Failed to delete the slot.");
        }
      } catch (error) {
        console.error("Error deleting slot:", error);
        alert("Error deleting slot.");
      }
    }
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Slots</h1>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-4 text-left">Slot Name</th>
            <th className="border p-4 text-left">Slot Time</th>
            <th className="border p-4 text-left">Day</th>
            <th className="border p-4 text-left">Booked By</th>
            <th className="border p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot._id} className="border-b">
              <td className="border p-4">{slot.slotName}</td>
              <td className="border p-4">{slot.slotTime}</td>
              <td className="border p-4">{slot.selectedDay}</td>
              <td className="border p-4">
                {slot.isBooked ? (
                  <>
                    <p>{slot.bookedBy.name}</p>
                    <p>{slot.bookedBy.email}</p>
                  </>
                ) : (
                  <p className="text-red-500">Not Booked</p>
                )}
              </td>
              <td className="border p-4">
                <button
                  onClick={() => handleDelete(slot._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSlots;
