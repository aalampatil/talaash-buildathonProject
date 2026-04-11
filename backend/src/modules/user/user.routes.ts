import { Router } from "express";
import { UserController } from "./user.controller.js";

export const userRouter = Router();

const controller = new UserController();

userRouter.post("/register", controller.handleUserRegister.bind(controller));
