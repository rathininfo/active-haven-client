import React from "react";
import { FaHome, FaNewspaper, FaPlusSquare } from "react-icons/fa";
import {
  FaHandHoldingDollar,
  FaPeopleGroup,
  FaPersonChalkboard,
} from "react-icons/fa6";

import { NavLink, Outlet } from "react-router-dom";
import Home from "../Pages/Home/Home";

const DashBoard = () => {
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-gray-600 text-white">
        <ul className="menu p-4">
          <li>
            <NavLink to="/dashboard/admin">
              <FaHome></FaHome>Admin Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/all-newsletter-subscribers">
              <FaNewspaper></FaNewspaper> All Newsletter subscribers
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/all-trainers">
              <FaPersonChalkboard></FaPersonChalkboard> All Trainers
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/applied-trainer">
              {" "}
              <FaPeopleGroup></FaPeopleGroup> Applied Trainer
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/balance">
              {" "}
              <FaHandHoldingDollar></FaHandHoldingDollar> Balance
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/add-new-class">
              <FaPlusSquare></FaPlusSquare> Add new Class
            </NavLink>
          </li>
          <div className="divider border-t border-white"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
