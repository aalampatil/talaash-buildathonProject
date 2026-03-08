import { useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosApi } from "../config/axiosApi.js";
import logo from "../assets/logo.png";

const GoogleLogin = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Extract role from URL: "tenant" or "landlord"
  console.log(location);
  const currentRole = location.pathname.split("/").pop();

  const handleClick = () => {
    setLoading(true);
    googleAuth(currentRole); // send role to your context function
  };

  const googleAuth = async (role) => {
    try {
      window.open(
        `${axiosApi.defaults.baseURL}/user/google/${currentRole}?state=${role}`,
        "_self",
      );
      //_self allows to open the page in current tab
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-4"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6">
          <img
            src={logo}
            alt="Talaash Logo"
            className="w-20 h-20 object-contain rounded-full shadow-md"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Welcome to <span className="text-black">talaash</span>
        </h1>
        <p className="text-gray-600 mb-6">
          You'll be signed up as <strong>{currentRole}</strong>
        </p>

        {/* Google Button */}
        <button
          onClick={handleClick}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 py-3 px-6 border border-gray-300 rounded-xl font-semibold text-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />
          {loading ? "Redirecting..." : "Continue with Google"}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          By continuing, you agree to our{" "}
          <span className="underline">Terms & Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default GoogleLogin;
