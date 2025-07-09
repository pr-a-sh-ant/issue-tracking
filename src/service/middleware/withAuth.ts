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

const withAuth = <Req, Res>(handler: Handler<Req, Res>) => {
  return async (
    call: ServerUnaryCall<Req, Res>,
    callback: sendUnaryData<Res>
  ) => {
    const metadata: Metadata = call.metadata;
    const authHeader = metadata.get("authorization")[0] as string | undefined;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return callback(
        {
          code: status.UNAUTHENTICATED,
          details: "No token provided",
        } as any,
        null
      );
    }

    try {
      const decoded = await verifyToken(token);
      // @ts-ignore
      call.user = decoded;
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

export default withAuth;
