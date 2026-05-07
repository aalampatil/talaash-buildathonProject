import type { Request, Response } from "express";
import ApiError from "../../common/utils/api-error.js";
import { getAuth } from "@clerk/express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { ApiResponse } from "../../common/utils/api-response.js";
import {
  becomeLandlord,
  handleClerkWebhookEvent,
  syncUserFromClerkId,
} from "./user.service.js";
import { env } from "../../env.js";

export class UserController {
  public async handleClerkWebhook(req: Request, res: Response) {
    try {
      const event = await verifyWebhook(req, {
        signingSecret: env.CLERK_WEBHOOK_SIGNING_SECRET,
      });

      await handleClerkWebhookEvent(event);
      return ApiResponse.ok(res, "webhook received", null);
    } catch (error) {
      console.error("Clerk webhook verification failed:", error);
      throw ApiError.badRequest("Invalid Clerk webhook");
    }
  }

  public async handleGetUser(req: Request, res: Response) {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) throw ApiError.unauthorised();

    const user = await syncUserFromClerkId(clerkId);
    if (!user) throw ApiError.notfound("User has no primary email in Clerk");

    return ApiResponse.ok(res, "user fetched successfully", user);
  }

  public async handleBecomeLandlord(req: Request, res: Response) {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) throw ApiError.unauthorised();

    const user = await becomeLandlord(clerkId);
    return ApiResponse.ok(res, "landlord account activated", user);
  }
}
