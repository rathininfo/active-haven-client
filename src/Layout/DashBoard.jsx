import {
  FaBook,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaPlusSquare,
  FaChalkboardTeacher,
  FaBalanceScale
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth"; 
import { Helmet } from "react-helmet";
import { useState } from "react";

const DashBoard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [role, isLoading] = useUserRole();
  const [activeTab, setActiveTab] = useState("home");

  if (isLoading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-gray-600 rounded-full" />
      </div>
    );
  }

  if (!role) {
    return (
      <>
        <Helmet>
          <title>Active Haven | DashBoard</title>
        </Helmet>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-red-600">No role assigned.</h1>
            <p className="text-gray-600 mt-2">Please contact admin for access.</p>
            <NavLink to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Go to Home
            </NavLink>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col">
        <div className="flex flex-col items-center p-4 border-b border-gray-700">
          <img
            src={user?.photoURL || "/default-profile.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full mb-2 border-2 border-gray-300"
          />
          <h2 className="text-lg font-semibold">{user?.displayName || "User"}</h2>
          <p className="text-sm italic text-gray-300">{role.toUpperCase()}</p>
        </div>

        <ul className="flex-1 p-4 space-y-2">
          {/* Admin Role */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/all-newsletter-subscribers" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaClipboardList /> All Subscribers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-trainer" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaChalkboardTeacher /> All Trainers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/applied-trainer" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaUser /> Applied Trainer
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/balance" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaBalanceScale /> Balance
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addClasses" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaBook /> Add Class
                </NavLink>
              </li>
            </>
          )}

          {/* Trainer Role */}
          {role === "trainer" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-slots" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaClipboardList /> Manage Slots
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-new-slot" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaPlusSquare /> Add Slot
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-new-forum" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaUsers /> Add Forum
                </NavLink>
              </li>
            </>
          )}

          {/* Member Role */}
          {role === "member" && (
            <>
              <li>
                <NavLink to="/dashboard/profile" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaUser /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/activity-log" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaClipboardList /> Activity Log
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/booked-trainer" className="flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition">
                  <FaBook /> Booked Trainer
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="p-4 border-t border-gray-700">
          <NavLink to="/" className="flex items-center justify-center py-2 px-4 bg-red-600 rounded-lg text-white hover:bg-red-700 transition">
            Home
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
