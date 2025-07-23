import { loadPackageDefinition, Server } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

//Types
import { ProtoGrpcType } from "../../proto/issue";
import { ProtoGrpcType as CommentGrpcType } from "../../proto/comment";
import { ProtoGrpcType as LogGrpcType } from "../../proto/audit_log";
import { ProtoGrpcType as SubTaskGrpcType } from "../../proto/sub_task";
import { IssueServiceHandlers } from "../../proto/issue/IssueService";
import { CommentServiceHandlers } from "../../proto/comment/CommentService";
import { AuditLogServiceHandlers } from "../../proto/auditlog/AuditLogService";
import { SubTaskServiceHandlers } from "src/proto/sub_task/SubTaskService";

//Handlers and middlewares
import issueHandler from "../services/issueServices";
import withAuth from "../middleware/withAuth";
import withRoleAuth from "../middleware/withRoleAuth";
import commentHandler from "../services/commentServices";
import auditlogHandler from "../services/auditLogService";
import subTaskHandler from "../services/subTaskService";

const PORTO_PATH = "src/proto/issue.proto";

const COMMENT_PROTO_PATH = "src/proto/comment.proto";

const LOG_EVENT_PROTO_PATH = "src/proto/audit_log.proto";

const SUB_TASK_PROTO_PATH = "src/proto/sub_task.proto";

const packageDefinition = protoLoader.loadSync(PORTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const commentPackageDefinition = protoLoader.loadSync(COMMENT_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const logEventPackageDefinition = protoLoader.loadSync(LOG_EVENT_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const subTaskPackageDefinition = protoLoader.loadSync(SUB_TASK_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const issueDef = loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const commentDef = loadPackageDefinition(
  commentPackageDefinition
) as unknown as CommentGrpcType;

const logDef = loadPackageDefinition(
  logEventPackageDefinition
) as unknown as LogGrpcType;

const subTaskDef = loadPackageDefinition(
  subTaskPackageDefinition
) as unknown as SubTaskGrpcType;

const issueServer = new Server();

// Issue Handlers
const IssueHandler: IssueServiceHandlers = {
  CreateIssue: withAuth(issueHandler.createIssue),
  GetIssue: withAuth(issueHandler.getIssue),
  AssignIssue: withAuth(
    withRoleAuth(["admin", "superadmin"], issueHandler.assignIssue)
  ),
  ListIssues: withAuth(
    withRoleAuth(["admin", "superadmin"], issueHandler.listIssues)
  ),
  ListIssuesByUser: withAuth(issueHandler.listIssuesByUser),
  UpdateIssueDetails: withAuth(issueHandler.updateIssueDetails),
  UpdateIssuePriorityImpact: withAuth(
    withRoleAuth(
      ["admin", "superadmin"],
      issueHandler.updateIssuePriorityImpact
    )
  ),
  ResolveIssue: withAuth(
    withRoleAuth(["admin", "superadmin"], issueHandler.resolveIssue)
  ),
  UploadAttachment: withAuth(issueHandler.uploadAttachment),
  DashboardIssues: withAuth(issueHandler.dashboardIssues),
  DeleteIssue: withAuth(withRoleAuth(["user"], issueHandler.deleteIssue)),
};

// Comment Handlers
const CommentHandler: CommentServiceHandlers = {
  CreateComment: withAuth(commentHandler.createComment),
};

// Log Handlers
const LogHandler: AuditLogServiceHandlers = {
  GetLogEvents: withAuth(
    withRoleAuth(["superadmin"], auditlogHandler.getLogEvents)
  ),
};

// SubTask Handlers
const SubTaskHandler: SubTaskServiceHandlers = {
  CreateSubTask: withAuth(
    withRoleAuth(["admin", "superadmin"], subTaskHandler.createSubTask)
  ),
  CompleteSubTask: withAuth(
    withRoleAuth(["admin", "superadmin"], subTaskHandler.completeSubTask)
  ),
};

issueServer.addService(issueDef.issue.IssueService.service, IssueHandler);
issueServer.addService(
  commentDef.comment.CommentService.service,
  CommentHandler
);
issueServer.addService(logDef.auditlog.AuditLogService.service, LogHandler);
issueServer.addService(
  subTaskDef.sub_task.SubTaskService.service,
  SubTaskHandler
);

export default issueServer;
