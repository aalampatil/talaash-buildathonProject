import React from "react";
import PropertyCard from "../../components/UserComponents/PropertyCard";
import { UsePropertyContext } from "../../context/PropertyContext";

function FilterProperties() {
  const { properties } = UsePropertyContext();

  return (
    <div className="min-h-screen px-6 py-10">
      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-6">Filtered Properties</h1>

      {/* Property List */}
      {properties.length === 0 ? (
        <div>
          <p className="text-gray-500">No properties found</p>
          <p className="text-gray-500">Search to proceed</p>{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              image={
                property.images.length > 0
                  ? property.images[0]
                  : "https://placehold.co/600x400"
              }
              title={`${property.propertyType} in ${property.location.city}`}
              price={`₹${property.rent}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterProperties;
