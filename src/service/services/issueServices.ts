import { status, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

// Importing the generated types
import { CreateIssueRequest } from "src/proto/issue/CreateIssueRequest";
import { CreateIssueResponse } from "src/proto/issue/CreateIssueResponse";

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

const issueHandler = { createIssue };

export default issueHandler;
