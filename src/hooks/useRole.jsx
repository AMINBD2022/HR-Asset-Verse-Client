import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: role = null,
    isLoading: roleLoading,
    error,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      return res.data?.role || "employee"; // safe fallback
    },

    retry: false, // Network error loop বন্ধ
    staleTime: 5 * 60 * 1000, // 5 মিনিট cache
  });

  return {
    role,
    roleLoading,
    error,
  };
};

export default useRole;
