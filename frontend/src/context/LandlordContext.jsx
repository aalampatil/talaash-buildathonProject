import { createContext, useContext, useEffect, useState } from "react";
import { axiosApi } from "../config/axiosApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LandlordContext = createContext();

export const LandlordContextProvider = ({ children }) => {
  const [landlordProperties, setLandlordProperties] = useState([]);
  const [landlordProfile, setLandlordProfile] = useState({});
  const [manageVisits, setManageVisits] = useState([]);
  // const [llProperty, setLlProperty] = useState({})
  const navigate = useNavigate();

  //fetch on first render
  const fetchLandlordProfile = async () => {
    try {
      const response = await axiosApi.get("/landlord/profile");
      // console.log(response.data);
      if (response.data.success) {
        setLandlordProfile(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetch on first render
  const fetchLandlordProperties = async () => {
    try {
      const response = await axiosApi.get("/landlord/property");
      // console.log(response.data);
      if (response.data.success) {
        setLandlordProperties(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetch on first render
  const fetchVisits = async () => {
    try {
      const response = await axiosApi.get("/landlord/visits");
      // console.log(response.data);
      if (response.data.success) {
        setManageVisits(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createLandlordProperty = async (data) => {
    try {
      const response = await axiosApi.post("/landlord/property", data);
      // console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchLandlordProperties(); // refresh list
        navigate("/dashboard/landlord/properties");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLandlordProperty = async (id) => {
    try {
      const response = await axiosApi.delete(`/landlord/property/${id}`);
      // console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchLandlordProperties();
        setLandlordProperties((prev) =>
          prev.filter((property) => property._id !== id),
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("request failed, retry after some time");
    }
  };

  const approveVisit = async (id) => {
    try {
      const response = await axiosApi.patch(`/landlord/visit/approve/${id}`);
      // console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchVisits();
      }
    } catch (error) {
      console.log(error);
      toast.error("request failed, retry after some time");
    }
  };

  const rejectVisit = async (id) => {
    try {
      const response = await axiosApi.patch(`/landlord/visit/reject/${id}`);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchVisits();
      }
    } catch (error) {
      console.log(error);
      toast.error("request failed, retry after some time");
    }
  };

  //   const extractIndividualProperty = (id) => {
  //   const property = landlordProperties.find((item) => item._id === id)
  //   setLlProperty(property)
  // }

  useEffect(() => {
    fetchLandlordProfile();
    fetchLandlordProperties();
    fetchVisits();
  }, []);

  const value = {
    approveVisit,
    rejectVisit,
    deleteLandlordProperty,
    createLandlordProperty,
    landlordProfile,
    landlordProperties,
    manageVisits,
  };
  return (
    <LandlordContext.Provider value={value}>
      {children}
    </LandlordContext.Provider>
  );
};

export const UseLandlordContext = () => {
  return useContext(LandlordContext);
};
