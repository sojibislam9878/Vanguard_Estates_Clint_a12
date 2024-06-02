import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAuth = () => {
  const all = useContext(AuthContext);
  console.log(all);
  return all;
};

export default useAuth;
