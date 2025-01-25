import {
  FaHome,
  FaBook,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaPlusSquare,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  const isAdmin = true;
  const isTrainer = false;
  const isMember = false;

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-gray-600 text-white">
        <ul className="menu p-4">
          {/* Admin Role */}
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/admin">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-newsletter-subscribers">
                  <FaClipboardList /> All Newsletter Subscribers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-trainers">
                  <FaUser /> All Trainers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/applied-trainer">
                  <FaUser /> Applied Trainer
                </NavLink>
              </li>
            </>
          )}

          {/* Trainer Role */}
          {isTrainer && (
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
          {isMember && (
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

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
