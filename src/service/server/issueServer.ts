import { loadPackageDefinition, Server } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../../proto/issue";
import { IssueServiceHandlers } from "../../proto/issue/IssueService";
import issueHandler from "../services/issueServices";
import withAuth from "../middleware/withAuth";
import withRoleAuth from "../middleware/withRoleAuth";

const PORTO_PATH = "src/proto/issue.proto";

const packageDefinition = protoLoader.loadSync(PORTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const issueDef = loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

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

issueServer.addService(issueDef.issue.IssueService.service, handler);

export default issueServer;
