import { asyncHandler, ApiError, ApiResponse } from "../utils/utils.js";
import { LandlordModel, PropertyModel, VisitModel } from "../models/models.js";

export const getLandlordProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const landlord = await LandlordModel.findOne({ userId });

  if (!landlord) {
    throw new ApiError(404, "Landlord profile not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, landlord, "Landlord profile fetched"));
});

export const createProperty = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const landlord = await LandlordModel.findOne({ userId });

  if (!landlord) {
    throw new ApiError(404, "Landlord not found");
  }

  const property = await PropertyModel.create({
    ...req.body,
    landlord: landlord._id,
  });

  landlord.properties.push(property._id);
  await landlord.save();

  return res
    .status(201)
    .json(new ApiResponse(201, property, "Property created successfully"));
});

export const deleteProperty = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  const property = await PropertyModel.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  await PropertyModel.findByIdAndDelete(propertyId);

  await LandlordModel.updateOne(
    { _id: property.landlord },
    { $pull: { properties: propertyId } },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Property deleted successfully"));
});

export const getMyProperty = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const landlord = await LandlordModel.findOne({ userId }).populate(
    "properties",
  );

  if (!landlord) {
    throw new ApiError(404, "Landlord not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, landlord.properties, "Properties fetched"));
});

export const getVisitRequest = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const landlord = await LandlordModel.findOne({ userId });

  const visits = await VisitModel.find({
    property: { $in: landlord.properties },
  })
    .populate("property")
    .populate("tenant");

  return res
    .status(200)
    .json(new ApiResponse(200, visits, "Visit requests fetched"));
});

export const approveVisit = asyncHandler(async (req, res) => {
  const { visitId } = req.params;

  const visit = await VisitModel.findById(visitId);

  if (!visit) {
    throw new ApiError(404, "Visit request not found");
  }

  visit.status = "approved";
  await visit.save();

  return res.status(200).json(new ApiResponse(200, visit, "Visit approved"));
});

export const rejectVisit = asyncHandler(async (req, res) => {
  const { visitId } = req.params;

  const visit = await VisitModel.findById(visitId);

  if (!visit) {
    throw new ApiError(404, "Visit request not found");
  }

  visit.status = "rejected";
  await visit.save();

  return res.status(200).json(new ApiResponse(200, visit, "Visit rejected"));
});
