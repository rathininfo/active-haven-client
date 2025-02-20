import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react"; // Import Eye icon

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);

  // Fetch trainer applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosSecure.get("/trainersInfo");
        // Filter out approved trainers
        const filteredApps = res.data.filter(
          (app) => app.status !== "approved"
        );
        setApplications(filteredApps);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  // Handle view rejection feedback
  const handleViewFeedback = (message) => {
    Swal.fire({
      icon: "info",
      title: "Rejection Feedback",
      text: message || "No feedback provided.",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Activity Log</h1>
      {applications.length === 0 ? (
        <p className="text-gray-500">No pending or rejected applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="px-4 py-2">{app.name}</td>
                  <td className="px-4 py-2">{app.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        app.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {app.status === "rejected" && (
                      <button
                        onClick={() => handleViewFeedback(app.rejectionMessage)}
                      >
                        <Eye className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
