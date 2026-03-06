import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    googleId: {
      type: String,
      unique: true,
    },

    authProvider: {
      type: String,
      enum: ["google"],
      default: "google",
    },

    profilePicture: {
      type: String,
    },

    mobile: {
      type: String,
    },

    role: {
      type: String,
      enum: ["tenant", "landlord", "admin"],
      default: "tenant",
      required: true,
    },

    verified: {
      type: Boolean,
      default: true, // Google emails are already verified
    },

    refreshToken: {
      type: String,
      select: false,
    },

    refreshTokenExpiresAt: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

// Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

// Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
};

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
