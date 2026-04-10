import mongoose, { Schema, type InferSchemaType } from "mongoose";

const tenantSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one tenant per user
    },
    householdType: {
      type: String,
      enum: ["family", "single", "room"],
    },
    propertyType: {
      type: String,
      enum: ["1BHK", "2BHK", "3BHK"],
    },
    preferences: {
      location: String,
      city: String,
      budget: Number,
    },
    savedProperties: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    shortlistedProperties: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true },
);

export type TenantDocument = InferSchemaType<typeof tenantSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Tenant =
  mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);
