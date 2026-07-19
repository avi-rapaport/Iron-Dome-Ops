import { incidentsRepo } from "../repositories/incidents_repo.js";

async function createIncident(newIncident) {
  const newId = await incidentsRepo.create(newIncident);
  return newId;
}

async function getIncidentById(id) {
  const incident = await incidentsRepo.getById(id);
  return incident;
}

async function updateIncidentStatus(id, newStatus) {
  const incidentToUpdate = await incidentsRepo.getById(id);
  if (!incidentToUpdate) {
    const error = new Error(`Incident with id ${id} not found!`);
    error.statusCode = 404;
    throw error;
  }
  await incidentsRepo.update(id, newStatus);
}

export const incidentsService = {
  createIncident,
  getIncidentById,
  updateIncidentStatus,
};
