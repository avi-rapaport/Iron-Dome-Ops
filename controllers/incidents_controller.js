import { incidentsService } from "../services/incidents_service.js";

async function createIncident(req, res) {
  const newIncident = req.body;
  const newId = await incidentsService.createIncident(newIncident);
  return res.status(201).json({
    success: true,
    message: `New incident created successsdully | new id: ${newId}`,
  });
}

export const incidentsController = {
  createIncident,
};
