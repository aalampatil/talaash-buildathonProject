import type { Request, Response } from "express";
import { User, type UserDocument } from "../user/user.model.js";
import { Tenant } from "./tenant.model.js";
import { getAuth } from "@clerk/express";
import ApiError from "../../common/utils/api-error.js";

export class TenantController {
  public async handleGetTenantProfile(req: Request, res: Response) {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId });
    if (!user) throw ApiError.notfound("User not found");
    console.log(user);

    const tenant = await Tenant.findOne({ userId: user._id });
    console.log(tenant);
    if (!tenant) throw ApiError.notfound("Tenant not found");
    return res.json({ message: "ok", user });
  }

  public async handleUpdateTenantPreferences(req: Request, res: Response) {}
  public async handleSaveProperty(req: Request, res: Response) {}
  public async handleRemoveSavedProperty(req: Request, res: Response) {}
  public async handleAddToShortListed(req: Request, res: Response) {}
  public async handleRemoveFromShortListed(req: Request, res: Response) {}
  public async handleRequestVisit(req: Request, res: Response) {}
  public async handleCancelVisit(req: Request, res: Response) {}
  public async handleGetRecommendedProperties(req: Request, res: Response) {}
}
