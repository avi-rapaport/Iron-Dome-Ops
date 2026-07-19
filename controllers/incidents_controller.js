import { success } from "zod";
import { incidentsRepo } from "../repositories/incidents_repo.js";
import { incidentsService } from "../services/incidents_service.js";

async function createIncident(req, res) {
  const newIncident = req.body;
  const newId = await incidentsService.createIncident(newIncident);
  return res.status(201).json({
    success: true,
    message: `New incident created successsfully | new id: ${newId}`,
  });
}

async function getOpenIncidents(req, res) {
  const openIncidents = await incidentsService.getOpenIncidents();
  return res.json({ success: true, data: openIncidents });
}

async function updateIncidentStatus(req, res) {
  const id = req.params.id;
  if (!id || isNaN(id)) {
    const error = new Error("Invalid or missing ID!");
    error.statusCode = 400;
    throw error;
  }

  const newStatus = req.body;
  await incidentsService.updateIncidentStatus(Number(id), newStatus);

  return res.json({
    success: true,
    message: `Incident id ${id} updated successsfully`,
  });
}

export const incidentsController = {
  createIncident,
  updateIncidentStatus,
  getOpenIncidents,
};
