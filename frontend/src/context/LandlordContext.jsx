import { createContext, useContext } from "react";

const LandlordContext = createContext();

export const LandlordContextProvider = ({ children }) => {
  const value = {};
  return (
    <LandlordContext.Provider value={value}>
      {children}
    </LandlordContext.Provider>
  );
};

export const UseLandlordContext = () => {
  return useContext(LandlordContext);
};
