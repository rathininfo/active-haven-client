import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = {
    name: "Rathindra Nath Biswas",
    email: "rathininfo7@gmail.com",
  };

  const handleLogout = () => {
    console.log("clicked");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-20 py-4 flex justify-between items-center">
        {/* Website Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
            <i className="fas fa-dumbbell"></i>
          </div>
          <Link to="/" className="text-2xl font-bold">
            Fitness
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`hover:text-red-600 ${
              location.pathname === "/" ? "text-red-600" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/trainers"
            className={`hover:text-red-600 ${
              location.pathname === "/trainers" ? "text-red-600" : ""
            }`}
          >
            All Trainers
          </Link>
          <Link
            to="/classes"
            className={`hover:text-red-600 ${
              location.pathname === "/classes" ? "text-red-600" : ""
            }`}
          >
            All Classes
          </Link>
          <Link
            to="/community"
            className={`hover:text-red-600 ${
              location.pathname === "/community" ? "text-red-600" : ""
            }`}
          >
            Community/Forums
          </Link>

          {/* Conditional Dashboard and Profile based on User Login */}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`hover:text-red-600 ${
                  location.pathname === "/dashboard" ? "text-red-600" : ""
                }`}
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-3">
                <img
                  src={user.profilePicture || "/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-600">
                Login
              </Link>
              <Link to="/register" className="hover:text-red-600">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navbar Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="text-white">☰</button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden bg-gray-800">
        <div className="space-y-4 py-4 px-6">
          <Link to="/" className="block hover:text-red-600">
            Home
          </Link>
          <Link to="/trainers" className="block hover:text-red-600">
            All Trainers
          </Link>
          <Link to="/classes" className="block hover:text-red-600">
            All Classes
          </Link>
          <Link to="/community" className="block hover:text-red-600">
            Community/Forums
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="block hover:text-red-600">
                Dashboard
              </Link>
              <div className="flex items-center space-x-3">
                <img
                  src={user.profilePicture || "/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-500 w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-red-600">
                Login
              </Link>
              <Link to="/register" className="block hover:text-red-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
