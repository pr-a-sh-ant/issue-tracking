import { RequestWithMetadata } from "../middleware/setMetadata";
import { Response } from "express";
import { subTaskClient } from "../client";

const createSubTask = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { issueId } = req.params;
    const { task } = req.body;
    if (!issueId || !task) {
      return res.status(400).json({ error: "Issue ID and task are required" });
    }
    subTaskClient.CreateSubTask(
      { issueId, task },
      req.metadata,
      (error, response) => {
        if (error) {
          return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
        }

        return res.status(201).json({ message: response.message });
      }
    );
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

const completeSubTask = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { issueId, taskId } = req.params;
    if (!taskId) {
      return res
        .status(400)
        .json({ error: "Issue ID and task ID are required" });
    }
    subTaskClient.CompleteSubTask(
      { taskId, issueId },
      req.metadata,
      (error, response) => {
        if (error) {
          return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
        }
        return res.status(200).json({ message: response.message });
      }
    );
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

const subTaskViews = {
  createSubTask,
  completeSubTask,
};

export default subTaskViews;
