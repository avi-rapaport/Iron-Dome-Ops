import { z } from "zod";

export const operatorSchema = z.object({
  name: z.string().max(100),
  operator_rank: z.string().max(100),
});

export const createIncidentSchema = z.object({
  code_name: z.enum([
    "RED SKY",
    "BLACK FALCON",
    "IRON SHIELD",
    "NIGHT ARROW",
    "SILENT DOME",
  ]),
  threat_level: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  operator_id: z.number().int().positive(),
});

export const updateStatusSchema = z.object({
  status: z.enum(["OPEN", "TRACKING", "INTERCEPTED", "CLOSED"]),
});

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.format();
      const error = new Error("Valdiation failed check the fields!");
      error.statusCode = 400;
      error.errors = errors;
      return next(error);
    }
    req.body = result.data;
    next();
  };
}

export async function errorHandling(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.statusCode ? err.message : "Internal server error";
  let jsonResponse = { success: false, message: message };

  if (err.errors && statusCode === 400) {
    jsonResponse.errors = err.errors;
  }

  if (err.errno === 1452) {
    statusCode = 400;
    jsonResponse.message = "foreign key doesn't exist!";
  }
  console.log(err);
  return res.status(statusCode).json(jsonResponse);
}
