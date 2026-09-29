import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export async function authMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User must be logged In!",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decode.userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unauthorized Token",
    });
  }
}
