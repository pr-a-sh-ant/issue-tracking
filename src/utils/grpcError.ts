import { Status } from "@grpc/grpc-js/build/src/constants";

class GrpcError extends Error {
  constructor(
    public message: string,
    public status: Status
  ) {
    super(message);
    this.status = status;
  }
}

export default GrpcError;
