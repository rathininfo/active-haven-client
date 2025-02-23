import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/ActiveHaven.png";
import { AuthContext } from "../../../Providers/AuthProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-16 lg:px-20 flex justify-between items-center py-6">
        {/* Website Logo */}
        <div className="flex items-center space-x-3 w-16">
          <Link to="/" className="text-2xl font-bold">
            <img className="w-8 h-8" src={logo} alt="" />
          </Link>
        </div>

        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex space-x-6 justify-center items-center">
          <Link
            to="/"
            className={`hover:text-red-600  ${
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
            to="/allClasses"
            className={`hover:text-red-600 ${
              location.pathname === "/classes" ? "text-red-600" : ""
            }`}
          >
            All Classes
          </Link>
          <Link
            to="/forumPage"
            className={`hover:text-red-600 ${
              location.pathname === "/forumPage" ? "text-red-600" : ""
            }`}
          >
            Community/Forums
          </Link>

          {/* Conditional Links Based on User Authentication */}
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
                  src={user.photoURL || "/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.displayName}</span>
              </div>
              <button
                onClick={handleLogout}
                className=" text-red-600 hover:text-red-500 font-bold" 
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

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleMobileMenu} className="text-white text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
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
                  className="text-sm text-red-600 hover:text-red-500 w-full text-left font-bold"
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
      )}
    </nav>
  );
};

export default Navbar;
