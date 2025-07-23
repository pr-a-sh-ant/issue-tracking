import { Metadata } from "@grpc/grpc-js";
import { Request, Response, NextFunction } from "express";
import AppError from "../../utils/appError";

export interface RequestWithMetadata extends Request {
  metadata?: Metadata;
}

const setMetadata = (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return next(new AppError("Authorization header is required", 401));
    }
    const metadata = new Metadata();
    metadata.add("authorization", req.headers.authorization || "");
    req.metadata = metadata;
    next();
  } catch (error) {
    return next(new AppError("Failed to set metadata", 500));
  }
};

export default setMetadata;
