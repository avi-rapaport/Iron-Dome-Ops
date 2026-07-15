import { z } from "zod";

export const operatorSchema = z.object({
  name: z.string().max(100),
  operator_rank: z.string().max(100),
});

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = new Error("Valdiation failed check the fields!");
      error.statusCode = 400;
      throw error;
    }
    req.body = result.data;
    next();
  };
}

export async function errorHandling(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Internal server error";

  return res.status(statusCode).json({ Success: false, Message: message });
}
