import { Router } from "express";
import {
  getAllProperties,
  getAllLandlords,
  getAllUsers,
} from "../controllers/admin.controller.js";

export const adminRouter = Router();

adminRouter.get("/allProperties", getAllProperties);
adminRouter.get("/allLandlords", getAllLandlords);
adminRouter.get("/allUsers", getAllUsers);
