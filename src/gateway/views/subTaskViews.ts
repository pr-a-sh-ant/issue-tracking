import { RequestWithMetadata } from "../middleware/setMetadata";
import { Response, NextFunction } from "express";
import { subTaskClient } from "../client";
import AppError from "../../utils/appError";

const createSubTask = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { issueId } = req.params;
  const { task } = req.body;
  if (!issueId || !task) {
    return next(new AppError("Issue ID and task are required", 400));
  }
  subTaskClient.CreateSubTask(
    { issueId, task },
    req.metadata,
    (error, response) => {
      if (error) {
        return next(
          new AppError(
            error.message || "Internal Server Error",
            AppError.mapGRPCCodeToHTTP(error.code)
          )
        );
      }

      return res.status(201).json({ message: response.message });
    }
  );
};

const completeSubTask = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { issueId, taskId } = req.params;
  if (!taskId) {
    return next(new AppError("Task ID is required", 400));
  }
  subTaskClient.CompleteSubTask(
    { taskId, issueId },
    req.metadata,
    (error, response) => {
      if (error) {
        return next(
          new AppError(
            error.message || "Internal Server Error",
            AppError.mapGRPCCodeToHTTP(error.code)
          )
        );
      }
      return res.status(200).json({ message: response.message });
    }
  );
};

const subTaskViews = {
  createSubTask,
  completeSubTask,
};

export default subTaskViews;
