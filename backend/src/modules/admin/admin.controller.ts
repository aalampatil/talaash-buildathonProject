import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { ApiResponse } from "../../common/utils/api-response.js";
import { wrapAsync } from "../../common/utils/wrap-async.js";
import ApiError from "../../common/utils/api-error.js";
import {
  ServiceHandleGetAllLandlords,
  ServiceHandleGetAllProperties,
  ServiceHandleGetAllUsers,
} from "./admin.service.js";

const requireClerkId = (req: Request) => {
  const { userId: clerkId } = getAuth(req);
  if (!clerkId) throw ApiError.unauthorised();
  return clerkId;
};

export class AdminController {
  public handleGetAllProperties = wrapAsync(
    async (req: Request, res: Response) => {
      const response = await ServiceHandleGetAllProperties(requireClerkId(req));
      return ApiResponse.ok(res, "All properties fetched", response);
    },
  );

  public handleGetAllLandlords = wrapAsync(
    async (req: Request, res: Response) => {
      const response = await ServiceHandleGetAllLandlords(requireClerkId(req));
      return ApiResponse.ok(res, "All landlords fetched", response);
    },
  );

  public handleGetAllUsers = wrapAsync(async (req: Request, res: Response) => {
    const response = await ServiceHandleGetAllUsers(requireClerkId(req));
    return ApiResponse.ok(res, "All users fetched", response);
  });
}
