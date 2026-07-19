import express from "express";
import { incidentsController } from "../controllers/incidents_controller.js";
import {
  validateBody,
  createIncidentSchema,
  updateStatusSchema,
} from "../middleware/validation_middleware.js";
import { incidentsRepo } from "../repositories/incidents_repo.js";

export const router = express.Router();

router.post(
  "/",
  validateBody(createIncidentSchema),
  incidentsController.createIncident,
);

router.patch(
  "/:id/status",
  validateBody(updateStatusSchema),
  incidentsController.updateIncidentStatus,
);
