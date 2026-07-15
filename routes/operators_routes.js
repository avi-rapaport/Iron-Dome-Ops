import { operatorsController } from "../controllers/operators_controller.js";
import express from "express";
import {
  operatorSchema,
  validateBody,
} from "../middleware/validation_middleware.js";

export const router = express.Router();

router.post(
  "/",
  validateBody(operatorSchema),
  operatorsController.createOperator,
);
