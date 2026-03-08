import { ApiError } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const verifyJWT = async (req, _, next) => {
  console.log(req.cookies);

  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "unauthroised req");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "invalid or expired token");
    //this error will show up, when a req to refresh token hit, as at that time, req only conatins refresh token not access token because access token is not passed on to frontend
  }
};
