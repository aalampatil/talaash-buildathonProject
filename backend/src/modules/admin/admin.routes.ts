import { Router } from "express";
import { AdminController } from "./admin.controller.js";

export const adminRouter = Router();

const controller = new AdminController();

adminRouter.get("/allProperties", controller.handleGetAllProperties);
adminRouter.get("/allLandlords", controller.handleGetAllLandlords);
adminRouter.get("/allUsers", controller.handleGetAllUsers);
