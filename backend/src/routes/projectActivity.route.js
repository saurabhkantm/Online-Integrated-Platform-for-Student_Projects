import express from "express";
import {
  addProjectUpdate,
  getProjectTimeline,
  getLeaderboard
} from "../controllers/projectActivity.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const projectActivityRouter = express.Router();

projectActivityRouter.post(
  "/:id/activities/updates",
  authMiddleware,
  authorize("student"),
  addProjectUpdate,
);

projectActivityRouter.get("/leaderboard",getLeaderboard);
 

projectActivityRouter.get(
  "/:id/activities/timeline",
  authMiddleware,
  authorize("student"),
  getProjectTimeline,
);

export default projectActivityRouter;
