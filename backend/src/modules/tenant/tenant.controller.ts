import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { ApiResponse } from "../../common/utils/api-response.js";
import {
  ServiceHandleAddToShortListed,
  ServiceHandleGetTenantProfile,
  ServiceHandleRemoveFromShortListed,
  ServiceHandleRemoveSavedProperty,
  ServiceHandleSaveProperty,
  ServiceHandleUpdateTenantProfile,
  ServiceHandleUpdateTenantPreferences,
  ServiceHandleRequestVisit,
  ServiceHandleCancelVisit,
  ServiceHandleGetTenantVisits,
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
        preferences: req.body.preferences ?? req.body,
      });
      return ApiResponse.ok(res, response.message, null);
    },
  );

  public handleUpdateTenantProfile = wrapAsync(
    async (req: Request, res: Response) => {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId) throw ApiError.unauthorised();

      const response = await ServiceHandleUpdateTenantProfile({
        clerkId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone ?? req.body.mobile,
      });

      return ApiResponse.ok(res, "Profile updated successfully", response);
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
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) throw ApiError.unauthorised("Authentication required");

    const { propertyId, visitDate, message } = req.body;

    if (!propertyId || !visitDate) {
      throw ApiError.badRequest("propertyId and visitDate are required");
    }

    const visit = await ServiceHandleRequestVisit({
      clerkId,
      propertyId,
      visitDate,
      message,
    });

    return ApiResponse.created(res, "Visit requested successfully", visit);
  });

  public handleCancelVisit = wrapAsync(async (req: Request, res: Response) => {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) throw ApiError.unauthorised("Authentication required");

    const visitId = requireParam(req.params.visitId, "visitId");

    const result = await ServiceHandleCancelVisit({
      visitId,
      clerkId,
    });

    return ApiResponse.ok(res, result.message, { visitId: result.visitId });
  });

  public handleGetTenantVisits = wrapAsync(async (req: Request, res: Response) => {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) throw ApiError.unauthorised();

    const response = await ServiceHandleGetTenantVisits(clerkId);
    return ApiResponse.ok(res, "visits fetched successfully", response);
  });

  public handleGetRecommendedProperties = wrapAsync(
    async (req: Request, res: Response) => {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId) throw ApiError.unauthorised();

      const response = await ServiceHandleGetRecommendedProperties(clerkId);
      return ApiResponse.ok(
        res,
        "recommended properties fetched successfully",
        response ?? null,
      );
    },
  );
}
