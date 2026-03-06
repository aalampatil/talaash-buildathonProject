// TenantProfileEditable.jsx
import React from "react";
import { UseUserContext } from "../../../context/UserContext";

const TenantProfileEditable = () => {
  const { tenantProfile } = UseUserContext();

  if (!tenantProfile || !tenantProfile.profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-black text-lg">Loading profile...</p>
      </div>
    );
  }

  const { profile, verification, householdType, preferences } = tenantProfile;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full p-8">
        <h1 className="text-2xl font-bold text-black mb-6">Tenant Profile</h1>

        <form className="space-y-5">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <img
              src={
                profile.profilePicture ||
                "https://dummyimage.com/100x100/000/fff&text=User"
              }
              alt={profile.name}
              className="w-20 h-20 rounded-full border border-black object-cover"
            />
            <div>
              <p className="text-black font-semibold">{profile.name}</p>
              <span
                className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${
                  verification?.verified
                    ? "bg-black text-white"
                    : "bg-white text-black border border-black"
                }`}
              >
                {verification?.verified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-black font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              readOnly
              className="w-full border border-black rounded-md p-2 text-black bg-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-black font-medium mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full border border-black rounded-md p-2 text-black bg-white"
            />
          </div>

          {/* Household Type */}
          <div>
            <label className="block text-black font-medium mb-1">
              Household Type
            </label>
            <input
              type="text"
              value={householdType || "-"}
              readOnly
              className="w-full border border-black rounded-md p-2 text-black bg-white"
            />
          </div>

          {/* Preferred City */}
          <div>
            <label className="block text-black font-medium mb-1">
              Preferred City
            </label>
            <input
              type="text"
              value={preferences?.location?.city || "-"}
              readOnly
              className="w-full border border-black rounded-md p-2 text-black bg-white"
            />
          </div>

          {/* Preferred Area */}
          <div>
            <label className="block text-black font-medium mb-1">
              Preferred Area
            </label>
            <input
              type="text"
              value={preferences?.location?.area || "-"}
              readOnly
              className="w-full border border-black rounded-md p-2 text-black bg-white"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-black font-medium mb-1">Budget</label>
            <input
              type="text"
              value={`Min: ₹${preferences?.budget?.min || 0} | Max: ₹${preferences?.budget?.max || 0}`}
              readOnly
              className="w-full border border-black rounded-md p-2 text-black bg-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantProfileEditable;
