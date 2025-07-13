import { issueClient } from "../client";
import { Response } from "express";
import { RequestWithMetadata } from "../middleware/setMetadata";

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

const issueViews = {
  createIssue,
  getIssue,
  listIssues,
  getAllIssues,
  assignIssue,
};

export default issueViews;
