import { Router } from "express";

// Controller imports
import { userRegister, userLogin } from "../controllers/user.controllers.js";

// Middleware imports
import { upload } from "../middlewares/fileUpload.middlewares.js";

const userRouter = Router();

// User register route.
userRouter.route("/register").post(
  upload.fields([
    { name: "avatarImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userRegister,
);

// User login route.
userRouter.route("/login").post(userLogin);

export default userRouter;
