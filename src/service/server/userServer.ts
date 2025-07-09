import { loadPackageDefinition, Server } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../../proto/user";
import { UserServiceHandlers } from "../../proto/user/UserService";
import userHandler from "../services/userServices";

const PORTO_PATH = "src/proto/user.proto";

const packageDefinition = protoLoader.loadSync(PORTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userDef = loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const userServer = new Server();

const handler: UserServiceHandlers = {
  LoginUser: userHandler.LoginUser,
  RegisterUser: userHandler.RegisterUser,
  CreateAdminUser: userHandler.CreateAdminUser,
};

userServer.addService(userDef.user.UserService.service, handler);

export default userServer;
