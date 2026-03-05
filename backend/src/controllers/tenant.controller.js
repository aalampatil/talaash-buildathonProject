import { asyncHandler, ApiError, ApiResponse } from "../utils/utils.js";
import { TenantModel, PropertyModel } from "../models/models.js";

export const getTenantProfile = asyncHandler(async (req, res) => {
  const tenant = await TenantModel.findOne({ userId: req.user._id }).populate(
    "savedProperties",
  );

  if (!tenant) {
    throw new ApiError(404, "Tenant profile not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tenant, "Tenant profile fetched successfully"));
});

export const updateTenantProfile = asyncHandler(async (req, res) => {
  const { name, email, mobile } = req.body;

  const tenant = await TenantModel.findOne({ userId: req.user._id });

  if (!tenant) {
    throw new ApiError(404, "Tenant not found");
  }

  if (name) tenant.profile.name = name;
  if (email) tenant.profile.email = email;
  if (mobile) tenant.profile.mobile = mobile;

  await tenant.save();

  return res
    .status(200)
    .json(new ApiResponse(200, tenant.profile, "Profile updated successfully"));
});

export const updateTenantPreferance = asyncHandler(async (req, res) => {
  const { city, area, minBudget, maxBudget, householdType } = req.body;

  const tenant = await TenantModel.findOne({ userId: req.user._id });

  if (!tenant) {
    throw new ApiError(404, "Tenant not found");
  }

  if (city) tenant.preferences.location.city = city;
  if (area) tenant.preferences.location.area = area;
  if (minBudget) tenant.preferences.budget.min = minBudget;
  if (maxBudget) tenant.preferences.budget.max = maxBudget;
  if (householdType) tenant.householdType = householdType;

  await tenant.save();

  return res
    .status(200)
    .json(new ApiResponse(200, tenant, "Preferences updated successfully"));
});

export const saveProperty = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  const tenant = await TenantModel.findOne({ userId: req.user._id });

  if (!tenant) {
    throw new ApiError(404, "Tenant not found");
  }

  if (tenant.savedProperties.includes(propertyId)) {
    throw new ApiError(400, "Property already saved");
  }

  tenant.savedProperties.push(propertyId);

  await tenant.save();

  return res
    .status(200)
    .json(new ApiResponse(200, tenant.savedProperties, "Property saved"));
});

export const removeSavedProperty = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  const tenant = await TenantModel.findOne({ userId: req.user._id });

  if (!tenant) {
    throw new ApiError(404, "Tenant not found");
  }

  tenant.savedProperties = tenant.savedProperties.filter(
    (prop) => prop.toString() !== propertyId,
  );

  await tenant.save();

  return res
    .status(200)
    .json(new ApiResponse(200, tenant.savedProperties, "Property removed"));
});

export const getTenantVisits = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const tenant = await TenantModel.findOne({ userId });

  if (!tenant) {
    throw new ApiError(404, "Tenant not found");
  }

  const visits = await VisitModel.find({
    tenantId: tenant._id,
  })
    .populate("propertyId")
    .populate("landlordId");

  return res
    .status(200)
    .json(new ApiResponse(200, visits, "Tenant visits fetched successfully"));
});

export const requestVisit = asyncHandler(async (req, res) => {
  const { propertyId, visitDate } = req.body;

  const visit = await VisitRequest.create({
    tenant: req.user._id,
    property: propertyId,
    visitDate,
    status: "pending",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, visit, "Visit request sent"));
});

export const cancelVisit = asyncHandler(async (req, res) => {
  const { visitId } = req.params;

  const visit = await VisitRequest.findOneAndDelete({
    _id: visitId,
    tenant: req.user._id,
  });

  if (!visit) {
    throw new ApiError(404, "Visit request not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, visit, "Visit request cancelled"));
});

export const getRecommendedProperties = asyncHandler(async (req, res) => {
  const tenant = await TenantModel.findOne({ userId: req.user._id });

  if (!tenant) {
    throw new ApiError(404, "Tenant not found");
  }

  const { city } = tenant.preferences.location;
  const { min, max } = tenant.preferences.budget;

  const properties = await PropertyModel.find({
    "location.city": city,
    price: { $gte: min || 0, $lte: max || 100000000 },
  }).limit(20);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        properties,
        "Recommended properties fetched successfully",
      ),
    );
});
