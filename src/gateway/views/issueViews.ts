import { issueClient } from "../client";
import { NextFunction, Response } from "express";
import { RequestWithMetadata } from "../middleware/setMetadata";
import { StatusEnum } from "../../proto/issue/StatusEnum";
import { ImpactEnum } from "../../proto/issue/ImpactEnum";
import { UrgencyEnum } from "../../proto/issue/UrgencyEnum";
import formatComments from "../../utils/formatComment";
import formatListDate from "../../utils/formatDate";
import AppError from "../../utils/appError";

const createIssue = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { title, description, impact, urgency } = req.body;
  if (!title || !description || !urgency || !impact) {
    return next(
      new AppError("Title, description, impact, and urgency are required", 400)
    );
  }

  issueClient.CreateIssue(
    { description, impact, title, urgency },
    req.metadata,
    (error, response) => {
      if (error) {
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(201).json({
        message: response.message,
        issue: response.issueId,
      });
    }
  );
};

const getIssue = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { issueId } = req.params;
  if (!issueId) {
    return next(new AppError("Issue ID is required", 400));
  }
  issueClient.GetIssue({ issueId }, req.metadata, (error, response) => {
    if (error) {
      console.log(error.code);
      return next(
        new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
      );
    }

    const fomatedComment = formatComments(response.comments);
    response.comments = fomatedComment;
    res.status(200).json(response);
  });
};

const listIssues = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { page = 0, limit = 0, priority = "", status = "" } = req.body || {};
  issueClient.ListIssuesByUser(
    {
      page: page.toString(),
      limit: limit.toString(),
      priority,
      status,
    },
    req.metadata,
    (error, response) => {
      if (error) {
        console.log(error.code);
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(200).json(response);
    }
  );
};

const getAllIssues = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { page = 0, limit = 0, priority = "", status = "" } = req.body;

  issueClient.ListIssues(
    { page: page.toString(), limit: limit.toString(), priority, status },
    req.metadata,
    (error, response) => {
      if (error) {
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(200).json(response);
    }
  );
};

const assignIssue = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { issueId } = req.params;
  issueClient.AssignIssue({ issueId }, req.metadata, (error, response) => {
    if (error) {
      return next(
        new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
      );
    }
    res.status(200).json({
      message: response.message,
      status: response.status,
      issueId: response.issueId,
    });
  });
};

const updateIssueDetails = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { issueId } = req.params;
  const { description } = req.body;

  if (!issueId || !description) {
    return next(new AppError("Issue ID and description are required", 400));
  }

  issueClient.UpdateIssueDetails(
    { issueId, description },
    req.metadata,
    (error, response) => {
      if (error) {
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(200).json({
        message: response.message,
      });
    }
  );
};

const updateIssuePriorityImpact = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { issueId } = req.params;
  const { impact, urgency, priority } = req.body;

  const impactValue = ImpactEnum[impact as keyof typeof ImpactEnum];
  const urgencyValue = UrgencyEnum[urgency as keyof typeof UrgencyEnum];

  if (typeof impactValue !== "number" || typeof urgencyValue !== "number") {
    return next(new AppError("Invalid impact or urgency value", 400));
  }

  issueClient.UpdateIssuePriorityImpact(
    { issueId, impact: impactValue, urgency: urgencyValue, priority },
    req.metadata,
    (error, response) => {
      if (error) {
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(200).json({
        message: response.message,
      });
    }
  );
};

const resolveIssue = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { issueId } = req.params;
  const { resolution } = req.body;

  const statusValue = StatusEnum[resolution as keyof typeof StatusEnum];

  if (typeof statusValue !== "number") {
    return next(new AppError("Invalid resolution status", 400));
  }

  issueClient.ResolveIssue(
    { issueId, resolution: statusValue },
    req.metadata,
    (error, response) => {
      if (error) {
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(200).json({
        message: response.message,
      });
    }
  );
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

const dashboardIssues = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const user = req.user;
  issueClient.DashboardIssues({}, req.metadata, (error, response) => {
    if (error) {
      return next(
        new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
      );
    }
    const formatedList = formatListDate(response.list);
    res.status(200).json({ ...response, list: formatedList });
  });
};

const deleteIssue = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  const { issueId } = req.params;
  if (!issueId) {
    return next(new AppError("Issue ID is required", 400));
  }

  issueClient.DeleteIssue({ issueId }, req.metadata, (error, response) => {
    if (error) {
      return next(
        new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
      );
    }
    res.status(200).json({
      message: response.message || "Issue deleted successfully",
    });
  });
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
  dashboardIssues,
  deleteIssue,
};

export default issueViews;
