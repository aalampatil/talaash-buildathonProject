// TenantProfileEditable.jsx
import React, { useState } from "react";
import { UseUserContext } from "../../context/UserContext";

const TenantProfileEditable = () => {
  const { tenantProfile } = UseUserContext();
  const [edit, setEdit] = useState(false);

  if (!tenantProfile || !tenantProfile.profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading profile...
      </div>
    );
  }

  const { profile } = tenantProfile;

  const [formData, setFormData] = useState({
    householdType: tenantProfile?.householdType || "Single",
    city: tenantProfile?.preferences?.location?.city || "Mumbai",
    budget: tenantProfile?.preferences?.budget || "Rs10000",
    propertyType: "2BHK",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log("Updated data:", formData);
    setEdit(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto border border-black p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Tenant Profile</h2>

          <button
            onClick={() => (edit ? handleSave() : setEdit(true))}
            className="border border-black px-4 py-1"
          >
            {edit ? "Save" : "Edit"}
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <img
            src={profile.profilePicture}
            alt="profile"
            className="w-16 h-16 border border-black rounded-full object-cover"
          />

          <div>
            <p className="font-medium">{profile.name}</p>
            <p className="text-sm">{profile.email}</p>
          </div>
        </div>

        {/* Household Type */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Household Type</label>

          {edit ? (
            <select
              name="householdType"
              value={formData.householdType}
              onChange={handleChange}
              className="border border-black p-2"
            >
              <option value="single">Single</option>
              <option value="family">Family</option>
              <option value="roommates">Roommates</option>
            </select>
          ) : (
            <p className="border border-black p-2">{formData.householdType}</p>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Preferred City</label>

          {edit ? (
            <select
              name="city"
              value={formData.city || "Delhi"}
              onChange={handleChange}
              className="border border-black p-2"
            >
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Goa">Goa</option>
            </select>
          ) : (
            <p className="border border-black p-2">{formData.city}</p>
          )}
        </div>

        {/* Budget */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Budget</label>

          {edit ? (
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="border border-black p-2"
            >
              <option value="5000">Rs5,000</option>
              <option value="10000">Rs10,000</option>
              <option value="15000">Rs15,000</option>
              <option value="20000">Rs20,000</option>
              <option value="30000">Rs30,000</option>
              <option value="40000">Rs40,000</option>
              <option value="50000">Rs50,000+</option>
            </select>
          ) : (
            <p className="border border-black p-2"> {formData.budget}</p>
          )}
        </div>

        {/* Property Type */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Property Type</label>

          {edit ? (
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="border border-black p-2"
            >
              <option value="">{formData.propertyType || "2BHK"}</option>

              <option value="1BhK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="room">room</option>
            </select>
          ) : (
            <p className="border border-black p-2"> {formData.propertyType}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantProfileEditable;
