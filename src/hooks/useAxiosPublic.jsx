import axios from "axios";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: "https://fitness-tracker-server-side-nine.vercel.app",
  });

  return axiosPublic;
};

export default useAxiosPublic;
