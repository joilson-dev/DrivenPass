import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export function validate(
  schema: ObjectSchema,
  location: "body" | "params" | "query" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[location];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      res.status(422).json({
        message: "Dados inválidos",
        details: error.details.map(d => d.message),
      });
      return;
    }

    next();
  };
}