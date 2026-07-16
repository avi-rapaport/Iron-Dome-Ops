import express from "express";
import { incidentsController } from "../controllers/incidents_controller.js";
import {
  validateBody,
  incidentSchema,
} from "../middleware/validation_middleware.js";

export const router = express.Router();

router.post(
  "/",
  validateBody(incidentSchema),
  incidentsController.createIncident,
);
