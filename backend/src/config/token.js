import { isProduction } from "./env.js";
import { ApiError } from "../utils/utils.js";
import { UserModel } from "../models/user.model.js";

export const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token",
    );
  }
};

export const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction ? true : false, // true in production
  sameSite: isProduction ? "none" : "lax",
  maxAge: 1 * 60 * 1000, // 5 minutes
  path: "/",
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction ? true : false,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 30 * 60 * 1000, // 30 min
  path: "/",
};
