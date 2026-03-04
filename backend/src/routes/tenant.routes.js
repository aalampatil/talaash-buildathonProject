import { Router } from "express";

import {
  getTenantProfile,
  updateTenantProfile,
  updateTenantPreferance,
  saveProperty,
  removeSavedProperty,
  getRecommendedProperties,
  requestVisit,
  cancelVisit,
} from "../controllers/tenant.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

export const tenantRouter = Router();

tenantRouter.use(verifyJWT);
tenantRouter.get("/profile", getTenantProfile);
tenantRouter.patch("/profile/update", updateTenantProfile);
tenantRouter.patch("/preferences", updateTenantPreferance);
tenantRouter.post("/save-property/:propertyId", saveProperty);
tenantRouter.delete("/remove-property/:propertyId", removeSavedProperty);
tenantRouter.get("/recommended-properties", getRecommendedProperties);
tenantRouter.post("/request-visit", requestVisit);
tenantRouter.delete("/cancel-visit/:visitId", cancelVisit);
