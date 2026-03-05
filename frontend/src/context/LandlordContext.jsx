import { createContext, useContext } from "react";

const LandlordContext = createContext();

export const LandlordContextProvider = ({ children }) => {
  return <LandlordContext.Provider>{children}</LandlordContext.Provider>;
};

export const UseLandlordContext = () => {
  return useContext(LandlordContext);
};
