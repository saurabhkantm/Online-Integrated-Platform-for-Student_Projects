import express from "express";
import {
  deleteUser,
    getAllUsers,
    toggleSuspendUser,
    updateUserRole,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const userRouter = express.Router();


userRouter.get("/all", authMiddleware, authorize("admin"), getAllUsers);
userRouter.patch("/:id/role", authMiddleware, authorize("admin"), updateUserRole);
userRouter.patch("/:id/suspend", authMiddleware, authorize("admin"), toggleSuspendUser);
userRouter.delete("/:id", authMiddleware, authorize("admin"), deleteUser);

export default userRouter;