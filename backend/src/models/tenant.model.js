import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    profile: {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
      },

      profilePicture: {
        type: String,
      },
    },

    verification: {
      verified: {
        type: Boolean,
        default: false,
      },
      verifiedAt: {
        type: Date,
      },
    },

    householdType: {
      type: String,
      enum: ["single", "family", "roommates"],
      default: "single",
    },

    propertyType: {
      type: String,
      enum: ["1BHK", "2BHK", "3BHK", "room"],
      default: "1BHK",
    },

    preferences: {
      location: {
        city: {
          type: String,
          index: true,
        },
        area: {
          type: String,
          index: true,
        },
      },
      budget: {
        type: Number,
      },
    },

    savedProperties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const TenantModel =
  mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);
