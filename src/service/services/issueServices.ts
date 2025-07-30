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
import { UploadAttachmentRequest } from "src/proto/issue/UploadAttachmentRequest";
import { UploadAttachmentResponse } from "src/proto/issue/UploadAttachmentResponse";
import { DashboardIssuesRequest } from "src/proto/issue/DashboardIssuesRequest";
import { DashboardIssuesResponse } from "src/proto/issue/DashboardIssuesResponse";

// Creating helper function and model
import issueModel from "../model/issueModel";
import auditlogModel from "../model/auditlogModel";
import subTaskModel from "../model/subTaskModel";

// importing types
import { LogEventTable } from "../model/auditlogModel";
import { DeleteIssueRequest } from "src/proto/issue/DeleteIssueRequest";
import { DeleteIssueResponse } from "src/proto/issue/DeleteIssueResponse";
import GrpcError from "../../utils/grpcError";

const createIssue = async (
  call: ServerUnaryCall<CreateIssueRequest, CreateIssueResponse>,
  callback: sendUnaryData<CreateIssueResponse>
) => {
  try {
    const issue = call.request;
    // @ts-ignore
    const created_by = call.user?.userId;
    // @ts-ignore
    const role = call.user?.role;
    if (role === "admin" || role === "superadmin") {
      callback({
        code: status.PERMISSION_DENIED,
        message: "Admins cannot create issues directly",
      });
    }

    const result = await issueModel.createIssue({
      ...issue,
      created_by,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const logDetail: LogEventTable = {
      action: "CREATE_ISSUE",
      details: `Issue created with title: ${issue.title}`,
      issue_id: result.insertId,
      log_date: new Date(),
      user_id: created_by,
    };
    await auditlogModel.createAuditLogEvent(logDetail);
    callback(null, {
      message: "Issue created successfully",
      issueId: result.insertId.toString(),
    });
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
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
    const getSubTasks = await subTaskModel.getSubTasks(parseInt(issueId));
    if (!issueResult) {
      callback({
        code: status.NOT_FOUND,
        message: "Issue not found",
      });
    }
    callback(null, {
      message: "Issue retrieved successfully",
      Issue: issueResult.issue,
      comments: issueResult.comments,
      subTasks: getSubTasks,
    });
  } catch (error: GrpcError | any) {
    callback({
      code: error.status,
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
    const logDetail: LogEventTable = {
      action: "ASSIGN_ISSUE",
      details: `Issue with ID ${issueId} assigned by admin ${adminId}`,
      issue_id: parseInt(issueId),
      log_date: new Date(),
      user_id: adminId,
    };
    await auditlogModel.createAuditLogEvent(logDetail);
    callback(null, {
      message: result.message || "Issue assigned successfully",
      status: status.OK.toString(),
      issueId: issueId,
    });
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
      message: error.message || "Internal server error",
    });
  }
};

const listIssues = async (
  call: ServerUnaryCall<ListIssuesRequest, ListIssuesResponse>,
  callback: sendUnaryData<ListIssuesResponse>
) => {
  try {
    const { page, limit, priority, status } = call.request;
    const result = await issueModel.listAllIssues(
      parseInt(page),
      parseInt(limit),
      priority,
      status
    );
    callback(null, {
      message: "All issues retrieved successfully",
      issues: result,
    });
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
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
    const user = call.user;
    const { page, limit, priority, status } = call.request;
    const result = await issueModel.listIssuesByUser(
      user.userId,
      user.role,
      parseInt(page),
      parseInt(limit),
      priority,
      status
    );
    callback(null, {
      message: "Issues listed successfully",
      issues: result,
    });
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
      message: error.message || "Internal server error while listing issues",
    });
  }
};

const updateIssueDetails = async (
  call: ServerUnaryCall<UpdateIssueDetailsRequest, UpdateIssueDetailsResponse>,
  callback: sendUnaryData<UpdateIssueDetailsResponse>
) => {
  try {
    const { description, issueId, title } = call.request;
    // @ts-ignore
    const userId = call.user?.userId;
    const result = await issueModel.updateIssueDetails(
      parseInt(issueId),
      description,
      userId,
      title
    );
    callback(null, {
      message: result.message || "Issue details updated successfully",
    });
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
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
    // @ts-ignore
    const adminId = call.user?.userId;
    const result = await issueModel.updateIssuePriorityImpact(
      parseInt(issueId),
      priority,
      impact,
      urgency
    );
    const logDetail: LogEventTable = {
      action: "UPDATE_PRIORITY_IMPACT",
      details: `Issue with ID ${issueId} updated with priority: ${priority}, impact: ${impact}, urgency: ${urgency}`,
      issue_id: parseInt(issueId),
      log_date: new Date(),
      user_id: adminId,
    };
    await auditlogModel.createAuditLogEvent(logDetail);
    callback(null, {
      message:
        result.message || "Issue priority and impact updated successfully",
    });
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
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
    const logDetail: LogEventTable = {
      action: "RESOLVE_ISSUE",
      details: `Issue with ID ${issueId} resolved with resolution: ${resolution}`,
      issue_id: parseInt(issueId),
      log_date: new Date(),
      user_id: userId,
    };
    await auditlogModel.createAuditLogEvent(logDetail);
    callback(null, {
      message: result.message || "Issue resolved successfully",
    });
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
      message: error.message || "Internal server error while resolving issue",
    });
  }
};

const dashboardIssues = async (
  call: ServerUnaryCall<DashboardIssuesRequest, DashboardIssuesResponse>,
  callback: sendUnaryData<DashboardIssuesResponse>
) => {
  try {
    // @ts-ignore
    const user = call.user;
    const result = await issueModel.dashboardIssues(user);
    callback(null, {
      message: "Dashboard issues retrieved successfully",
      ackIssues: result.ackIssues.toString(),
      closedIssues: result.closedIssues.toString(),
      newIssues: result.newIssues.toString(),
      list: result.list,
    });
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
      message:
        error.message ||
        "Internal server error while fetching dashboard issues",
    });
  }
};

const uploadAttachment = async (
  call: ServerUnaryCall<UploadAttachmentRequest, UpdateIssueDetailsResponse>,
  callback: sendUnaryData<UploadAttachmentResponse>
) => {
  try {
    const { fileName, filePath, issueId, createdBy } = call.request;
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
      message:
        error.message || "Internal server error while uploading attachment",
    });
  }
};

const deleteIssue = async (
  call: ServerUnaryCall<DeleteIssueRequest, DeleteIssueResponse>,
  callback: sendUnaryData<DeleteIssueResponse>
) => {
  try {
    const { issueId } = call.request;
    // @ts-ignore
    const userId = call.user?.userId;
    const result = await issueModel.deleteIssue(parseInt(issueId), userId);
    callback(null, {
      message: result.message || "Issue deleted successfully",
    });
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
      message: error.message || "Internal server error while deleting issue",
    });
  }
};

const issueHandler = {
  resolveIssue,
  assignIssue,
  updateIssuePriorityImpact,
  createIssue,
  deleteIssue,
  getIssue,
  listIssues,
  listIssuesByUser,
  updateIssueDetails,
  uploadAttachment,
  dashboardIssues,
};

export default issueHandler;
