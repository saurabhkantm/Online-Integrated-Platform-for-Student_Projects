import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export async function registerUser(req, res) {
  const { name, email, password, role, organization } = req.body;

  //  we have role as default role is student

  if (!name || !email || !password || !role || !organization) {
    return res.status(400).json({
      success: false,
      message: "All fields re required",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    // console.log(req.body);
    // console.log("Organization:", organization);

    const user = await userModel.create({
      name,
      email,
      password,
      role,
      organization,
    });

    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      success: true,
      message: "Registered Successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        organization: user.organization,
      },
    });
  } catch (error) {
    console.log("Error message: ", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found!",
      });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = createToken(user._id);
    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "Login Successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        organization: user.organization,
      },
    });
  } catch (error) {
    console.log("Error message : ", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
