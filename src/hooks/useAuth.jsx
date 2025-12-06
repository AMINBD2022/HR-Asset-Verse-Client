import { useContext } from "react";
import AuthContext from "../AllContexts/AuthContext";

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};

export default useAuth;
