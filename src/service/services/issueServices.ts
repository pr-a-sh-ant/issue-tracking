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
import { UpdateIssueRequest } from "src/proto/issue/UpdateIssueRequest";
import { UpdateIssueResponse } from "src/proto/issue/UpdateIssueResponse";

// Creating helper function and model
import issueModel from "../model/issueModel";

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

    const issue = await issueModel.getIssue(
      parseInt(issueId),
      user?.role,
      user?.userId
    );

    if (!issue) {
      return callback({
        code: status.NOT_FOUND,
        message: "Issue not found",
      });
    }
    callback(null, {
      message: "Issue retrieved successfully",
      Issue: issue,
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
    const result = await issueModel.listAllIssues();
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
    const result = await issueModel.listIssuesByUser(userId);
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

const updateIssue = async (
  call: ServerUnaryCall<UpdateIssueRequest, UpdateIssueResponse>,
  callback: sendUnaryData<UpdateIssueResponse>
) => {
  callback({
    code: status.UNIMPLEMENTED,
    message: "UpdateIssue is not implemented yet",
  });
};

const issueHandler = {
  updateIssue,
  createIssue,
  getIssue,
  assignIssue,
  listIssues,
  listIssuesByUser,
};

export default issueHandler;
