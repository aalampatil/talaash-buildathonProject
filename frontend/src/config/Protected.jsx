import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { UseAuthContext } from "../context/Auth";

function Protected({ children, authentication }) {
  const { authStatus, loading } = UseAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (authentication && !authStatus) {
        navigate("/login");
      } else if (!authentication && authStatus) {
        navigate("/");
      }
    }
  }, [authStatus, authentication, navigate, loading]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return children;
}

export default Protected;
