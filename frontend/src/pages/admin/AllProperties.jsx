import React from "react";
import { UseAdminContext } from "../../context/AdminContext";

function AllProperties() {
  const { allProperties } = UseAdminContext();

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">All Properties</h1>

      <div className="border border-black rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-black">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Location</th>
              <th className="p-4">Type</th>
              <th className="p-4">Rent</th>
            </tr>
          </thead>

          <tbody>
            {allProperties.map((property) => (
              <tr
                key={property._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition"
              >
                <td className="p-4">{property.title}</td>
                <td className="p-4">
                  {property.location?.city}, {property.location?.area}
                </td>
                <td className="p-4">{property.propertyType}</td>
                <td className="p-4">₹{property.rent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProperties;
