import { createContext, useContext, useState } from "react";

const PropertyContext = createContext();

export const PropertyContextProvider = ({ children }) => {
  const [properties, setProperties] = useState({});

  const handleSearch = (location, budget) => {};

  const value = {
    handleSearch,
  };
  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export const UsePropertyContext = () => {
  return useContext(PropertyContext);
};
