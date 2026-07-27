import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import organizationRouter from "./routes/organization.route.js";
import projectRouter from "./routes/project.route.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/organizations", organizationRouter);
app.use("/api/projects", projectRouter);

export default app;