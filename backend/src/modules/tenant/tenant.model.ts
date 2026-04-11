import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { required } from "zod/mini";

const tenantSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one tenant per user
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
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
    shortListedProperties: [
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
  (mongoose.models.Tenant as mongoose.Model<TenantDocument>) ||
  mongoose.model<TenantDocument>("Tenant", tenantSchema);
