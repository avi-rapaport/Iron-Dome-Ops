import { z } from "zod";

export const operatorSchema = z.object({
  name: z.string().max(100),
  operator_rank: z.string().max(100),
});

export const incidentSchema = z.object({
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
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Internal server error";
  const errors = err.errors;

  if (errors && statusCode === 400) {
    return res
      .status(statusCode)
      .json({ Success: false, Message: message, errors: errors });
  }
  return res.status(statusCode).json({ Success: false, Message: message });
}
