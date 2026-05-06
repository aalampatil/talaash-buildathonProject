import { Router } from "express";
import { UserController } from "./user.controller.js";
import { wrapAsync } from "../../common/utils/wrap-async.js";

export const userRouter = Router();

const controller = new UserController();

userRouter.get("/me", wrapAsync(controller.handleGetUser.bind(controller)));
userRouter.get("/getUser", wrapAsync(controller.handleGetUser.bind(controller)));
