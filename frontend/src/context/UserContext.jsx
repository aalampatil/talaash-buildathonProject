import { createContext, useContext, useEffect, useState } from "react";
import { axiosApi } from "../config/axiosApi";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [authStatus, setAuthStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tenantProfile, setTenantProfile] = useState({});
  const [visits, setVisits] = useState({});
  const [savedProperties, setSavedProperties] = useState({});

  const verified = async () => {
    try {
      const response = await axiosApi.get("/user/me");
      if (response.data.success) {
        setUser(response.data.data);
        setAuthStatus(true);
      }
    } catch (error) {
      setUser(null);
      setAuthStatus(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchTenant = async () => {
    try {
      //tenant doc also stores save save prop, so we can set saved prop from here
      await axiosApi.get("/tenant/profile");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchVisits = async () => {
    try {
      await axiosApi.get("/tenant/visits");
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      await axiosApi.post("/user/logout");
      setUser(null);
      setAuthStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verified();
  });

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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UseUserContext = () => {
  return useContext(UserContext);
};
