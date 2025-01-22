import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", // Replace with your backend's actual URL
    headers: {
      "Content-Type": "application/json",
    },
  });
  return axiosSecure;
};
export default useAxiosSecure;
