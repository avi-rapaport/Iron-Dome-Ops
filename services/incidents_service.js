import { incidentsRepo } from "../repositories/incidents_repo.js";

async function createIncident(newIncident) {
  const newId = await incidentsRepo.create(newIncident);
  return newId;
}

async function getIncidents() {
  const incidents = await incidentsRepo.get();
  return incidents;
}

export const incidentsService = {
  createIncident,
  getIncidents,
};
