import { loadPackageDefinition, Server } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

//Types
import { ProtoGrpcType } from "../../proto/issue";
import { ProtoGrpcType as CommentGrpcType } from "../../proto/comment";
import { IssueServiceHandlers } from "../../proto/issue/IssueService";
import { CommentServiceHandlers } from "../../proto/comment/CommentService";

//Handlers and middlewares
import issueHandler from "../services/issueServices";
import withAuth from "../middleware/withAuth";
import withRoleAuth from "../middleware/withRoleAuth";
import commentHandler from "../services/commentServices";

const PORTO_PATH = "src/proto/issue.proto";

const COMMENT_PROTO_PATH = "src/proto/comment.proto";

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

const issueDef = loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const commentDef = loadPackageDefinition(
  commentPackageDefinition
) as unknown as CommentGrpcType;

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

issueServer.addService(issueDef.issue.IssueService.service, handler);
issueServer.addService(
  commentDef.comment.CommentService.service,
  commentHandlerService
);

export default issueServer;
