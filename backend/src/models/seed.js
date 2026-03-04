import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

import { UserModel } from "./user.model.js";
import { TenantModel } from "./tenant.model.js";
import { LandlordModel } from "./landlord.model.js";
import { PropertyModel } from "./property.model.js";
import { VisitModel } from "./visit.model.js";

await mongoose.connect(`${process.env.DB_URI}`);

console.log("DB connected");

// clear old data
await UserModel.deleteMany();
await TenantModel.deleteMany();
await LandlordModel.deleteMany();
await PropertyModel.deleteMany();
await VisitModel.deleteMany();

const landlords = [];
const tenants = [];
const properties = [];

// ---------- CREATE LANDLORDS ----------
for (let i = 1; i <= 5; i++) {
  const user = await UserModel.create({
    name: `Landlord ${i}`,
    email: `landlord${i}@mail.com`,
    password: "123456",
    mobile: `99900000${i}`,
    role: "landlord",
  });

  const landlord = await LandlordModel.create({
    userId: user._id,
    profile: {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      profilePicture: "https://dummyimage.com/200x200",
    },
  });

  landlords.push(landlord);
}

// ---------- CREATE TENANTS ----------
for (let i = 1; i <= 10; i++) {
  const user = await UserModel.create({
    name: `Tenant ${i}`,
    email: `tenant${i}@mail.com`,
    password: "123456",
    mobile: `88800000${i}`,
    role: "tenant",
  });

  const tenant = await TenantModel.create({
    userId: user._id,
    profile: {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      profilePicture: "https://dummyimage.com/200x200",
    },
  });

  tenants.push(tenant);
}

// ---------- CREATE PROPERTIES ----------
for (let i = 1; i <= 20; i++) {
  const landlord = landlords[Math.floor(Math.random() * landlords.length)];

  const property = await PropertyModel.create({
    landlordId: landlord._id,
    title: `Apartment ${i}`,
    description: "Nice rental property",
    rent: Math.floor(Math.random() * 20000) + 5000,
    location: {
      city: "Delhi",
      area: "Sector " + Math.floor(Math.random() * 50),
      address: "Sample Address",
    },
    propertyType: ["1BHK", "2BHK", "3BHK"][Math.floor(Math.random() * 3)],
  });

  properties.push(property);

  await LandlordModel.findByIdAndUpdate(landlord._id, {
    $push: { properties: property._id },
  });
}

// ---------- CREATE VISITS ----------
for (let i = 0; i < 15; i++) {
  const tenant = tenants[Math.floor(Math.random() * tenants.length)];
  const property = properties[Math.floor(Math.random() * properties.length)];

  await VisitModel.create({
    tenantId: tenant._id,
    propertyId: property._id,
    landlordId: property.landlordId,
    visitDate: new Date(Date.now() + 86400000 * 2),
    message: "Interested in visiting this property",
  });
}

console.log("Seed data created");

process.exit();
