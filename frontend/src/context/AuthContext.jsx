import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const value = {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UseAuthContext = () => {
  return useContext(AuthContext);
};
