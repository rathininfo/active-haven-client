import Swal from "sweetalert2"; // Import SweetAlert2
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    createUser(data.email, data.password, data.displayName, data.photoURL)
      .then((result) => {
        const logUser = result.user;
        console.log(logUser);

        // SweetAlert2 success alert
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome, ${data.name}! Your account has been created.`,
        });
      })
      .catch((error) => {
        console.error(error);

        // SweetAlert2 error alert
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Active Haven || Sign UP</title>
        </Helmet>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-600 via-gray-900 to-gray-600">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                {...register("photoURL")}
                placeholder="Enter your photo URL"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~\-])[A-Za-z\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~\-]+$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-/4 mt-5 right-3 transform -translate-y-2/6 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Register
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <span className="bg-gray-300 h-px w-1/3"></span>
            <span className="text-gray-500 px-3">OR</span>
            <span className="bg-gray-300 h-px w-1/3"></span>
          </div>

          <div className="mt-4 text-center">
            <button className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300">
              Continue with Google
            </button>
          </div>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
