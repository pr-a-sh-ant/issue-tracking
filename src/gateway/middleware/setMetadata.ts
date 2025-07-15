import { Metadata } from "@grpc/grpc-js";
import { Request, Response, NextFunction } from "express";

export interface RequestWithMetadata extends Request {
  metadata?: Metadata;
}

const setMetadata = (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Setting metadata for request");
    const metadata = new Metadata();
    metadata.add("authorization", req.headers.authorization || "");
    req.metadata = metadata;
    next();
  } catch (error) {
    console.error("Error setting metadata:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default setMetadata;
