import React from "react";
import { UseUserContext } from "../../../context/UserContext";

function TenantVisits() {
  const { visits } = UseUserContext();

  if (!visits || visits.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        No visits scheduled
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-4">
      {visits.map((visit) => (
        <div
          key={visit._id}
          className="w-full h-[100px] border border-black flex items-center justify-between px-6"
        >
          {/* Property Info */}
          <div>
            <p className="font-semibold">{visit.propertyId?.title}</p>

            <p className="text-sm text-gray-600">
              {visit.propertyId?.location?.city},{" "}
              {visit.propertyId?.location?.area}
            </p>

            <p className="text-sm">₹{visit.propertyId?.rent}</p>
          </div>

          {/* Visit Date */}
          <div className="text-sm">
            {new Date(visit.visitDate).toLocaleDateString()}
          </div>

          {/* Status */}
          <div>
            <span className="border border-black px-3 py-1 text-sm">
              {visit.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TenantVisits;
