import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import { env } from "../../env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const removeLocalFile = (path: string) => {
  if (fs.existsSync(path)) fs.unlinkSync(path);
};

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    removeLocalFile(localFilePath);
    return uploadResponse;
  } catch (error) {
    removeLocalFile(localFilePath);
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

const deleteFromCloudinary = async (publicId: string) => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
};

export { deleteFromCloudinary, uploadOnCloudinary };
