import { Router } from "express";
import {
  getLandlordProfile,
  createProperty,
  deleteProperty,
  getMyProperty,
  getVisitRequest,
  approveVisit,
  rejectVisit,
} from "../controllers/landlord.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

export const landlordRouter = Router();
landlordRouter.use(verifyJWT);

landlordRouter.get("/profile", getLandlordProfile);

landlordRouter.post("/property", createProperty);

landlordRouter.delete("/property/:propertyId", deleteProperty);

landlordRouter.get("/property", getMyProperty);

landlordRouter.get("/visits", getVisitRequest);

landlordRouter.patch("/visit/approve/:visitId", approveVisit);

landlordRouter.patch("/visit/reject/:visitId", rejectVisit);
