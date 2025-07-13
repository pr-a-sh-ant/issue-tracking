import { status, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

// Importing the generated types
import { CreateIssueRequest } from "src/proto/issue/CreateIssueRequest";
import { CreateIssueResponse } from "src/proto/issue/CreateIssueResponse";
import { GetIssueRequest } from "src/proto/issue/GetIssueRequest";
import { GetIssueResponse } from "src/proto/issue/GetIssueResponse";
import { AssignIssueRequest } from "src/proto/issue/AssignIssueRequest";
import { AssignIssueResponse } from "src/proto/issue/AssignIssueResponse";
import { ListIssuesRequest } from "src/proto/issue/ListIssuesRequest";
import { ListIssuesResponse } from "src/proto/issue/ListIssuesResponse";
import { UpdateIssueDetailsRequest } from "src/proto/issue/UpdateIssueDetailsRequest";
import { UpdateIssueDetailsResponse } from "src/proto/issue/UpdateIssueDetailsResponse";
import { UpdateIssuePriorityImpactRequest } from "src/proto/issue/UpdateIssuePriorityImpactRequest";
import { UpdateIssuePriorityImpactResponse } from "src/proto/issue/UpdateIssuePriorityImpactResponse";
import { ResolveIssueRequest } from "src/proto/issue/ResolveIssueRequest";
import { ResolveIssueResponse } from "src/proto/issue/ResolveIssueResponse";

// Creating helper function and model
import issueModel from "../model/issueModel";
import { parse } from "path";

const createIssue = async (
  call: ServerUnaryCall<CreateIssueRequest, CreateIssueResponse>,
  callback: sendUnaryData<CreateIssueResponse>
) => {
  try {
    const issue = call.request;
    // @ts-ignore
    const created_by = call.user?.userId;
    const result = await issueModel.createIssue({
      ...issue,
      created_by,
      created_at: new Date(),
      updated_at: new Date(),
    });
    callback(null, {
      message: "Issue created successfully",
      issueId: result.insertId.toString(),
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      message: error.message || "Internal server error",
    });
  }
};

const getIssue = async (
  call: ServerUnaryCall<GetIssueRequest, GetIssueResponse>,
  callback: sendUnaryData<GetIssueResponse>
) => {
  try {
    const { issueId } = call.request;
    // @ts-ignore
    const user = call.user;
    if (!issueId) {
      return callback({
        code: status.INVALID_ARGUMENT,
        message: "Issue ID is required",
      });
    }

    const issueResult = await issueModel.getIssue(
      parseInt(issueId),
      user?.role,
      user?.userId
    );

    if (!issueResult) {
      return callback({
        code: status.NOT_FOUND,
        message: "Issue not found",
      });
    }
    callback(null, {
      message: "Issue retrieved successfully",
      Issue: issueResult.issue,
      comments: issueResult.comments,
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      message: error.message || "Internal server error",
    });
  }
};

const assignIssue = async (
  call: ServerUnaryCall<AssignIssueRequest, AssignIssueResponse>,
  callback: sendUnaryData<AssignIssueResponse>
) => {
  try {
    const { issueId } = call.request;
    // @ts-ignore
    const adminId = call.user?.userId;
    if (!issueId) {
      callback({
        code: status.INVALID_ARGUMENT,
        message: "Issue ID is required",
      });
    }
    const result = await issueModel.assignIssue(parseInt(issueId), adminId);
    callback(null, {
      message: result.message || "Issue assigned successfully",
      status: status.OK.toString(),
      issueId: issueId,
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      message: error.message || "Internal server error",
    });
  }
};

const listIssues = async (
  call: ServerUnaryCall<ListIssuesRequest, ListIssuesResponse>,
  callback: sendUnaryData<ListIssuesResponse>
) => {
  try {
    const { page, limit } = call.request;
    const result = await issueModel.listAllIssues(
      parseInt(page),
      parseInt(limit)
    );
    callback(null, {
      message: "All issues retrieved successfully",
      issues: result,
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      message: error.message || "Internal server error",
    });
  }
};

const listIssuesByUser = async (
  call: ServerUnaryCall<ListIssuesRequest, ListIssuesResponse>,
  callback: sendUnaryData<ListIssuesResponse>
) => {
  try {
    //@ts-ignore
    const userId = call.user?.userId;
    const { page, limit } = call.request;
    const result = await issueModel.listIssuesByUser(
      userId,
      parseInt(page),
      parseInt(limit)
    );
    callback(null, {
      message: "Issues listed successfully",
      issues: result,
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      message: error.message || "Internal server error while listing issues",
    });
  }
};

const updateIssueDetails = async (
  call: ServerUnaryCall<UpdateIssueDetailsRequest, UpdateIssueDetailsResponse>,
  callback: sendUnaryData<UpdateIssueDetailsResponse>
) => {
  try {
    const { description, issueId } = call.request;
    // @ts-ignore
    const userId = call.user?.userId;
    const result = await issueModel.updateIssueDetails(
      parseInt(issueId),
      description,
      userId
    );
    callback(null, {
      message: result.message || "Issue details updated successfully",
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      message:
        error.message || "Internal server error while updating issue details",
    });
  }
};

const updateIssuePriorityImpact = async (
  call: ServerUnaryCall<
    UpdateIssuePriorityImpactRequest,
    UpdateIssuePriorityImpactResponse
  >,
  callback: sendUnaryData<UpdateIssuePriorityImpactResponse>
) => {
  try {
    const { impact, issueId, priority, urgency } = call.request;
    const result = await issueModel.updateIssuePriorityImpact(
      parseInt(issueId),
      priority,
      impact,
      urgency
    );
    callback(null, {
      message:
        result.message || "Issue priority and impact updated successfully",
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      message:
        error.message ||
        "Internal server error while updating issue priority and impact",
    });
  }
};

const resolveIssue = async (
  call: ServerUnaryCall<ResolveIssueRequest, ResolveIssueResponse>,
  callback: sendUnaryData<ResolveIssueResponse>
) => {
  try {
    const { issueId, resolution } = call.request;
    // @ts-ignore
    const userId = call.user?.userId;

    const result = await issueModel.resolveIssue(
      parseInt(issueId),
      resolution,
      userId
    );
    callback(null, {
      message: result.message || "Issue resolved successfully",
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      message: error.message || "Internal server error while resolving issue",
    });
  }
};

const issueHandler = {
  resolveIssue,
  assignIssue,
  updateIssuePriorityImpact,
  createIssue,
  getIssue,
  listIssues,
  listIssuesByUser,
  updateIssueDetails,
};

export default issueHandler;
