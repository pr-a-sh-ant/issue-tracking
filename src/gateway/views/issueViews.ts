import { issueClient } from "../client";
import { Response } from "express";
import { RequestWithMetadata } from "../middleware/setMetadata";
import { StatusEnum } from "../../proto/issue/StatusEnum";
import { ImpactEnum } from "../../proto/issue/ImpactEnum";
import { UrgencyEnum } from "../../proto/issue/UrgencyEnum";
import formatComments from "../../utils/formatComment";

const createIssue = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { title, description, impact, urgency } = req.body;
    if (!title || !description || !urgency || !impact) {
      return res.status(400).json({ error: "All fields are required" });
    }

    issueClient.CreateIssue(
      { description, impact, title, urgency },
      req.metadata,
      (error, response) => {
        if (error) {
          return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
        }
        res.status(201).json({
          message: response.message,
          issue: response.issueId,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const getIssue = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { issueId } = req.params;
    if (!issueId) {
      return res.status(400).json({ error: "Issue ID is required" });
    }
    issueClient.GetIssue({ issueId }, req.metadata, (error, response) => {
      if (error) {
        return res
          .status(500)
          .json({ error: error.message || "Internal Server Error" });
      }

      const fomatedComment = formatComments(response.comments);
      response.comments = fomatedComment;
      res.status(200).json(response);
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const listIssues = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { page, limit } = req.body || { page: 1, limit: 10 };
    issueClient.ListIssuesByUser(
      {
        page,
        limit,
      },
      req.metadata,
      (error, response) => {
        if (error) {
          return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
        }
        res.status(200).json(response);
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const getAllIssues = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { page, limit } = req.body || { page: 1, limit: 10 };

    issueClient.ListIssues(
      { page: page.toString(), limit: limit.toString() },
      req.metadata,
      (error, response) => {
        if (error) {
          return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
        }
        res.status(200).json(response);
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const assignIssue = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { issueId } = req.params;
    issueClient.AssignIssue({ issueId }, req.metadata, (error, response) => {
      if (error) {
        return res
          .status(500)
          .json({ error: error.message || "Internal Server Error" });
      }
      res.status(200).json({
        message: response.message,
        status: response.status,
        issueId: response.issueId,
      });
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const updateIssueDetails = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { issueId } = req.params;
    const { description } = req.body;

    if (!issueId || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    issueClient.UpdateIssueDetails(
      { issueId, description },
      req.metadata,
      (error, response) => {
        if (error) {
          return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
        }
        res.status(200).json({
          message: response.message,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const updateIssuePriorityImpact = async (
  req: RequestWithMetadata,
  res: Response
) => {
  try {
    const { issueId } = req.params;
    const { impact, urgency, priority } = req.body;

    const impactValue = ImpactEnum[impact as keyof typeof ImpactEnum];
    const urgencyValue = UrgencyEnum[urgency as keyof typeof UrgencyEnum];

    if (typeof impactValue !== "number" || typeof urgencyValue !== "number") {
      return res.status(400).json({ error: "Invalid impact or urgency value" });
    }

    issueClient.UpdateIssuePriorityImpact(
      { issueId, impact: impactValue, urgency: urgencyValue, priority },
      req.metadata,
      (error, response) => {
        if (error) {
          return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
        }
        res.status(200).json({
          message: response.message,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const resolveIssue = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { issueId } = req.params;
    const { resolution } = req.body;

    const statusValue = StatusEnum[resolution as keyof typeof StatusEnum];

    if (typeof statusValue !== "number") {
      return res.status(400).json({ error: "Invalid resolution status" });
    }

    issueClient.ResolveIssue(
      { issueId, resolution: statusValue },
      req.metadata,
      (error, response) => {
        if (error) {
          return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
        }
        res.status(200).json({
          message: response.message,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const uploadFile = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { issueId } = req.params;
    // issueClient.UploadAttachment({});
    res.status(200).json({
      message: "File uploaded successfully",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const issueViews = {
  resolveIssue,
  updateIssuePriorityImpact,
  updateIssueDetails,
  createIssue,
  getIssue,
  listIssues,
  getAllIssues,
  assignIssue,
  uploadFile,
};

export default issueViews;
