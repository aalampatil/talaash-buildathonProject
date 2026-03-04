import { Router } from "express";

import {
  getAllProperties,
  getProperty,
  searchProperties,
  togglePropertyAvailablity,
} from "../controllers/property.controller.js";

export const propertyRouter = Router();

propertyRouter.get("/", getAllProperties);
propertyRouter.get("/search", searchProperties);
propertyRouter.get("/:propertyId", getProperty);
propertyRouter.patch("/:propertyId/toggle", togglePropertyAvailablity);
