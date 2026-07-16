import express from "express";
import {
  addProjectUpdate,
  getProjectTimeline,
} from "../controllers/projectActivity.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const projectActivityRouter = express.Router();

projectActivityRouter.post(
  "/:id/activities",
  authMiddleware,
  authorize("student"),
  addProjectUpdate,
);

projectActivityRouter.get(
  "/:id/activities",
  authMiddleware,
  authorize("student"),
  getProjectTimeline,
);

export default projectActivityRouter;
