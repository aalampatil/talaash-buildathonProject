import { createContext, useContext } from "react";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  return <AdminContext.Provider>{children}</AdminContext.Provider>;
};

export const UseAdminContext = () => {
  return useContext(AdminContext);
};
