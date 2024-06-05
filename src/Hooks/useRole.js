
import axios from "axios";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";


const useRole = () => {
    const { user, loading } = useAuth()

  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios(`http://localhost:3000/user/${user?.email}`)
      return data.role
    },
  })

  return [role, isLoading]
};

export default useRole;