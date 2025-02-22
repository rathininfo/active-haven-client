import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AllTrainer = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Handle role change to 'Member' (when admin removes trainer role)
  const handleRemoveTrainer = (user) => {
    axiosSecure
      .patch(`/users/role/${user._id}`, { role: "member" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          // Role change was successful
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now a Member.`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          // No modifications were made (something might be wrong)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There was an issue updating the role.",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating role:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to remove trainer role.",
        });
      });
  };

  if (isLoading) {
    return <div className="text-center text-xl"><span className="loading loading-spinner loading-xs"></span></div>;
  }

  return (
    <>
      <Helmet>
        <title>Active Haven | All Trainers</title>
      </Helmet>
      <div>
        <div className="flex justify-evenly my-4">
          <h1 className="text-3xl">All Trainers</h1>
          <h1 className="text-3xl">
            Total Trainers:{" "}
            {users.filter((user) => user.role === "trainer").length}
          </h1>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* Table Head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((user) => user.role === "trainer") // Only show trainers
                  .map((user, index) => (
                    <tr key={user._id}>
                      <th>{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveTrainer(user)}
                          className="btn btn-warning btn-sm"
                        >
                          Remove Trainer
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTrainer;
