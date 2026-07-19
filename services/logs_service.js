import { logsRepo } from "../repositories/logs_repo.js";

async function createLog(action, incidentId, operatorId, description) {
  const newLog = {
    action: action,
    incident_id: incidentId,
    operator_id: operatorId,
    description: description,
  };
  await logsRepo.create(newLog);
}

export const logsService = { createLog };
