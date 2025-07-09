import grpc, {
  ServerUnaryCall,
  sendUnaryData,
  status,
  Metadata,
} from "@grpc/grpc-js";
import { verifyToken } from "../../utils/token";

type Handler<Req, Res> = (
  call: ServerUnaryCall<Req, Res> & { user?: any },
  callback: sendUnaryData<Res>
) => void;

const withRoleAuth = <Req, Res>(
  allowedRoles: string[],
  handler: Handler<Req, Res>
) => {
  return async (
    call: ServerUnaryCall<Req, Res>,
    callback: sendUnaryData<Res>
  ) => {
    try {
      // @ts-ignore
      if (!allowedRoles.includes(call.user.role)) {
        return callback(
          {
            code: status.PERMISSION_DENIED,
            details: "You do not have permission to access this resource",
          } as any,
          null
        );
      }

      return handler(call as any, callback);
    } catch (error: any) {
      return callback(
        {
          code: status.UNAUTHENTICATED,
          details: error.message,
        } as any,
        null
      );
    }
  };
};

export default withRoleAuth;
