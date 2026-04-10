import type { Request, Response } from "express";
import TenantModel from "./tenant.model.js";

export class TenantController {
  public async handleTenantRegister(req: Request, res: Response) {
    console.log("cont", req.body);
    return res.status(201);
  }
}
