import React from "react";
import { UseLandlordContext } from "../../context/LandlordContext";

function LandlordVisits() {
  const { manageVisits, approveVisit, rejectVisit } = UseLandlordContext();

  if (!manageVisits || manageVisits.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-xl">
        No visits to show .
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Visits</h1>

      <div className="space-y-4">
        {manageVisits.map((visit) => (
          <div
            key={visit._id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            {/* Visit Info */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div>
                <p className="font-semibold text-gray-800">
                  {visit.tenantName || "Tenant Name"}
                </p>
                <p className="text-gray-600 text-sm">{visit.tenantEmail}</p>
              </div>
              <div>
                <p className="text-gray-700">
                  Property:{" "}
                  <span className="font-medium">{visit.propertyTitle}</span>
                </p>
                <p className="text-gray-700">
                  Date: <span className="font-medium">{visit.date}</span>
                </p>
                <p className="text-gray-700">
                  Time: <span className="font-medium">{visit.time}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 md:mt-0 flex gap-2">
              <button
                onClick={() => approveVisit(visit._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => rejectVisit(visit._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandlordVisits;
