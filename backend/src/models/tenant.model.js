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

      mobile: {
        type: String,
        required: true,
      },

      profilePicture: {
        type: String,
        required: true,
      },
      profilePicture_publicId: {
        type: String,
      },
    },

    verification: {
      verified: {
        type: Boolean,
        default: false,
      },
    },

    householdType: {
      type: String,
      enum: ["single", "family", "roommates"],
      default: "single",
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
        min: Number,
        max: Number,
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
