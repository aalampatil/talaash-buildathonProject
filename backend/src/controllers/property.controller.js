import { asyncHandler, ApiError, ApiResponse } from "../utils/utils.js";
import { PropertyModel } from "../models/models.js";

export const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await PropertyModel.find({ status: "available" }).populate(
    "landlordId",
    "profile.name profile.email",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, properties, "Properties fetched successfully"));
});

export const getProperty = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  const property = await PropertyModel.findById(propertyId).populate(
    "landlordId",
    "profile",
  );

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, property, "Property fetched successfully"));
});

export const searchProperties = asyncHandler(async (req, res) => {
  const { city, rent, propertyType } = req.query;

  const filter = {
    status: "available",
  };

  if (city) {
    filter["location.city"] = { $regex: city, $options: "i" };
  }

  if (propertyType) {
    filter.propertyType = propertyType;
  }

  if (rent) {
    filter.rent = { $lte: parseInt(rent) };
  }

  const properties = await PropertyModel.find(filter);

  return res
    .status(200)
    .json(new ApiResponse(200, properties, "Search results"));
});

export const togglePropertyAvailablity = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  const property = await PropertyModel.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  property.status = property.status === "available" ? "occupied" : "available";

  await property.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, property, `Property marked as ${property.status}`),
    );
});
