import mongoose from "mongoose";
import dotenv from "dotenv";

import { UserModel } from "../models/user.model.js";
import { TenantModel } from "../models/tenant.model.js";
import { LandlordModel } from "../models/landlord.model.js";
import { PropertyModel } from "../models/property.model.js";
import { VisitModel } from "../models/visit.model.js";

dotenv.config({ path: "../../.env" });

/* ------------------- DB CONNECT ------------------- */

await mongoose.connect(process.env.DB_URI);
console.log("MongoDB Connected");

/* ------------------- RESET DB ------------------- */

await UserModel.deleteMany();
await TenantModel.deleteMany();
await LandlordModel.deleteMany();
await PropertyModel.deleteMany();
await VisitModel.deleteMany();

console.log("Old Data Cleared");

/* ------------------- CITY DATA ------------------- */

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Goa",
];

const cityAreas = {
  Delhi: ["Dwarka", "Rohini", "Saket", "Karol Bagh"],
  Mumbai: ["Andheri", "Bandra", "Powai", "Dadar"],
  Bangalore: ["Whitefield", "Indiranagar", "BTM", "Electronic City"],
  Hyderabad: ["Gachibowli", "Hitech City", "Madhapur", "Banjara Hills"],
  Chennai: ["T Nagar", "Velachery", "Adyar", "Anna Nagar"],
  Kolkata: ["Salt Lake", "Park Street", "New Town", "Howrah"],
  Pune: ["Hinjewadi", "Baner", "Kothrud", "Viman Nagar"],
  Ahmedabad: ["Navrangpura", "Satellite", "Bopal", "Maninagar"],
  Jaipur: ["Malviya Nagar", "Vaishali Nagar", "Jagatpura", "Mansarovar"],
  Goa: ["Panaji", "Calangute", "Candolim", "Margao"],
};

/* ------------------- HOUSE IMAGES ------------------- */

const houseImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "https://images.unsplash.com/photo-1599423300746-b62533397364",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498b",
  "https://images.unsplash.com/photo-1600607688960-e095ff83135c",
];

function getRandomImages() {
  const shuffled = [...houseImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6);
}

/* ------------------- USERS ------------------- */

const users = [];

for (let i = 1; i <= 50; i++) {
  users.push({
    name: `User ${i}`,
    email: `user${i}@mail.com`,
    googleId: `google-${i}`,
    role: i <= 10 ? "landlord" : "tenant",
    profilePicture: `https://i.pravatar.cc/150?img=${i}`,
  });
}

const createdUsers = await UserModel.insertMany(users);

console.log("Users Created");

/* ------------------- LANDLORDS ------------------- */

const landlords = [];

const landlordUsers = createdUsers.filter((u) => u.role === "landlord");

for (let user of landlordUsers) {
  landlords.push({
    userId: user._id,
    profile: {
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    },
    verification: {
      verified: true,
      verifiedAt: new Date(),
    },
  });
}

const createdLandlords = await LandlordModel.insertMany(landlords);

console.log("Landlords Created");

/* ------------------- TENANTS ------------------- */

const tenants = [];

const tenantUsers = createdUsers.filter((u) => u.role === "tenant");

for (let user of tenantUsers) {
  tenants.push({
    userId: user._id,
    profile: {
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    },
    verification: {
      verified: true,
      verifiedAt: new Date(),
    },
    householdType: ["single", "family", "roommates"][
      Math.floor(Math.random() * 3)
    ],
    propertyType: ["1BHK", "2BHK", "3BHK", "room"][
      Math.floor(Math.random() * 4)
    ],
    preferences: {
      location: {
        city: cities[Math.floor(Math.random() * cities.length)],
        area: "Central",
      },
      budget: Math.floor(Math.random() * 40000) + 8000,
    },
  });
}

const createdTenants = await TenantModel.insertMany(tenants);

console.log("Tenants Created");

/* ------------------- PROPERTIES ------------------- */

const properties = [];

for (let i = 1; i <= 60; i++) {
  const landlord =
    createdLandlords[Math.floor(Math.random() * createdLandlords.length)];

  const city = cities[Math.floor(Math.random() * cities.length)];
  const area =
    cityAreas[city][Math.floor(Math.random() * cityAreas[city].length)];

  properties.push({
    landlordId: landlord._id,
    title: `Modern Apartment ${i}`,
    description: "Spacious modern apartment with great amenities",

    rent: Math.floor(Math.random() * 35000) + 8000,

    location: {
      city,
      area,
      address: "Main Street",
    },

    propertyType: ["1BHK", "2BHK", "3BHK", "room"][
      Math.floor(Math.random() * 4)
    ],

    images: getRandomImages(),

    amenities: ["wifi", "parking", "ac", "furnished"].slice(
      0,
      Math.floor(Math.random() * 4) + 1,
    ),

    status: "available",

    ratings: ["average", "decent", "good", "Very Good", "Excellent"][
      Math.floor(Math.random() * 5)
    ],
  });
}

const createdProperties = await PropertyModel.insertMany(properties);

console.log("Properties Created");

/* ------------------- LINK LANDLORD PROPERTIES ------------------- */

for (let property of createdProperties) {
  await LandlordModel.findByIdAndUpdate(property.landlordId, {
    $push: { properties: property._id },
  });
}

console.log("Properties Linked To Landlords");

/* ------------------- VISITS ------------------- */

const visits = [];

for (let i = 0; i < 40; i++) {
  const tenant =
    createdTenants[Math.floor(Math.random() * createdTenants.length)];

  const property =
    createdProperties[Math.floor(Math.random() * createdProperties.length)];

  visits.push({
    tenantId: tenant._id,
    propertyId: property._id,
    landlordId: property.landlordId,
    visitDate: new Date(),
    message: "Interested in visiting this property",
    status: ["pending", "approved", "rejected"][Math.floor(Math.random() * 3)],
  });
}

await VisitModel.insertMany(visits);

console.log("Visits Created");

/* ------------------- DONE ------------------- */

console.log("Database Seeded Successfully");

process.exit();
