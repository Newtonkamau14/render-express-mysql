import { type NextFunction, type Request, type Response } from "express";

import ErrorResponse from "../interfaces/ErrorResponse";
import { ZodError, ZodObject } from "zod";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

export const validateRequest =
  (validator: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validator.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({ message: error.issues[0].message });
      }

      return res.status(500).send("Error making request,contact support");
    }
  };
