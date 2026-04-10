import { Router } from "express";
import { TenantController } from "./tenant.controller.js";

const tenantRouter = Router();

const controller = new TenantController();

tenantRouter.post(
  "/register",
  controller.handleTenantRegister.bind(controller),
);

export default tenantRouter;
