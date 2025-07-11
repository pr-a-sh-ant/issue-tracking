import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType as UserProtoGrpcType } from "../proto/user";
import { ProtoGrpcType as IssueProtoGrpcType } from "../proto/issue";

const USER_PORTO_PATH = "src/proto/user.proto";
const ISSUE_PORTO_PATH = "src/proto/issue.proto";

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

const userPackage = loadPackageDefinition(
  userPackageDefinition
) as unknown as UserProtoGrpcType;

const issuePackage = loadPackageDefinition(
  issuePackageDefinition
) as unknown as IssueProtoGrpcType;

const userServices = userPackage.user.UserService;
const issueServices = issuePackage.issue.IssueService;

const userClient = new userServices(
  "localhost:50051",
  credentials.createInsecure()
);

const issueClient = new issueServices(
  "localhost:50052",
  credentials.createInsecure()
);

export { userClient, issueClient };
