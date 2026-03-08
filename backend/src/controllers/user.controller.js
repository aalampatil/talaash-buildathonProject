import {
  asyncHandler,
  ApiError,
  ApiResponse,
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/utils.js";
import { UserModel, TenantModel, LandlordModel } from "../models/models.js";
import { accessCookieOptions, refreshCookieOptions } from "../config/token.js";
import { generateAccessAndRefreshTokens } from "../config/token.js";

// export const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, mobile, role } = req.body;
//   if ([name, email, password, role].some((field) => field?.trim() === "")) {
//     throw new ApiError(400, "all fields are required");
//   }

//   const existedUser = await UserModel.findOne({ email });

//   if (existedUser) {
//     throw new ApiError(409, "User already exists");
//   }

//   const profileLocalPath = req.file?.path;

//   if (!profileLocalPath) {
//     throw new ApiError(401, "profile pciture is required");
//   }

//   let profilePicture;
//   let profilePicture_publicId;

//   if (profileLocalPath) {
//     const upload = await uploadOnCloudinary(profileLocalPath);
//     profilePicture = upload?.secure_url;
//     profilePicture_publicId = upload?.public_id;
//   }

//   const user = await UserModel.create({
//     name,
//     email,
//     password,
//     mobile,
//     role,
//     profilePicture,
//     profilePicture_publicId,
//   });

//   if (!user) {
//     throw new ApiError(500, "failed to creat user");
//   }

//   if (user.role === "tenant") {
//     await TenantModel.create({
//       userId: user._id,
//       profile: {
//         name,
//         email,
//         mobile,
//         profilePicture,
//         profilePicture_publicId,
//       },
//     });
//   }
//   if (user.role === "landlord")
//     await LandlordModel.create({
//       userId: user._id,
//       profile: {
//         name,
//         email,
//         mobile,
//         profilePicture,
//         profilePicture_publicId,
//       },
//     });

//   const createdUser = await UserModel.findById(user._id);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, createdUser, "User registered successfully"));
// });

// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email?.trim() || !password?.trim()) {
//     throw new ApiError(400, "Email and password are required");
//   }

//   const user = await UserModel.findOne({ email }).select("+password");

//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   const isPasswordValid = await user.isPasswordCorrect(password);

//   if (!isPasswordValid) {
//     throw new ApiError(401, "Invalid credentials");
//   }

//   const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
//     user._id,
//   );

//   user.refreshToken = refreshToken;
//   await user.save({ validateBeforeSave: false });

//   const loggedInUser = await UserModel.findById(user._id).select(
//     "-password -refreshToken",
//   );

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, accessCookieOptions)
//     .cookie("refreshToken", refreshToken, refreshCookieOptions)
//     .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
// });

export const logoutUser = asyncHandler(async (req, res) => {
  await UserModel.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true },
  );

  return res
    .status(200)
    .clearCookie("accessToken", accessCookieOptions)
    .clearCookie("refreshToken", refreshCookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  // console.log("user",user);

  if (!user) {
    throw new ApiError(401, {}, "user is not verified");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched"));
});

export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, mobile, email } = req.body;

  if (!name?.trim() || !mobile?.trim() || !email.trim()) {
    throw new ApiError(400, "All fields are required");
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { name, mobile, email },
    { new: true },
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Account updated successfully"));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Both passwords are required");
  }

  const user = await UserModel.findById(req.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export const updateProfilePicture = asyncHandler(async (req, res) => {
  const profileLocalPath = req.file?.path;

  if (!profileLocalPath) {
    throw new ApiError(400, "Profile image is required");
  }

  const user = await UserModel.findById(req.user._id);

  // delete old image from cloudinary
  if (user.profilePicture_publicId) {
    await deleteFromCloudinary(user.profilePicture_publicId);
  }

  const upload = await uploadOnCloudinary(profileLocalPath);

  user.profilePicture = upload.secure_url;
  user.profilePicture_publicId = upload.public_id;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  console.log("user.js", req.cookies);

  const incomingRefreshToken =
    req?.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorised request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_SECRET,
    );

    const user = await UserModel.findById(decodedToken?._id);
    // console.log(user)

    if (!user) {
      throw new ApiError(401, "unauthorised request");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "token expired or used before");
    }

    if (user.refreshTokenExpiresAt.getTime() < Number(Date.now())) {
      user.refreshToken = null;
      user.refreshTokenExpiresAt = null;
      await user.save();
      throw new ApiError(401, "session expired login again");
    } else {
      const { accessToken, refreshToken: newRefreshToken } =
        await generateAccessAndRefreshTokens(user._id);

      return res
        .status(200)
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", newRefreshToken, refreshCookieOptions)
        .json(new ApiResponse(200, "", "access token refreshed"));
    }
  } catch (error) {
    throw new ApiError(401, "invalid refresh Token/missing token");
  }
});
