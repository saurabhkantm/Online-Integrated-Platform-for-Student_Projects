import express from "express";
import { getAdminOverview } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const adminRouter = express.Router();
adminRouter.get("/overview", authMiddleware, authorize("admin"), getAdminOverview);

export default adminRouter;