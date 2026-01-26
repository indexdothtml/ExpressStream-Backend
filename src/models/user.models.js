import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import env from "../env.config.js";

const userSchema = new mongoose.Schema(
  {
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatarImage: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

// Encrypt password before save.
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Method to check password.
userSchema.methods.checkPassword = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

// Method to create access token.
userSchema.methods.createAccessToken = function () {
  return jwt.sign({ _id: this._id }, env.accessTokenSecret, {
    expiresIn: env.accessTokenExpiry,
  });
};

// Method to create refresh token.
userSchema.methods.createRefreshToken = function () {
  return jwt.sign({ _id: this._id }, env.refreshTokenSecret, {
    expiresIn: env.refreshTokenExpiry,
  });
};

export const User = mongoose.model("User", userSchema);
