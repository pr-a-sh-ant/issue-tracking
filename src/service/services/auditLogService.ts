import { status, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { parse } from "path";

import { LogEventRequest } from "src/proto/auditlog/LogEventRequest";
import { LogEventResponse } from "src/proto/auditlog/LogEventResponse";

import auditlogModel from "../model/auditlogModel";

const getLogEvents = async (
  call: ServerUnaryCall<LogEventRequest, LogEventResponse>,
  callback: sendUnaryData<LogEventResponse>
) => {
  try {
    const { page, limit } = call.request;
    const result = await auditlogModel.getAllLogEvents(
      parseInt(page) || 1,
      parseInt(limit) || 10
    );
    callback(null, {
      logEvents: result,
    });
  } catch (error: any) {
    callback(
      {
        code: status.NOT_FOUND,
        message: error.message || "Internal server error",
      },
      null
    );
    return;
  }
};

const auditlogHandler = { getLogEvents };

export default auditlogHandler;
