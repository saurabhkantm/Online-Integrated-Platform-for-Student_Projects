import express from "express";
import authorize from "../middleware/authorize.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAssignedProjects,
  getProjectDetails,
  reviewProject,
} from "../controllers/faculty.controller.js";

const facultyRouter = express.Router();

facultyRouter.get(
  "/projects",
  authMiddleware,
  authorize("faculty"),
  getAssignedProjects,
);

facultyRouter.get(
  "/project/:id",
  authMiddleware,
  authorize("faculty"),
  getProjectDetails,
);

facultyRouter.patch(
  "/project/:id/review",
  authMiddleware,
  authorize("faculty"),
  reviewProject,
);
export default facultyRouter;
