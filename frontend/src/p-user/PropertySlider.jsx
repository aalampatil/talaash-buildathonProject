import { useEffect, useState } from "react";
import { UsePropertyContext } from "../context/PropertyContext";
import { useNavigate } from "react-router-dom";

const PropertySlider = () => {
  const { allProperties } = UsePropertyContext();
  const [randomProps, setRandomProps] = useState([]);
  const navigate = useNavigate();

  const handleRandom = () => {
    if (allProperties?.length) {
      const shuffled = [...allProperties].sort(() => 0.5 - Math.random());
      setRandomProps(shuffled.slice(0, 6));
    }
  };

  useEffect(() => {
    if (allProperties?.length > 0) {
      handleRandom();
    }
  }, [allProperties]);

  if (!randomProps.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">
        Hot Properties around the Country
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {randomProps.map((property) => (
          <div
            onClick={() => navigate(`/property/${property._id}`)}
            key={property._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Property image */}
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
              {property.images?.[0] ? (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {/* Property info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {property.location.city}, {property.location.area}
              </p>
              <p className="text-gray-700 font-medium mt-2">
                ₹{property.rent.toLocaleString()} / month
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {property.propertyType}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySlider;
