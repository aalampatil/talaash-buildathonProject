import mongoose from "mongoose";

const landlordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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

    properties: [
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

export const LandlordModel =
  mongoose.models.LandLord || mongoose.model("Landlord", landlordSchema);
