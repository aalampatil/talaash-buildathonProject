import { Router } from "express";
import { TenantController } from "./tenant.controller.js";

export const tenantRouter = Router();

const controller = new TenantController();

tenantRouter.get(
  "/profile",
  controller.handleGetTenantProfile.bind(controller),
);
tenantRouter.get(
  "/getTenant",
  controller.handleGetTenantProfile.bind(controller),
);
tenantRouter.patch(
  "/profile/update",
  controller.handleUpdateTenantProfile.bind(controller),
);
tenantRouter.put(
  "/preferences",
  controller.handleUpdateTenantPreferences.bind(controller),
);
tenantRouter.patch(
  "/preferences",
  controller.handleUpdateTenantPreferences.bind(controller),
);
tenantRouter.post(
  "/save-property/:propertyId",
  controller.handleSaveProperty.bind(controller),
);
tenantRouter.post(
  "/remove-property/:propertyId",
  controller.handleRemoveSavedProperty.bind(controller),
);
tenantRouter.delete(
  "/remove-property/:propertyId",
  controller.handleRemoveSavedProperty.bind(controller),
);
tenantRouter.post(
  "/shortlist-property/:propertyId",
  controller.handleAddToShortListed.bind(controller),
);
tenantRouter.post(
  "/remove-shortlist/:propertyId",
  controller.handleRemoveFromShortListed.bind(controller),
);
tenantRouter.get("/visits", controller.handleGetTenantVisits.bind(controller));
tenantRouter.get(
  "/recommended-properties",
  controller.handleGetRecommendedProperties.bind(controller),
);
tenantRouter.post(
  "/request-visit",
  controller.handleRequestVisit.bind(controller),
);
tenantRouter.post(
  "/cancel-visit/:visitId",
  controller.handleCancelVisit.bind(controller),
);
tenantRouter.delete(
  "/cancel-visit/:visitId",
  controller.handleCancelVisit.bind(controller),
);
