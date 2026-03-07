import { createContext, useContext, useEffect, useState } from "react";
import { UseUserContext } from "./UserContext";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { user } = UseUserContext();
  const [role, setRole] = useState("User");

  const initalizeRole = () => {
    setRole(user.role);
  };
  useEffect(() => {
    initalizeRole();
    console.log(user.role);
  });
  const value = { role };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UseAuthContext = () => {
  return useContext(AuthContext);
};
