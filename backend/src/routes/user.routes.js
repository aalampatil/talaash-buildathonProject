import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/me").get(verifyJWT, getCurrentUser);
userRouter.route("/update-account").patch(verifyJWT, updateAccountDetails);
userRouter.route("/change-password").patch(verifyJWT, changePassword);
userRouter
  .route("/update-profile")
  .patch(verifyJWT, upload.single("profilePicture"), updateProfilePicture);
