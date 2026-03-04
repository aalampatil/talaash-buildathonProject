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
  const { city, area, minRent, maxRent, propertyType } = req.query;

  const filter = {};

  if (city) {
    filter["location.city"] = city;
  }

  if (area) {
    filter["location.area"] = area;
  }

  if (propertyType) {
    filter.propertyType = propertyType;
  }

  if (minRent || maxRent) {
    filter.rent = {};

    if (minRent) filter.rent.$gte = Number(minRent);
    if (maxRent) filter.rent.$lte = Number(maxRent);
  }

  filter.status = "available";

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
