import "dotenv/config";
import express from "express";
import { router as operatorsRouter } from "./routes/operators_routes.js";
import { router as incidentsRouter } from "./routes/incidents_routes.js";
import { errorHandling } from "./middleware/validation_middleware.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/operators", operatorsRouter);
app.use("/incidents", incidentsRouter);
app.use((req, res) => res.status(404).json({ Message: "Route not found!" }));

app.use(errorHandling);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
