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
  maxAge: 24 * 60 * 60 * 1000, // 1d
  path: "/",
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction ? true : false,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  path: "/",
};
