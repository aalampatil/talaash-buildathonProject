import React from "react";
import { UseUserContext } from "../../context/UserContext";

function TenantVisits() {
  const { visits } = UseUserContext();

  const dummyVisit = {
    _id: "dummy",
    propertyId: {
      title: "Sample Apartment",
      location: {
        city: "Your City",
        area: "Sample Area",
      },
      rent: "XXXX",
    },
    visitDate: new Date(),
    status: "Example",
  };

  const visitList = visits && visits.length > 0 ? visits : [dummyVisit];

  return (
    <div className="min-h-screen p-6 space-y-4">
      {visits?.length === 0 && (
        <p className="text-center text-gray-500 text-sm mb-4">
          No visits scheduled yet. This is how your visit will appear.
        </p>
      )}

      {visitList.map((visit) => (
        <div
          key={visit._id}
          className="w-full min-h-[100px] border border-black flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4"
        >
          {/* Property Info */}
          <div>
            <p className="font-semibold">{visit.propertyId?.title}</p>

            <p className="text-sm text-gray-600">
              {visit.propertyId?.location?.city},{" "}
              {visit.propertyId?.location?.area}
            </p>

            <p className="text-sm">Rs {visit.propertyId?.rent}</p>
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
