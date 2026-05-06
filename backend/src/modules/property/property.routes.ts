import { Router } from "express";
import { PropertyController } from "./property.controller.js";

export const propertyRouter = Router();

const controller = new PropertyController();

propertyRouter.get("/", controller.handleGetAllProperties);
propertyRouter.get("/search", controller.handleSearchProperties);
propertyRouter.get("/:propertyId", controller.handleGetProperty);
propertyRouter.patch(
  "/:propertyId/toggle",
  controller.handleTogglePropertyAvailability,
);
