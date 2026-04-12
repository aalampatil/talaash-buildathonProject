import ApiError from "../../common/utils/api-error.js";
import { Tenant, type TenantDocument } from "./tenant.model.js";

// ── Shared helper ─────────────────────────────────────────────────────────────

const getVerifiedTenant = async (clerkId: string) => {
  const tenant = await Tenant.findOne({ clerkId });
  if (!tenant) throw ApiError.notfound("Tenant not found");
  return tenant;
};

// ── Profile ───────────────────────────────────────────────────────────────────

const ServiceHandleGetTenantProfile = async (clerkId: string) => {
  const tenant = await Tenant.findOne({ clerkId }).populate("userId");
  if (!tenant) throw ApiError.notfound("Tenant not found");

  return {
    id: tenant._id,
    preferences: tenant.preferences,
    savedProperties: tenant.savedProperties,
    shortListedProperties: tenant.shortListedProperties,
  };
};

// ── Preferences ───────────────────────────────────────────────────────────────

const ServiceHandleUpdateTenantPreferences = async (
  data: Partial<TenantDocument>,
) => {
  const { clerkId, preferences } = data;
  if (!clerkId) throw ApiError.badRequest("clerkId is required");

  const tenant = await getVerifiedTenant(clerkId);

  if (preferences) {
    tenant.preferences = {
      ...(tenant.preferences || {}),
      ...preferences,
    };
  }

  await tenant.save({ validateBeforeSave: false });
  return { message: "preference updated" };
};

// ── Saved Properties ──────────────────────────────────────────────────────────

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

  if (result.matchedCount === 0) throw ApiError.notfound("User not found");

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

  if (result.matchedCount === 0) throw ApiError.notfound("User not found");
  if (result.modifiedCount === 0)
    throw ApiError.notfound("Property not found in saved list");

  return { message: "property removed from saved" };
};

// ── Shortlisted Properties ────────────────────────────────────────────────────

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

  if (result.matchedCount === 0) throw ApiError.notfound("User not found");

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

  if (result.matchedCount === 0) throw ApiError.notfound("User not found");
  if (result.modifiedCount === 0)
    throw ApiError.notfound("Property not in shortlisted");

  return { message: "property removed from shortlisted" };
};

// ── Stubs ─────────────────────────────────────────────────────────────────────

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
