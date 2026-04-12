import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { ApiResponse } from "../../common/utils/api-response.js";
import {
  ServiceHandleAddToShortListed,
  ServiceHandleGetTenantProfile,
  ServiceHandleRemoveFromShortListed,
  ServiceHandleRemoveSavedProperty,
  ServiceHandleSaveProperty,
  ServiceHandleUpdateTenantPreferences,
  ServiceHandleRequestVisit,
  ServiceHandleCancelVisit,
  ServiceHandleGetRecommendedProperties,
} from "./tenant.service.js";
import ApiError from "../../common/utils/api-error.js";
import { wrapAsync } from "../../common/utils/wrap-async.js";
import { requireParam } from "../../common/utils/validate-params.js";

export class TenantController {
  public handleGetTenantProfile = wrapAsync(
    async (req: Request, res: Response) => {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId) throw ApiError.unauthorised();

      const response = await ServiceHandleGetTenantProfile(clerkId);
      return ApiResponse.ok(res, "profile fetched successfully", response);
    },
  );

  public handleUpdateTenantPreferences = wrapAsync(
    async (req: Request, res: Response) => {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId) throw ApiError.unauthorised();

      const response = await ServiceHandleUpdateTenantPreferences({
        clerkId,
        preferences: req.body.preferences,
      });
      return ApiResponse.ok(res, response.message, null);
    },
  );

  public handleSaveProperty = wrapAsync(async (req: Request, res: Response) => {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) throw ApiError.unauthorised();

    const propertyId = requireParam(req.params.propertyId, "propertyId");
    const response = await ServiceHandleSaveProperty({ clerkId, propertyId });
    return ApiResponse.ok(res, response.message, null);
  });

  public handleRemoveSavedProperty = wrapAsync(
    async (req: Request, res: Response) => {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId) throw ApiError.unauthorised();

      const propertyId = requireParam(req.params.propertyId, "propertyId");
      const response = await ServiceHandleRemoveSavedProperty({
        clerkId,
        propertyId,
      });
      return ApiResponse.ok(res, response.message, null);
    },
  );

  public handleAddToShortListed = wrapAsync(
    async (req: Request, res: Response) => {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId) throw ApiError.unauthorised();

      const propertyId = requireParam(req.params.propertyId, "propertyId");
      const response = await ServiceHandleAddToShortListed({
        clerkId,
        propertyId,
      });
      return ApiResponse.ok(res, response.message, null);
    },
  );

  public handleRemoveFromShortListed = wrapAsync(
    async (req: Request, res: Response) => {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId) throw ApiError.unauthorised();

      const propertyId = requireParam(req.params.propertyId, "propertyId");
      const response = await ServiceHandleRemoveFromShortListed({
        clerkId,
        propertyId,
      });
      return ApiResponse.ok(res, response.message, null);
    },
  );

  public handleRequestVisit = wrapAsync(async (req: Request, res: Response) => {
    throw ApiError.notImplemented("handleRequestVisit is not yet implemented");
  });

  public handleCancelVisit = wrapAsync(async (req: Request, res: Response) => {
    throw ApiError.notImplemented("handleCancelVisit is not yet implemented");
  });

  public handleGetRecommendedProperties = wrapAsync(
    async (req: Request, res: Response) => {
      throw ApiError.notImplemented(
        "handleGetRecommendedProperties is not yet implemented",
      );
    },
  );
}
