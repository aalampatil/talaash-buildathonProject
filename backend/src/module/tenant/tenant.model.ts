import mongoose, { Schema, Document, Model } from "mongoose";

// 1️⃣ Interface
export interface Tenant extends Document {
  userId: string; // Clerk user ID
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2️⃣ Schema
const TenantSchema: Schema<Tenant> = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true, // important for queries
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// 3️⃣ Model
const TenantModel: Model<Tenant> =
  mongoose.models.Tenant || mongoose.model<Tenant>("Tenant", TenantSchema);

export default TenantModel;
