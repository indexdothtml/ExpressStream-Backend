import { existsSync } from "node:fs";

// Utilites imports
import asyncHandler from "../utils/asyncHandler.utils.js";
import APIResponse from "../utils/apiResponse.utils.js";
import APIErrorResponse from "../utils/apiError.utils.js";
import deleteFile from "../utils/deleteFile.utils.js";
import uploadFileToCloud from "../utils/cloudinaryFileUpload.utils.js";

// Constant imports
import { emailRegex, passwordRegex } from "../constants.js";

// Model imports
import { User } from "../models/user.models.js";

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  const avatarImageLocalPath = req?.files?.avatarImage?.[0]?.path;
  const coverImageLocalPath = req?.files?.coverImage?.[0]?.path;

  if (!existsSync(avatarImageLocalPath)) {
    return res
      .status(400)
      .json(new APIErrorResponse(400, "Avatar image is required."));
  }

  // Validate if username, email, fullName and password fields values are provided.
  if (
    [username, email, fullName, password].some(
      (field) => !field || field?.toString().trim() === "",
    )
  ) {
    // Deleting locally uploaded files
    deleteFile([avatarImageLocalPath, coverImageLocalPath]);
    return res
      .status(400)
      .json(new APIErrorResponse(400, "Please provide correct values."));
  }

  // Validate email rule.
  if (!emailRegex.test(email)) {
    // Deleting locally uploaded files
    deleteFile([avatarImageLocalPath, coverImageLocalPath]);
    return res
      .status(400)
      .json(new APIErrorResponse(400, "Please provide valid email address."));
  }

  // Validate password rule.
  if (!passwordRegex.test(password)) {
    // Deleting locally uploaded files
    deleteFile([avatarImageLocalPath, coverImageLocalPath]);
    return res
      .status(400)
      .json(
        new APIErrorResponse(
          400,
          "Please provide valid password, password should match the given rule.",
        ),
      );
  }

  // Validate if user already exist with given credentials.
  // Query user document with username and email.
  const user = await User.findOne({
    $or: [{ username }, { email }],
  }).exec();

  if (user) {
    // Deleting locally uploaded files
    deleteFile([avatarImageLocalPath, coverImageLocalPath]);
    return res
      .status(409)
      .json(
        new APIErrorResponse(
          409,
          "User with given credentials is already exist.",
        ),
      );
  }

  // Upload avatar image and cover image (if present) to cloud.
  const avatarImageFileUploadResponse =
    await uploadFileToCloud(avatarImageLocalPath);
  const coverImageFileUploadResponse = coverImageLocalPath
    ? await uploadFileToCloud(coverImageLocalPath)
    : "";

  // Validate if avatar image is successfully uploaded.
  if (!avatarImageFileUploadResponse.success) {
    return res
      .status(avatarImageFileUploadResponse.status)
      .json(
        new APIErrorResponse(
          avatarImageFileUploadResponse.status,
          avatarImageFileUploadResponse.error,
        ),
      );
  }

  // Validate if cover image is successfully uploaded if cover image is given by user.
  if (
    coverImageFileUploadResponse !== "" &&
    !coverImageFileUploadResponse.success
  ) {
    return res
      .status(coverImageFileUploadResponse.status)
      .json(
        new APIErrorResponse(
          coverImageFileUploadResponse.status,
          coverImageFileUploadResponse.error,
        ),
      );
  }

  // New user saved in db.
  const newUser = await User.create({
    username,
    email,
    fullName,
    password,
    avatarImage: avatarImageFileUploadResponse?.imageURL,
    coverImage: coverImageFileUploadResponse?.imageURL || "",
  });

  // Response returned.
  res.status(201).json(
    new APIResponse(201, "New user is registered.", {
      username: newUser.username,
      email: newUser.email,
      fullName: newUser.fullName,
      avatarImage: newUser.avatarImage,
      coverImage: newUser.coverImage,
    }),
  );
});

export { userRegister };
