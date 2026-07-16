import { operatorsSevice } from "../services/operators_service.js";

async function createOperator(req, res) {
  const newOperator = req.body;
  const newId = await operatorsSevice.createOperator(newOperator);
  return res.status(201).json({
    success: true,
    message: `New operator created successsdully | new id: ${newId}`,
  });
}

export const operatorsController = {
  createOperator,
};
