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
import { upload } from "../middlewares/multer.middleware.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

export const landlordRouter = Router();
landlordRouter.use(verifyJWT);

landlordRouter.get("/profile", getLandlordProfile);

landlordRouter.post(
  "/property",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image5", maxCount: 1 },
    { name: "image6", maxCount: 1 },
    { name: "image7", maxCount: 1 },
    { name: "image8", maxCount: 1 },
  ]),
  createProperty,
);

landlordRouter.delete("/property/:propertyId", deleteProperty);

landlordRouter.get("/property", getMyProperty);

landlordRouter.get("/visits", getVisitRequest);

landlordRouter.patch("/visit/approve/:visitId", approveVisit);

landlordRouter.patch("/visit/reject/:visitId", rejectVisit);
