import { operatorsRepo } from "../repositories/operators_repo.js";

async function createOperator(newOperator) {
  const newId = await operatorsRepo.create(newOperator);
  return newId;
}

export const operatorsSevice = {
  createOperator,
};
