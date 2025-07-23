import { NextFunction, Router } from "express";
import { commentClient } from "../client";
import setMetadata from "../middleware/setMetadata";

import { RequestWithMetadata } from "../middleware/setMetadata";
import { Response } from "express";

import AppError from "../../utils/appError";

const commentRouter = Router();

commentRouter.use(setMetadata);

commentRouter.post(
  "/add-comment",
  async (req: RequestWithMetadata, res: Response, next: NextFunction) => {
    const { issueId, content } = req.body;
    if (!issueId || !content) {
      return next(new AppError("Issue ID and content are required", 400));
    }

    commentClient.CreateComment(
      { issueId, content },
      req.metadata,
      (error, response) => {
        if (error) {
          return next(
            new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
          );
        }
        res.status(201).json({
          message: response.message,
          created_at: response.createdAt,
        });
      }
    );
  }
);

export default commentRouter;
