import {
  FaHome,
  FaBook,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaPlusSquare,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth"; // Assuming you have a useAuth hook for user data

const DashBoard = () => {
  const { user, isLoading: authLoading } = useAuth(); // Fetch user details
  const [role, isLoading] = useUserRole(); // Fetch user role dynamically

  if (isLoading || authLoading) {
    return <div className="text-center mt-10">Loading Dashboard...</div>;
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
