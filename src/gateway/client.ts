import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType as UserProtoGrpcType } from "../proto/user";
import { ProtoGrpcType as IssueProtoGrpcType } from "../proto/issue";
import { ProtoGrpcType as CommentGrpcType } from "../proto/comment";
import { ProtoGrpcType as AuditLogGrpcType } from "../proto/audit_log";
import { ProtoGrpcType as SubTaskGrpcType } from "../proto/sub_task";

const USER_PORTO_PATH = "src/proto/user.proto";
const ISSUE_PORTO_PATH = "src/proto/issue.proto";
const COMMENT_PORTO_PATH = "src/proto/comment.proto";
const LOG_EVENT_PROTO_PATH = "src/proto/audit_log.proto";
const SUB_TASK_PROTO_PATH = "src/proto/sub_task.proto";

const userPackageDefinition = protoLoader.loadSync(USER_PORTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const issuePackageDefinition = protoLoader.loadSync(ISSUE_PORTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const commentPackageDefinition = protoLoader.loadSync(COMMENT_PORTO_PATH, {
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

const userPackage = loadPackageDefinition(
  userPackageDefinition
) as unknown as UserProtoGrpcType;

const issuePackage = loadPackageDefinition(
  issuePackageDefinition
) as unknown as IssueProtoGrpcType;

const commentPackage = loadPackageDefinition(
  commentPackageDefinition
) as unknown as CommentGrpcType;

const auditLogPackage = loadPackageDefinition(
  logEventPackageDefinition
) as unknown as AuditLogGrpcType;

const subTaskPackage = loadPackageDefinition(
  subTaskPackageDefinition
) as unknown as SubTaskGrpcType;

const userServices = userPackage.user.UserService;
const issueServices = issuePackage.issue.IssueService;
const commentServices = commentPackage.comment.CommentService;
const auditLogServices = auditLogPackage.auditlog.AuditLogService;
const subTaskServices = subTaskPackage.sub_task.SubTaskService;

const userClient = new userServices(
  "localhost:50051",
  credentials.createInsecure()
);

const issueClient = new issueServices(
  "localhost:50052",
  credentials.createInsecure()
);

const commentClient = new commentServices(
  "localhost:50052",
  credentials.createInsecure()
);

const auditLogClient = new auditLogServices(
  "localhost:50052",
  credentials.createInsecure()
);

const subTaskClient = new subTaskServices(
  "localhost:50052",
  credentials.createInsecure()
);

export {
  userClient,
  issueClient,
  commentClient,
  auditLogClient,
  subTaskClient,
};
