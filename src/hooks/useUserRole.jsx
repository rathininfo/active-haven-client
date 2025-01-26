import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: [user?.email, "userRole"],
    queryFn: async () => {
      if (!user?.email) return null; // Handle cases where user email is not available
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      console.log(res.data);
      return res.data?.role; // Return the user's role (e.g., 'admin', 'trainer', or 'member')
    },
    enabled: !!user?.email, // Only run the query if user email exists
  });

  return [role, isLoading]; // Return the role and loading state
};

export default useUserRole;
