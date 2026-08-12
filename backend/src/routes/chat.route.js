import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { chatWithUser } from "../controllers/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/send",authMiddleware,chatWithUser);

export default chatRouter;