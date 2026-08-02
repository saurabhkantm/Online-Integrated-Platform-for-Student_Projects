import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import organizationRouter from "./routes/organization.route.js";
import projectRouter from "./routes/project.route.js";
import projectActivityRouter from "./routes/projectActivity.route.js";
import facultyRouter from "./routes/faculty.route.js";
import reviewRouter from "./routes/reviews.route.js";

const app = express();

app.use(cors({
  origin: "https://eduarchive-wheat.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/organizations", organizationRouter);
app.use("/api/projects", projectRouter);
app.use("/api/studentprojects",projectActivityRouter);
app.use("/api/faculty",facultyRouter);
app.use("/api/reviews",reviewRouter);

export default app;