import { NextFunction, Router } from "express";
import setMetadata from "../middleware/setMetadata";
import { auditLogClient } from "../client";
import { RequestWithMetadata } from "../middleware/setMetadata";
import { Response } from "express";

import AppError from "../../utils/appError";

const auditLogRouter = Router();

auditLogRouter.use(setMetadata);

auditLogRouter.get(
  "/getAll",
  async (req: RequestWithMetadata, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = req.body || { page: 1, limit: 10 };
      const metadata = req.metadata;
      auditLogClient.GetLogEvents(
        { limit: limit.toString(), page: page.toString() },
        metadata,
        (error, response) => {
          if (error) {
            return new AppError(
              error.message,
              AppError.mapGRPCCodeToHTTP(error.code)
            );
          }
          res.status(200).json({
            message: "Audit logs retrieved successfully",
            logs: response.logEvents,
          });
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default auditLogRouter;
