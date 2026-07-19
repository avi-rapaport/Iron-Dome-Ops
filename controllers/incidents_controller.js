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

async function updateIncidentStatus(req, res) {
  const id = Number(req.params.id);
  const newStatus = req.body;
  await incidentsService.updateIncidentStatus(id, newStatus);

  return res.json({
    success: true,
    message: `Incident id ${id} updated successsfully`,
  });
}

export const incidentsController = {
  createIncident,
  updateIncidentStatus,
};
