import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../context/UserContext";

function ProtectedLandlord({ children, authentication }) {
  const { authStatus, loading } = UseUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (authentication && !authStatus) {
        navigate("/login/landlord");
      } else if (!authentication && authStatus) {
        navigate("/dashboard/landlord");
      }
    }
  }, [authStatus, authentication, navigate, loading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>

        {/* Loading text */}
        <p className="text-gray-700 text-lg font-medium animate-pulse">
          fetching
        </p>
      </div>
    );
  }

  return { children };
}

export default ProtectedLandlord;
