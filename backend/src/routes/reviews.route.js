import express from "express";
import { getProjectreviews, updateoraddreview } from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const reviewRouter = express.Router();

reviewRouter.get("/:id",getProjectreviews);
reviewRouter.post("/:id",authMiddleware,updateoraddreview);

export default reviewRouter;