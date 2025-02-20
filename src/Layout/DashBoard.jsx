import {
  FaBook,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaPlusSquare,
  FaChalkboardTeacher,
  FaBalanceScale,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth"; // Assuming you have a useAuth hook for user data
import { Helmet } from "react-helmet";

const DashBoard = () => {
  const { user, isLoading: authLoading } = useAuth(); // Fetch user details
  const [role, isLoading] = useUserRole(); // Fetch user role dynamically

  if (isLoading || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full" />
      </div>
    );
  }

  // Role not found fallback
  if (!role) {
    return (
      <>
        <Helmet>
          <title>Active Haven | DashBoard</title>
        </Helmet>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">
              No role assigned to your account.
            </h1>
            <p className="text-gray-600 mt-2">
              Please contact support or the admin for further assistance.
            </p>
            <NavLink to="/" className="btn btn-primary mt-4">
              Go to Home
            </NavLink>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-gray-600 text-white">
        <div className="flex flex-col items-center p-4">
          {/* Profile Section */}
          <img
            src={user?.photoURL || "/default-profile.png"} // Display user profile image
            alt="Profile"
            className="w-20 h-20 rounded-full mb-2"
          />
          <h2 className="text-lg font-semibold">
            {user?.displayName || "User"}
          </h2>
          <p className="text-sm italic text-gray-300">{role.toUpperCase()}</p>
        </div>
        <div className="divider border-t border-white mb-4"></div>
        {/* Navigation */}
        <ul className="menu p-4">
          {/* Admin Role */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/all-newsletter-subscribers">
                  <FaClipboardList /> All Newsletter Subscribers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-trainer">
                  <FaChalkboardTeacher /> All Trainers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/applied-trainer">
                  <FaUser /> Applied Trainer
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers /> All Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/balance">
                  <FaBalanceScale /> Balance
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addClasses">
                  <FaBook /> Add new Class
                </NavLink>
              </li>
            </>
          )}

          {/* Trainer Role */}
          {role === "trainer" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-slots">
                  <FaClipboardList /> Manage Slots
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-new-slot">
                  <FaPlusSquare /> Add New Slot
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-new-forum">
                  <FaUsers /> Add New Forum
                </NavLink>
              </li>
            </>
          )}

          {/* Member Role */}
          {role === "member" && (
            <>
              <li>
                <NavLink to="/dashboard/profile">
                  <FaUser /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/activity-log">
                  <FaClipboardList /> Activity Log
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/booked-trainer">
                  <FaBook /> Booked Trainer
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Navigation */}
          <div className="divider border-t border-white"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
