import { createContext, useContext, useEffect, useState } from "react";
import { UseUserContext } from "./UserContext";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { user } = UseUserContext();
  const [role, setRole] = useState("User");

  useEffect(() => {
    if (user?.role) setRole(user.role);
  }, [user]);
  const value = { role };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UseAuthContext = () => {
  return useContext(AuthContext);
};
