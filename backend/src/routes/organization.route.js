import express from "express";
import {
  createOrganization,
  deleteOrganization,
  getOrganizations,
} from "../controllers/organization.controller.js";

const organizationRouter = express.Router();

organizationRouter.post("/setOrg", createOrganization);
organizationRouter.get("/getOrg", getOrganizations);
organizationRouter.post("/:id",deleteOrganization);

export default organizationRouter;
