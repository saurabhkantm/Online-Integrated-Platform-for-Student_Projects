import express from "express";
import {
  createOrganization,
  deleteOrganization,
  getOrganizations,
  updateOrganization,
} from "../controllers/organization.controller.js";

const organizationRouter = express.Router();

organizationRouter.post("/setOrg", createOrganization);
organizationRouter.get("/getOrg", getOrganizations);
organizationRouter.delete("/:id",deleteOrganization);
organizationRouter.put("/:id", updateOrganization);

export default organizationRouter;
