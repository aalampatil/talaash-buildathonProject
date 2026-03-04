import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Landlord",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    rent: {
      type: Number,
      required: true,
    },

    location: {
      city: String,
      area: String,
      address: String,
    },

    propertyType: {
      type: String,
      enum: ["1BHK", "2BHK", "3BHK", "room"],
    },

    images: [String],
    images_publicId: [String],

    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
    ratings: {
      type: String,
      enum: ["average", "decent", "good", "Very Good", "Excellent"],
    },
  },
  {
    timestamps: true,
  },
);

export const PropertyModel =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
