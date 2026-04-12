import ApiError from "../../common/utils/api-error.js";
import { Tenant, type TenantDocument } from "./tenant.model.js";

const ServiceHandleGetTenantProfile = async (clerkId: string) => {
  const tenant = await Tenant.findOne({ clerkId }).populate("userId");
  console.log("T", tenant);
  if (!tenant) throw ApiError.notfound("Tenant not found");
  return tenant;
};

const ServiceHandleUpdateTenantPreferences = async ({
  ...data
}: TenantDocument) => {
  const { clerkId, preferences } = data;
  const tenant = await Tenant.findOne({ clerkId });
  if (!tenant) throw ApiError.notfound("user not found");

  if (preferences) {
    tenant.preferences = {
      ...tenant.preferences,
      ...preferences,
    };
  }

  await tenant.save({ validateBeforeSave: false });
  return { message: "preference updated" };
};

//#region

const ServiceHandleSaveProperty = async ({
  clerkId,
  propertyId,
}: {
  clerkId: string;
  propertyId: string;
}) => {
  const result = await Tenant.updateOne(
    { clerkId },
    { $addToSet: { savedProperties: propertyId } },
  );

  if (result.matchedCount === 0) {
    throw ApiError.notfound("user not found");
  }

  return { message: "property saved" };
};

const ServiceHandleRemoveSavedProperty = async ({
  clerkId,
  propertyId,
}: {
  clerkId: string;
  propertyId: string;
}) => {
  const result = await Tenant.updateOne(
    { clerkId },
    { $pull: { savedProperties: propertyId } },
  );

  // Optional: check if anything was actually removed
  if (result.modifiedCount === 0) {
    throw ApiError.notfound("property not found in saved list");
  }

  return { message: "property removed from saved" };
};

//#endregion

//#region

const ServiceHandleAddToShortListed = async ({
  clerkId,
  propertyId,
}: {
  clerkId: string;
  propertyId: string;
}) => {
  const result = await Tenant.updateOne(
    { clerkId },
    { $addToSet: { shortListedProperties: propertyId } },
  );

  if (result.matchedCount === 0) {
    throw ApiError.notfound("user not found");
  }

  return { message: "property added to shortlisted" };
};

const ServiceHandleRemoveFromShortListed = async ({
  clerkId,
  propertyId,
}: {
  clerkId: string;
  propertyId: string;
}) => {
  const result = await Tenant.updateOne(
    { clerkId },
    { $pull: { shortListedProperties: propertyId } },
  );

  if (result.matchedCount === 0) {
    throw ApiError.notfound("user not found");
  }

  if (result.modifiedCount === 0) {
    throw ApiError.notfound("property not in shortlisted");
  }

  return { message: "property removed from shortlisted" };
};

//#endregion

const ServiceHandleRequestVisit = async () => {};
const ServiceHandleCancelVisit = async () => {};
const ServiceHandleGetRecommendedProperties = async () => {};

export {
  ServiceHandleGetTenantProfile,
  ServiceHandleUpdateTenantPreferences,
  ServiceHandleSaveProperty,
  ServiceHandleRemoveSavedProperty,
  ServiceHandleAddToShortListed,
  ServiceHandleRemoveFromShortListed,
  ServiceHandleRequestVisit,
  ServiceHandleCancelVisit,
  ServiceHandleGetRecommendedProperties,
};
