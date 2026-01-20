import { v2 as cloudinary } from "cloudinary";
import { existsSync } from "node:fs";

import env from "../env.config.js";
import deleteFile from "./deleteFile.utils.js";
import logger from "../log.config.js";

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryAPIKey,
  api_secret: env.cloudinaryAPISecret,
});

async function uploadFileToCloud(localFilePath, updateImage = false, publicId) {
  if (!localFilePath || !existsSync(localFilePath)) {
    logger.error("File upload failed!, expected local file path.");
    return {
      success: false,
      status: 400,
      imageURL: null,
      error: "Expected local file path.",
    };
  }

  if (updateImage && !publicId) {
    logger.error(
      "File update failed!, expected public id of existing image to overwrite it.",
    );
    return {
      success: false,
      status: 400,
      imageURL: null,
      error: "Expected public id.",
    };
  }

  try {
    const { secure_url } = await cloudinary.uploader.upload(localFilePath, {
      overwrite: updateImage,
      public_id: publicId,
    });
    return {
      success: true,
      status: 201,
      imageURL: secure_url,
      error: "",
    };
  } catch (error) {
    logger.error(error?.message);
    return {
      success: false,
      status: 500,
      imageURL: null,
      error: error?.message,
    };
  } finally {
    deleteFile([localFilePath]);
  }
}

export default uploadFileToCloud;
