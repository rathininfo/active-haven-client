import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Fetch applied trainers
  const { data: trainerApplications = [], isLoading } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainersInfo");
      return res.data;
    },
  });

  // Confirm trainer application
  const confirmMutation = useMutation({
    mutationFn: (trainerId) =>
      axiosSecure.patch(`/trainers/confirm/${trainerId}`), // Update status to "Accepted" on confirm
    onSuccess: (updatedTrainer) => {
      // Update the UI by removing the confirmed trainer from the list
      queryClient.setQueryData(["appliedTrainers"], (oldData) =>
        oldData.filter((trainer) => trainer._id !== updatedTrainer._id)
      );

      // Invalidate the query to re-fetch data (to reflect the updated trainer status)
      queryClient.invalidateQueries(["appliedTrainers"]);

      Swal.fire({
        icon: "success",
        title: "Trainer application confirmed!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to confirm trainer application.",
        showConfirmButton: true,
      });
    },
  });

  // Reject trainer application
  const rejectMutation = useMutation({
    mutationFn: ({ trainerId, feedback }) =>
      axiosSecure.delete(`/trainers/reject/${trainerId}`, {
        data: { feedback },
      }),
    onSuccess: (res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "error",
          title: "Trainer application rejected!",
          showConfirmButton: false,
          timer: 1500,
        });
        queryClient.invalidateQueries(["appliedTrainers"]); // Refresh list
      }
    },
  });

  const handleConfirm = (trainerId) => {
    confirmMutation.mutate(trainerId);
  };

  const handleReject = () => {
    rejectMutation.mutate({ trainerId: selectedTrainer._id, feedback });
    setSelectedTrainer(null);
    setFeedback("");
  };

  if (isLoading) {
    return <div>Loading trainer applications...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl mb-4">Applied Trainers</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Trainer Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainerApplications.map((trainer) => (
              <tr key={trainer._id}>
                <td>{trainer.name}</td>
                <td>{trainer.email}</td>
                <td>{trainer.specialization}</td>
                <td>
                  <Link
                    to={`/trainerDetails/${trainer._id}`}
                    className="btn btn-info"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleConfirm(trainer._id)}
                    className="btn btn-success ml-2"
                    disabled={confirmMutation.isLoading}
                  >
                    {confirmMutation.isLoading ? "Confirming..." : "Confirm"}
                  </button>
                  <button
                    onClick={() => setSelectedTrainer(trainer)}
                    className="btn btn-danger ml-2"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Reject Trainer</h2>
            <p>
              Are you sure you want to reject{" "}
              <strong>{selectedTrainer.name}</strong>?
            </p>
            <textarea
              className="w-full border p-2 mt-3"
              placeholder="Provide feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-secondary mr-2"
                onClick={() => setSelectedTrainer(null)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleReject}>
                Submit & Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedTrainer;
