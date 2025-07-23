import { status, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

import { CreateSubTaskRequest } from "../../proto/sub_task/CreateSubTaskRequest";
import { CreateSubTaskResponse } from "../../proto/sub_task/CreateSubTaskResponse";
import { CompleteSubTaskRequest } from "../../proto/sub_task/CompleteSubTaskRequest";
import { CompleteSubTaskResponse } from "../../proto/sub_task/CompleteSubTaskResponse";

import subTaskModel from "../model/subTaskModel";
import auditlogModel from "../model/auditlogModel";

import { LogEventTable } from "../model/auditlogModel";

const createSubTask = async (
  call: ServerUnaryCall<CreateSubTaskRequest, CreateSubTaskResponse>,
  callback: sendUnaryData<CreateSubTaskResponse>
) => {
  try {
    const { issueId, task } = call.request;
    // @ts-ignore
    const userId = call.user?.userId;
    const subTask = {
      issue_id: parseInt(issueId),
      task,
      createdBy: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const logDetail: LogEventTable = {
      user_id: userId,
      action: "CREATE_SUB_TASK",
      details: `Subtask created for issue ID ${issueId} with task: ${task}`,
      issue_id: parseInt(issueId),
      log_date: new Date(),
    };
    const result = await subTaskModel.createSubTask(subTask);
    await auditlogModel.createAuditLogEvent(logDetail);
    callback(null, {
      message: result.message || "Subtask created successfully",
    });
  } catch (error: any) {
    callback({
      code: status.UNAUTHENTICATED,
      message: error.message || "Internal server error",
    });
  }
};

const completeSubTask = async (
  call: ServerUnaryCall<CompleteSubTaskRequest, CompleteSubTaskResponse>,
  callback: sendUnaryData<CompleteSubTaskResponse>
) => {
  try {
    const { taskId, issueId } = call.request;
    // @ts-ignore
    const userId = call.user?.userId;
    const logDetail: LogEventTable = {
      user_id: userId,
      action: "COMPLETE_SUB_TASK",
      details: `Subtask with ID ${taskId} completed`,
      issue_id: parseInt(call.request.issueId),
      log_date: new Date(),
    };
    const result = await subTaskModel.completeSubTask(
      parseInt(taskId),
      userId,
      parseInt(issueId)
    );
    await auditlogModel.createAuditLogEvent(logDetail);
    callback(null, {
      message: result.message || "Subtask completed successfully",
    });
  } catch (error: any) {
    callback({
      code: status.UNAUTHENTICATED,
      message: error.message || "Internal server error",
    });
  }
};

const subTaskHandler = {
  createSubTask,
  completeSubTask,
};

export default subTaskHandler;
