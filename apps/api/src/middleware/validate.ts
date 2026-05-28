import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

/** Validate `req.body` against a Zod schema, replacing it with the parsed value. */
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: {
          message: "Validation failed",
          details: result.error.flatten(),
        },
      });
    }
    req.body = result.data;
    next();
  };
}
