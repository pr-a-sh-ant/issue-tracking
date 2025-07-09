import { status, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

// Importing the generated types
import { CreateIssueRequest } from "src/proto/issue/CreateIssueRequest";
import { CreateIssueResponse } from "src/proto/issue/CreateIssueResponse";
import { GetIssueRequest } from "src/proto/issue/GetIssueRequest";
import { GetIssueResponse } from "src/proto/issue/GetIssueResponse";
import { AssignIssueRequest } from "src/proto/issue/AssignIssueRequest";
import { AssignIssueResponse } from "src/proto/issue/AssignIssueResponse";

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
    if (!issueId) {
      return callback({
        code: status.INVALID_ARGUMENT,
        message: "Issue ID is required",
      });
    }

    const issue = await issueModel.getIssue(parseInt(issueId));

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
    if (!issueId) {
      return callback({
        code: status.INVALID_ARGUMENT,
        message: "Issue ID is required",
      });
    }
    callback(null, {
      message: "Issue assigned successfully",
      issueId: issueId,
    });
  } catch (error: any) {}
};

const issueHandler = { createIssue, getIssue, assignIssue };

export default issueHandler;
