import { incidentsRepo } from "../repositories/incidents_repo.js";

async function createIncident(newIncident) {
  const newId = await incidentsRepo.create(newIncident);
  return newId;
}

async function getOpenIncidents() {
  const result = await incidentsRepo.find({ status: "OPEN" });
  return result;
}

async function getIncidentById(id) {
  const incident = await incidentsRepo.findById(id);
  return incident;
}

async function updateIncidentStatus(id, newStatus) {
  const incidentToUpdate = await incidentsRepo.findById(id);
  if (!incidentToUpdate) {
    const error = new Error(`Incident with id ${id} not found!`);
    error.statusCode = 404;
    throw error;
  }
  await incidentsRepo.update(id, newStatus);
}

export const incidentsService = {
  createIncident,
  getOpenIncidents,
  getIncidentById,
  updateIncidentStatus,
};
