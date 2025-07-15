import { Router } from "express";
import { commentClient } from "../client";
import setMetadata from "../middleware/setMetadata";

import { RequestWithMetadata } from "../middleware/setMetadata";
import { Response } from "express";

const commentRouter = Router();

commentRouter.use(setMetadata);

commentRouter.post(
  "/add-comment",
  async (req: RequestWithMetadata, res: Response) => {
    try {
      const { issueId, content } = req.body;
      if (!issueId || !content) {
        return res
          .status(400)
          .json({ error: "Issue ID and content are required" });
      }

      commentClient.CreateComment(
        { issueId, content },
        req.metadata,
        (error, response) => {
          if (error) {
            return res
              .status(500)
              .json({ error: error.message || "Internal Server Error" });
          }
          res.status(201).json({
            message: response.message,
            created_at: response.createdAt,
          });
        }
      );
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }
);

export default commentRouter;
