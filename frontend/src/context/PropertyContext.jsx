import { createContext, useContext, useState } from "react";
import { axiosApi } from "../config/axiosApi";
import { useNavigate } from "react-router";

const PropertyContext = createContext();

export const PropertyContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState({});

  //filter
  const handleSearch = async (city, rent, propertyType) => {
    try {
      const response = await axiosApi("/property/search", {
        params: { city: city, rent: rent, propertyType: propertyType },
      });
      if (response.data.success) {
        setProperties(response.data.data);
      }
      navigate("/filter-properties");
    } catch (error) {
      console.log(error);
    }
  };
  //inividual property
  const searchProperty = async (id) => {
    try {
      const response = await axiosApi.get(`/property/${id}`);
      console.log(response.data);
      if (response.data.success) {
        setProperty(response.data.data);
      }
      navigate(`/property/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    handleSearch,
    properties,
    searchProperty,
    property,
    setProperty,
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
