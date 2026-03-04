import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { requireAuth } from "@clerk/express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAccountDetails,
  changePassword,
  updateProfilePicture,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter
  .route("/register")
  .post(upload.single("profilePicture"), registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(requireAuth(), logoutUser);
userRouter.route("/me").get(requireAuth(), getCurrentUser);
userRouter.route("/update-account").patch(requireAuth(), updateAccountDetails);
userRouter.route("/change-password").patch(requireAuth(), changePassword);
userRouter
  .route("/update-profile")
  .patch(requireAuth(), upload.single("profilePicture"), updateProfilePicture);
