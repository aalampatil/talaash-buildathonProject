import { Router } from "express";
import { TenantController } from "./tenant.controller.js";
import { requireAuth } from "@clerk/express";

export const tenantRouter = Router();

const controller = new TenantController();

tenantRouter.get(
  "/getTenant",
  controller.handleGetTenantProfile.bind(controller),
);
