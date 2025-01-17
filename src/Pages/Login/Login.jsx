import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const password = from.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-600 via-gray-900 to-gray-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-center text-gray-600 mt-2 font-bold text-3xl">
          Log in to continue your fitness journey.
        </p>

        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <span className="bg-gray-300 h-px w-1/3"></span>
          <span className="text-gray-500 px-3">OR</span>
          <span className="bg-gray-300 h-px w-1/3"></span>
        </div>

        <div className="mt-6 flex flex-col space-y-4">
          <button className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.8 12.1c0-.9-.1-1.5-.2-2.2H12v4.1h6.1c-.3 1.5-1.3 2.8-2.8 3.7l4.5 3.5c2.6-2.4 4.1-5.8 4.1-9.1zM12 24c2.7 0 5-1 6.7-2.7L14.1 18c-1 .7-2.2 1-3.5 1-2.7 0-4.9-1.8-5.7-4.3L2 16.4c1.6 3.2 4.9 5.6 9.1 5.6zm-9.2-7.8L4.9 13c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2L2.8 7.8C1.9 9.6 1.3 11.8 1.3 12.1c0 2.3.7 4.5 1.5 6.3zM12 4.8c1.3 0 2.5.4 3.5 1.2l2.6-2.5C16.7 1.8 14.4.8 12 .8c-4.2 0-7.5 2.4-9.2 5.6L4.9 7c.8-2.4 3-4.2 5.6-4.2zm0 6.7c.8 0 1.5.3 2.1.9s.9 1.4.9 2.1c0 .8-.3 1.5-.9 2.1s-1.4.9-2.1.9c-.8 0-1.5-.3-2.1-.9s-.9-1.4-.9-2.1c0-.8.3-1.5.9-2.1s1.4-.9 2.1-.9z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?
          <Link
            to="/register"
            className="text-green-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
