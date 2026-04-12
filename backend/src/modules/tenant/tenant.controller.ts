import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { ApiResponse } from "../../common/utils/api-response.js";
import {
  ServiceHandleAddToShortListed,
  ServiceHandleGetTenantProfile,
  ServiceHandleRemoveFromShortListed,
  ServiceHandleRemoveSavedProperty,
  ServiceHandleSaveProperty,
  ServiceHandleUpdateTenantPreferences,
} from "./tenant.service.js";
import ApiError from "../../common/utils/api-error.js";

export class TenantController {
  public async handleGetTenantProfile(req: Request, res: Response) {
    const { clerkId } = req.body;
    const response = await ServiceHandleGetTenantProfile(clerkId);
    return ApiResponse.ok(res, "profile fetched successfully", response);
  }

  public async handleUpdateTenantPreferences(req: Request, res: Response) {
    const response = await ServiceHandleUpdateTenantPreferences(req.body);
    return ApiResponse.ok(res, response.message, null);
  }

  public async handleSaveProperty(req: Request, res: Response) {
    const { clerkId } = req.body;
    const { propertyId } = req.params;
    if (!propertyId || Array.isArray(propertyId)) {
      return ApiError.badRequest("Invalid propertyId");
    }
    const response = await ServiceHandleSaveProperty({ clerkId, propertyId });
    return ApiResponse.ok(res, response.message, null);
  }

  public async handleRemoveSavedProperty(req: Request, res: Response) {
    const { clerkId } = req.body;
    const { propertyId } = req.params;
    if (!propertyId || Array.isArray(propertyId)) {
      return ApiError.badRequest("Invalid propertyId");
    }
    const response = await ServiceHandleRemoveSavedProperty({
      clerkId,
      propertyId,
    });
    return ApiResponse.ok(res, response.message, null);
  }

  public async handleAddToShortListed(req: Request, res: Response) {
    const { clerkId } = req.body;
    const { propertyId } = req.params;
    if (!propertyId || Array.isArray(propertyId)) {
      return ApiError.badRequest("Invalid propertyId");
    }
    const response = await ServiceHandleAddToShortListed({
      clerkId,
      propertyId,
    });
    return ApiResponse.ok(res, response.message, null);
  }

  public async handleRemoveFromShortListed(req: Request, res: Response) {
    const { clerkId } = req.body;
    const { propertyId } = req.params;
    if (!propertyId || Array.isArray(propertyId)) {
      return ApiError.badRequest("Invalid propertyId");
    }
    const response = await ServiceHandleRemoveFromShortListed({
      clerkId,
      propertyId,
    });
    return ApiResponse.ok(res, response.message, null);
  }

  public async handleRequestVisit(req: Request, res: Response) {}

  public async handleCancelVisit(req: Request, res: Response) {}

  public async handleGetRecommendedProperties(req: Request, res: Response) {}
}
