import React, { useState, useEffect } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

const AddNewSlot = () => {
  const [trainerData, setTrainerData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [slotName, setSlotName] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [otherInfo, setOtherInfo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainerResponse = await fetch(
          "http://localhost:5000/trainersInfo"
        );
        const trainerData = await trainerResponse.json();

        const classesResponse = await fetch(
          "http://localhost:5000/classesInfo"
        );
        const classesData = await classesResponse.json();

        if (Array.isArray(classesData)) {
          setClasses(classesData);
        } else {
          console.error("Unexpected classes data:", classesData);
          setClasses([]);
        }

        trainerData.map((trainer) => {
          setTrainerData(trainer);
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!slotName || !slotTime || !selectedDay || !selectedClass) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const newSlotData = {
      trainerId: trainerData?._id || null,
      slotName: slotName.value,
      slotTime: slotTime.value,
      selectedDay: selectedDay.value,
      selectedClass: selectedClass.value,
      otherInfo: otherInfo.trim(),
    };

    try {
      const response = await fetch("http://localhost:5000/addSlot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSlotData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Slot added successfully!",
        });

        setSelectedDay(null);
        setSlotName("");
        setSlotTime("");
        setSelectedClass(null);
        setOtherInfo("");
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to add slot: ${errorData.message || "Unknown error"}`,
        });
      }
    } catch (error) {
      console.error("Error adding slot:", error);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "An unexpected error occurred. Please try again.",
      });
    }
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const slotNameOptions = [
    { value: "morning", label: "Morning Slot" },
    { value: "afternoon", label: "Afternoon Slot" },
    { value: "evening", label: "Evening Slot" },
  ];

  // Updated Slot Time Options
  const slotTimeOptions = [
    { value: "08:00 AM - 09:00 AM", label: "08:00 AM - 09:00 AM" },
    { value: "09:00 AM - 10:00 AM", label: "09:00 AM - 10:00 AM" },
    { value: "10:00 AM - 11:00 AM", label: "10:00 AM - 11:00 AM" },
    { value: "11:00 AM - 12:00 PM", label: "11:00 AM - 12:00 PM" },
    { value: "12:00 PM - 01:00 PM", label: "12:00 PM - 01:00 PM" },
    { value: "01:00 PM - 02:00 PM", label: "01:00 PM - 02:00 PM" },
    { value: "02:00 PM - 03:00 PM", label: "02:00 PM - 03:00 PM" },
    { value: "03:00 PM - 04:00 PM", label: "03:00 PM - 04:00 PM" },
    { value: "04:00 PM - 05:00 PM", label: "04:00 PM - 05:00 PM" },
    { value: "05:00 PM - 06:00 PM", label: "05:00 PM - 06:00 PM" },
    { value: "06:00 PM - 07:00 PM", label: "06:00 PM - 07:00 PM" },
    { value: "07:00 PM - 08:00 PM", label: "07:00 PM - 08:00 PM" },
    { value: "08:00 PM - 09:00 PM", label: "08:00 PM - 09:00 PM" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Slot
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trainer's Name
            </label>
            <input
              type="text"
              value={trainerData?.name || ""}
              readOnly
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Previous Days (Read-only)
            </label>
            <input
              type="text"
              value={trainerData?.availableDays?.join(", ") || ""}
              readOnly
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Day for the Slot
            </label>
            <Select
              options={daysOfWeek}
              value={selectedDay}
              onChange={setSelectedDay}
              className="react-select"
              placeholder="Select a day"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slot Name
            </label>
            <Select
              options={slotNameOptions}
              value={slotName}
              onChange={setSlotName}
              className="react-select"
              placeholder="Select slot name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slot Time (e.g., 8:00 AM - 9:00 AM)
            </label>
            <Select
              options={slotTimeOptions}
              value={slotTime}
              onChange={setSlotTime}
              className="react-select"
              placeholder="Select slot time"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Class
            </label>
            <Select
              options={classes.map((classItem) => ({
                value: classItem._id,
                label: classItem.className,
              }))}
              value={selectedClass}
              onChange={setSelectedClass}
              className="react-select"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other Info
            </label>
            <textarea
              value={otherInfo}
              onChange={(e) => setOtherInfo(e.target.value)}
              placeholder="Any other information..."
              className="input-field"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Add Slot
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewSlot;
