import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import userModel from "../model/user.model.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me",authMiddleware,async(req,res)=>{
    const user = await userModel.findById(req.user.id).populate("organization");
    res.json(user);
})

export default authRouter;
