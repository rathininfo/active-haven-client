import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Custom hook for axios with secure headers

// Function to fetch all trainers
const fetchTrainers = async (axiosSecure) => {
  const response = await axiosSecure.get("/trainersInfo");
  return response.data;
};

// Function to delete a trainer and change role to "Member"
const deleteTrainerAndUpdateRole = async (trainerId, axiosSecure) => {
  // First, update the trainer's role to "Member" before deletion
  await axiosSecure.put(`/trainersInfo/${trainerId}/updateRole`, {
    role: "Member",
  });

  // Then, delete the trainer
  await axiosSecure.delete(`/trainersInfo/${trainerId}`);
};

const AllTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch trainer applications using useQuery
  const {
    data: trainerApplications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: () => fetchTrainers(axiosSecure),
    onError: (error) => {
      console.error("Error fetching trainers:", error);
    },
  });

  // Mutation hook for deleting a trainer
  const { mutate: removeTrainer, isLoading: isDeleting } = useMutation({
    mutationFn: (trainerId) =>
      deleteTrainerAndUpdateRole(trainerId, axiosSecure),
    onSuccess: () => {
      // Invalidate the query to refetch the trainer list after deletion
      queryClient.invalidateQueries(["appliedTrainers"]);
      alert("Trainer deleted and role updated to Member.");
    },
    onError: (error) => {
      console.error("Error deleting trainer:", error);
      alert("Failed to delete the trainer. Please try again.");
    },
  });

  // Handler for delete button click
  const handleDeleteTrainer = async (trainerId) => {
    try {
      console.log("Deleting trainer with ID:", trainerId); // Debugging log

      const response = await axiosSecure.put(
        `/trainersInfo/${trainerId}/updateRole`,
        {
          role: "Member", // Role to change
        }
      );

      console.log("Response:", response.data);
      refetch(); // Refresh the trainer list
    } catch (error) {
      console.error("Error deleting trainer:", error); // Log the error details
    }
  };
  // Loader or error handling
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching trainers</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">All Trainers</h1>
      <table className="table-auto w-full border-collapse border mt-4">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainerApplications.map((trainer) => (
            <tr key={trainer._id}>
              <td className="border p-2">{trainer.name}</td>
              <td className="border p-2">{trainer.specialization}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteTrainer(trainer._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTrainer;
