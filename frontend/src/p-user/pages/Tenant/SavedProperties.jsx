import React from "react";
import { UseUserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

function SavedProperties() {
  const { savedProperties } = UseUserContext();
  const navigate = useNavigate();

  if (!savedProperties || savedProperties.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No saved properties yet
      </div>
    );
  }

  return (
    <div className="w-full h-screen mx-auto px-10 py-10 ">
      <h1 className="text-2xl font-semibold mb-6">Saved Properties</h1>

      {savedProperties.map((property) => (
        <div
          key={property._id}
          className="border border-black py-2 flex justify-between items-center px-10 rounded-md"
        >
          {/* Left */}
          <div>
            <h2 className="text-lg font-medium">{property.title}</h2>

            <p className="text-sm text-gray-600">
              {property.location?.area}, {property.location?.city}
            </p>

            <p className="text-sm">Type: {property.propertyType}</p>
          </div>

          {/* Right */}
          <div className="text-right">
            <p className="text-lg font-semibold">₹{property.rent}/mo</p>

            <button
              onClick={() => navigate(`/property/${property._id}`)}
              className="border border-black px-4 py-1 mt-2 text-sm hover:bg-black hover:text-white transition"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedProperties;
