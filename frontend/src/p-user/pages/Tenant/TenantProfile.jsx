// TenantProfileEditable.jsx
import React, { useState } from "react";

function TenantProfileEditable() {
  // Dummy tenant data
  const initialTenant = {
    profile: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      mobile: "+1 234 567 890",
      profilePicture: "https://i.pravatar.cc/150?img=5",
    },
    verification: { verified: true },
    householdType: "family",
    preferences: {
      location: { city: "San Francisco", area: "Mission District" },
      budget: { min: 1500, max: 3000 },
    },
    savedProperties: [
      { _id: "1", name: "Sunny Apartment", location: "Downtown" },
      { _id: "2", name: "Cozy Condo", location: "Bayview" },
    ],
  };

  const [tenant, setTenant] = useState(initialTenant);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (section, field, value) => {
    setTenant((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handlePreferencesChange = (field, value) => {
    if (field === "city" || field === "area") {
      setTenant((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          location: {
            ...prev.preferences.location,
            [field]: value,
          },
          budget: { ...prev.preferences.budget },
        },
      }));
    } else {
      setTenant((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          location: { ...prev.preferences.location },
          budget: { ...prev.preferences.budget, [field]: value },
        },
      }));
    }
  };

  const handleSave = () => {
    // Here you can send tenant to backend API
    setEditMode(false);
    console.log("Saved tenant:", tenant);
  };

  const handleCancel = () => {
    setTenant(initialTenant);
    setEditMode(false);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans p-8">
      {/* Edit / Save Buttons */}
      <div className="max-w-5xl mx-auto flex justify-end mb-4">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-red-900 text-white rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-red-900 rounded text-red-900"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-red-900 text-white rounded"
          >
            Edit
          </button>
        )}
      </div>

      {/* Profile Header */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 p-6 border-2 border-red-900 rounded-xl shadow-md">
        <img
          src={tenant.profile.profilePicture}
          alt="Profile"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-red-900"
        />
        <div className="flex-1 space-y-2 md:space-y-4">
          {editMode ? (
            <>
              <input
                type="text"
                value={tenant.profile.name}
                onChange={(e) =>
                  handleChange("profile", "name", e.target.value)
                }
                className="border border-red-900 rounded px-2 py-1 w-full"
              />
              <input
                type="email"
                value={tenant.profile.email}
                onChange={(e) =>
                  handleChange("profile", "email", e.target.value)
                }
                className="border border-red-900 rounded px-2 py-1 w-full"
              />
              <input
                type="text"
                value={tenant.profile.mobile}
                onChange={(e) =>
                  handleChange("profile", "mobile", e.target.value)
                }
                className="border border-red-900 rounded px-2 py-1 w-full"
              />
              <input
                type="text"
                value={tenant.householdType}
                onChange={(e) =>
                  handleChange("householdType", "householdType", e.target.value)
                }
                className="border border-red-900 rounded px-2 py-1 w-full"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{tenant.profile.name}</h1>
              <p>
                <strong>Email:</strong> {tenant.profile.email}
              </p>
              <p>
                <strong>Mobile:</strong> {tenant.profile.mobile}
              </p>
              <p>
                <strong>Household Type:</strong> {tenant.householdType}
              </p>
              <p>
                <strong>Verified:</strong>{" "}
                {tenant.verification.verified ? "✅" : "❌"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Preferences & Saved Properties */}
      <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-2 gap-6">
        {/* Preferences */}
        <div className="p-6 border-2 border-red-900 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Preferences</h2>
          {editMode ? (
            <>
              <input
                type="text"
                value={tenant.preferences.location.city}
                onChange={(e) =>
                  handlePreferencesChange("city", e.target.value)
                }
                className="border border-red-900 rounded px-2 py-1 w-full mb-2"
              />
              <input
                type="text"
                value={tenant.preferences.location.area}
                onChange={(e) =>
                  handlePreferencesChange("area", e.target.value)
                }
                className="border border-red-900 rounded px-2 py-1 w-full mb-2"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={tenant.preferences.budget.min}
                  onChange={(e) =>
                    handlePreferencesChange("min", Number(e.target.value))
                  }
                  className="border border-red-900 rounded px-2 py-1 w-full"
                  placeholder="Min Budget"
                />
                <input
                  type="number"
                  value={tenant.preferences.budget.max}
                  onChange={(e) =>
                    handlePreferencesChange("max", Number(e.target.value))
                  }
                  className="border border-red-900 rounded px-2 py-1 w-full"
                  placeholder="Max Budget"
                />
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>City:</strong> {tenant.preferences.location.city}
              </p>
              <p>
                <strong>Area:</strong> {tenant.preferences.location.area}
              </p>
              <p>
                <strong>Budget:</strong> ${tenant.preferences.budget.min} - $
                {tenant.preferences.budget.max}
              </p>
            </>
          )}
        </div>

        {/* Saved Properties */}
        <div className="p-6 border-2 border-red-900 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Saved Properties</h2>
          <ul className="space-y-2">
            {tenant.savedProperties.map((property) => (
              <li
                key={property._id}
                className={`p-3 border border-red-900 rounded-lg ${
                  editMode ? "bg-red-50" : ""
                }`}
              >
                {editMode ? (
                  <input
                    type="text"
                    value={property.name}
                    onChange={(e) => {
                      const newProps = tenant.savedProperties.map((p) =>
                        p._id === property._id
                          ? { ...p, name: e.target.value }
                          : p,
                      );
                      setTenant((prev) => ({
                        ...prev,
                        savedProperties: newProps,
                      }));
                    }}
                    className="w-full px-2 py-1 border border-red-900 rounded"
                  />
                ) : (
                  <>
                    {property.name} - {property.location}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TenantProfileEditable;
