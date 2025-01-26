import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: trainerApplications = [], isLoading } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainersInfo");
      return res.data;
    },
  });

  const handleConfirm = (trainerId) => {
    axiosSecure
      .patch(`/trainers/confirm/${trainerId}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Trainer application confirmed!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const handleReject = (trainerId) => {
    axiosSecure
      .delete(`/trainers/reject/${trainerId}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Trainer application rejected!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  if (isLoading) {
    return <div>Loading trainer applications...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl mb-4">Applied Trainers</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* Table head */}
          <thead>
            <tr>
              <th>Trainer Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table body */}
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
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleReject(trainer._id)}
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
    </div>
  );
};

export default AppliedTrainer;
