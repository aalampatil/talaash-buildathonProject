import type { Request, Response } from "express";
import { Tenant } from "./tenant.model.js";
import { getAuth } from "@clerk/express";

export class TenantController {
  public async handleTenantRegister(req: Request, res: Response) {
    console.log("cont", req.body);
    return res.status(201);
  }
  public async handleGetTenantProfile(req: Request, res: Response) {}
  public async handleUpdateTenantPreferences(req: Request, res: Response) {}
  public async handleSaveProperty(req: Request, res: Response) {}
  public async handleRemoveSavedProperty(req: Request, res: Response) {}
  public async handleAddToShortListed(req: Request, res: Response) {}
  public async handleRemoveFromShortListed(req: Request, res: Response) {}
  public async handleRequestVisit(req: Request, res: Response) {}
  public async handleCancelVisit(req: Request, res: Response) {}
  public async handleGetRecommendedProperties(req: Request, res: Response) {}
}
