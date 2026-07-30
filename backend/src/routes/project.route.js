import express from "express";
import createProject, {
  deleteProject,
  getAllProjects,
  getPublicProjects,
  getSingleProject,
  submitProject,
  updateProject,
} from "../controllers/project.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

console.log("Project routes loaded");

const projectRouter = express.Router();

projectRouter.get("/publicProjects",getPublicProjects);
projectRouter.post("/", authMiddleware, authorize("student"), createProject);
projectRouter.get(
  "/my-projects",
  authMiddleware,
  authorize("student"),
  getAllProjects,
);
projectRouter.get(
  "/:id",
  authMiddleware,
  authorize("student"),
  getSingleProject,
);
projectRouter.patch(
  "/update/:id",
  authMiddleware,
  authorize("student"),
  updateProject,
);
projectRouter.patch(
  "/:id/submit",
  authMiddleware,
  authorize("student"),
  submitProject,
);
projectRouter.delete(
  "/delete/:id",
  authMiddleware,
  authorize("student"),
  deleteProject,
);
export default projectRouter;
