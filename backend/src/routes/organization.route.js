import express from "express";
import {
  createOrganization,
  getOrganizations,
} from "../controllers/organization.controller.js";

const organizationRouter = express.Router();

organizationRouter.post("/", createOrganization);
organizationRouter.get("/", getOrganizations);

export default organizationRouter;
