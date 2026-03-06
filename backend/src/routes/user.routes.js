import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { accessCookieOptions, refreshCookieOptions } from "../config/token.js";
import passport from "passport";
import { isProduction } from "../config/env.js";

import {
  logoutUser,
  getCurrentUser,
  updateAccountDetails,
  changePassword,
  updateProfilePicture,
} from "../controllers/user.controller.js";

export const userRouter = Router();
console.log(isProduction);

// tenant login
userRouter.route("/google/tenant").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "tenant",
  }),
);

// landlord login
userRouter.route("/google/landlord").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "landlord",
  }),
);

userRouter.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: isProduction
      ? `${process.env.CLIENT}/login`
      : "http://localhost:5173/login",
    session: false,
  }),
  (req, res) => {
    const { accessToken, refreshToken } = req.user;
    // console.log("p", accessToken, refreshToken);
    res
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions);
    if (isProduction) {
      res.redirect(process.env.CLIENT);
    } else {
      res.redirect("http://localhost:5173/");
    }
  },
);

userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/me").get(verifyJWT, getCurrentUser);
userRouter.route("/update-account").patch(verifyJWT, updateAccountDetails);
userRouter.route("/change-password").patch(verifyJWT, changePassword);
userRouter
  .route("/update-profile")
  .patch(verifyJWT, upload.single("profilePicture"), updateProfilePicture);
