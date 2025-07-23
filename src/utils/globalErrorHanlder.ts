import AppError from "./appError";
import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (
  err: AppError | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
};

export default globalErrorHandler;
