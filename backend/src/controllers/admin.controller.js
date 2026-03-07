import { asyncHandler, ApiError, ApiResponse } from "../utils/utils.js";
import { PropertyModel } from "../models/property.model.js";
import { UserModel } from "../models/user.model.js";
// fetch all properties
export const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await PropertyModel.find().populate(
    "landlordId",
    "name email",
  );

  if (!properties) {
    throw new ApiError(404, "No properties found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, properties, "All properties fetched"));
});

// fetch all landlords
export const getAllLandlords = asyncHandler(async (req, res) => {
  const landlords = await UserModel.find({ role: "landlord" });

  if (!landlords) {
    throw new ApiError(404, "No landlords found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, landlords, "All landlords fetched"));
});

// fetch all users (tenants)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({ role: "tenant" });

  if (!users) {
    throw new ApiError(404, "No users found");
  }

  return res.status(200).json(new ApiResponse(200, users, "All users fetched"));
});
