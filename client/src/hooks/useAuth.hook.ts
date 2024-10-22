import { useContext } from "react";
import { AuthContext } from "../auth/auth.contex";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext is not inside of AuthProvider");
  }
  return context;
};
export default useAuth;
