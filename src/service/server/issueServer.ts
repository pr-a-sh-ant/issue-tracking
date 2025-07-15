import { loadPackageDefinition, Server } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

//Types
import { ProtoGrpcType } from "../../proto/issue";
import { ProtoGrpcType as CommentGrpcType } from "../../proto/comment";
import { ProtoGrpcType as LogGrpcType } from "../../proto/audit_log";
import { IssueServiceHandlers } from "../../proto/issue/IssueService";
import { CommentServiceHandlers } from "../../proto/comment/CommentService";
import { AuditLogServiceHandlers } from "../../proto/auditlog/AuditLogService";

//Handlers and middlewares
import issueHandler from "../services/issueServices";
import withAuth from "../middleware/withAuth";
import withRoleAuth from "../middleware/withRoleAuth";
import commentHandler from "../services/commentServices";
import auditlogHandler from "../services/auditLogService";

const PORTO_PATH = "src/proto/issue.proto";

const COMMENT_PROTO_PATH = "src/proto/comment.proto";

const LOG_EVENT_PROTO_PATH = "src/proto/audit_log.proto";

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

const issueDef = loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const commentDef = loadPackageDefinition(
  commentPackageDefinition
) as unknown as CommentGrpcType;

const logDef = loadPackageDefinition(
  logEventPackageDefinition
) as unknown as LogGrpcType;

const issueServer = new Server();

const handler: IssueServiceHandlers = {
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
};

const commentHandlerService: CommentServiceHandlers = {
  CreateComment: withAuth(commentHandler.createComment),
};

const logHandler: AuditLogServiceHandlers = {
  GetLogEvents: withAuth(
    withRoleAuth(["superadmin"], auditlogHandler.getLogEvents)
  ),
};

issueServer.addService(issueDef.issue.IssueService.service, handler);
issueServer.addService(
  commentDef.comment.CommentService.service,
  commentHandlerService
);

issueServer.addService(logDef.auditlog.AuditLogService.service, logHandler);

export default issueServer;
