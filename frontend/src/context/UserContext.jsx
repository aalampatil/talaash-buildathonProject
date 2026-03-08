import { createContext, useContext, useEffect, useState } from "react";
import { axiosApi } from "../config/axiosApi";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tenantProfile, setTenantProfile] = useState({});
  const [visits, setVisits] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);

  const verified = async () => {
    try {
      const response = await axiosApi.get("/user/me");
      console.log(response.data);
      if (response.data.success) {
        setUser(response.data.data);
        setAuthStatus(true);
      }
    } catch (error) {
      setUser(null);
      setAuthStatus((prev) => !prev);
      // setTenantProfile({});
      // setVisits([]);
      // setSavedProperties([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchTenant = async () => {
    try {
      const response = await axiosApi.get("/tenant/profile");
      // console.log(response.data);
      if (response.data.success) {
        setTenantProfile(response.data.data);
        setSavedProperties(response.data.data.savedProperties);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVisits = async () => {
    try {
      const response = await axiosApi.get("/tenant/visits");
      // console.log(response.data);
      if (response.data.success) {
        setVisits(response.data.data);
        // await fetchVisits();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      await axiosApi.post("/user/logout");
      setUser(null);
      setAuthStatus(false);
      toast.success("logged out");
    } catch (error) {
      console.log(error);
    }
  };

  const saveProp = async (id) => {
    try {
      const response = await axiosApi.post(`tenant/save-property/${id}`);

      if (response.data.success) {
        toast.success(response.data.message);

        setSavedProperties((prev) =>
          prev.includes(id) ? prev : [...prev, id],
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeProp = async (id) => {
    try {
      const response = await axiosApi.post(`tenant/remove-property/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setSavedProperties((prev) => prev.filter((propId) => propId !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestVisit = async (propertyId, visitDate) => {
    try {
      await axiosApi.post(`tenant/request-visit`, { propertyId, visitDate });
      // await fetchVisits();
    } catch (error) {
      console.log(error);
    }
  };
  const cancelVisit = async (id) => {
    try {
      await axiosApi.post(`tenant/cancel-visit/${id}`);
      await fetchVisits();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verified();
    fetchTenant();
    fetchVisits();
  }, []);

  useEffect(() => {
    fetchTenant();
  }, [saveProp]);

  const value = {
    user,
    authStatus,
    loading,
    tenantProfile,
    setTenantProfile,
    visits,
    setVisits,
    savedProperties,
    setSavedProperties,
    fetchTenant,
    fetchVisits,
    logoutUser,
    saveProp,
    removeProp,
    requestVisit,
    cancelVisit,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UseUserContext = () => {
  return useContext(UserContext);
};
