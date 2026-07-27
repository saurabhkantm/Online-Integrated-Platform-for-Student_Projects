import express from "express";
import {
  createOrganization,
  getOrganizations,
} from "../controllers/organization.controller.js";

const organizationRouter = express.Router();

organizationRouter.post("/setOrg", createOrganization);
organizationRouter.get("/getOrg", getOrganizations);

export default organizationRouter;
