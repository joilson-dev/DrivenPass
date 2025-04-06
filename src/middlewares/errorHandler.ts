import { Request, Response, NextFunction } from "express";

interface CustomError {
  type: string;
  message: string;
}

export function errorHandler(
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {

  const statusCodes: Record<string, number> = {
    Conflict: 409,
    NotFound: 404,
    InvalidData: 422,
  };

  const errorType = "type" in err ? err.type : "InternalError";
  const message = "message" in err ? err.message : "Erro interno do servidor";
  const statusCode = statusCodes[errorType] || 500;

  console.error(`[${errorType}] ${message}`);

  res.status(statusCode).json({ error: message });
}