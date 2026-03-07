import React from "react";
import { UseLandlordContext } from "../../context/LandlordContext";
import { Link } from "react-router-dom";

function LandlordProperties() {
  const { landlordProperties } = UseLandlordContext();

  if (!landlordProperties || landlordProperties.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-xl">
        No properties found. Add a new property!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landlordProperties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
          >
            {/* Property Image */}
            {property.images && property.images[0] && (
              <img
                src={property.images[0]}
                alt={property.title}
                className="h-48 w-full object-cover"
              />
            )}

            {/* Property Info */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {property.title}
              </h2>
              <p className="text-gray-500 text-sm">
                {property.location?.city}, {property.location?.area}
              </p>
              <p className="text-gray-600">{property.description}</p>
              <p className="text-blue-600 font-bold text-lg">
                ${property.rent} / month
              </p>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {property.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/dashboard/landlord/properties/edit/${property._id}`}
                  className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </Link>
                <Link
                  to={`/dashboard/landlord/properties/${property._id}/visits`}
                  className="text-sm text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Visits
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandlordProperties;
