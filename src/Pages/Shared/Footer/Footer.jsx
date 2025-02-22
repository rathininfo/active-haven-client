import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/ActiveHaven.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and About Section */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4 w-24">
              <img src={logo} alt="" />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Our company is at the forefront of revolutionizing the fitness
              industry. Combining cutting-edge technology with a passion for
              fitness, we empower individuals to lead healthier, active
              lifestyles.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-xl hover:text-red-600">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-xl hover:text-red-600">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-xl hover:text-red-600">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-xl hover:text-red-600">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">HOME</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/collections" className="hover:text-red-600 text-gray-300">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/new-item" className="hover:text-red-600 text-gray-300">
                  New Item
                </Link>
              </li>
              <li>
                <Link to="/latest" className="hover:text-red-600 text-gray-300">
                  Latest
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-red-600 text-gray-300">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">PRODUCTS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/new-arrival" className="hover:text-red-600 text-gray-300">
                  New Arrival
                </Link>
              </li>
              <li>
                <Link to="/oldest" className="hover:text-red-600 text-gray-300">
                  Oldest
                </Link>
              </li>
              <li>
                <Link to="/premium" className="hover:text-red-600 text-gray-300">
                  Premium
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">ABOUT US</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact-form" className="hover:text-red-600 text-gray-300">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link to="/email-us" className="hover:text-red-600 text-gray-300">
                  Email Us
                </Link>
              </li>
              <li>
                <Link to="/number" className="hover:text-red-600 text-gray-300">
                  Number
                </Link>
              </li>
              <li>
                <Link to="/customers-feedback" className="hover:text-red-600 text-gray-300">
                  Customers Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Active Haven. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
