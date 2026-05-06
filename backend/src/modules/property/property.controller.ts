import type { Request, Response } from "express";
import { ApiResponse } from "../../common/utils/api-response.js";
import { requireParam } from "../../common/utils/validate-params.js";
import { wrapAsync } from "../../common/utils/wrap-async.js";
import {
  ServiceHandleGetAllProperties,
  ServiceHandleGetProperty,
  ServiceHandleSearchProperties,
  ServiceHandleTogglePropertyAvailability,
} from "./property.service.js";

export class PropertyController {
  public handleGetAllProperties = wrapAsync(
    async (_req: Request, res: Response) => {
      const response = await ServiceHandleGetAllProperties();
      return ApiResponse.ok(res, "Properties fetched successfully", response);
    },
  );

  public handleGetProperty = wrapAsync(async (req: Request, res: Response) => {
    const propertyId = requireParam(req.params.propertyId, "propertyId");
    const response = await ServiceHandleGetProperty(propertyId);
    return ApiResponse.ok(res, "Property fetched successfully", response);
  });

  public handleSearchProperties = wrapAsync(
    async (req: Request, res: Response) => {
      const search: {
        city?: string;
        rent?: string;
        propertyType?: string;
      } = {};

      if (typeof req.query.city === "string") search.city = req.query.city;
      if (typeof req.query.rent === "string") search.rent = req.query.rent;
      if (typeof req.query.propertyType === "string") {
        search.propertyType = req.query.propertyType;
      }

      const response = await ServiceHandleSearchProperties(search);

      return ApiResponse.ok(res, "Search results", response);
    },
  );

  public handleTogglePropertyAvailability = wrapAsync(
    async (req: Request, res: Response) => {
      const propertyId = requireParam(req.params.propertyId, "propertyId");
      const response = await ServiceHandleTogglePropertyAvailability(propertyId);
      return ApiResponse.ok(
        res,
        `Property marked as ${response.status}`,
        response,
      );
    },
  );
}
