import { incidentsRepo } from "../repositories/incidents_repo.js";

async function createIncident(newIncident) {
  const newId = await incidentsRepo.create(newIncident);
  return newId;
}

export const incidentsService = {
  createIncident,
};
