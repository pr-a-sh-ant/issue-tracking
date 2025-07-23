import { status, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

import { CreateCommentRequest } from "src/proto/comment/CreateCommentRequest";
import { CreateCommentResponse } from "src/proto/comment/CreateCommentResponse";

import commentModel from "../model/commentModel";

const createComment = async (
  call: ServerUnaryCall<CreateCommentRequest, CreateCommentResponse>,
  callback: sendUnaryData<CreateCommentResponse>
) => {
  try {
    const { content, issueId, parentId } = call.request;
    // @ts-ignore
    const userId = call.user?.userId;
    const result = await commentModel.createComment(
      content,
      userId,
      parseInt(issueId),
      parentId ? parseInt(parentId) : null
    );
    callback(null, {
      message: result.message,
      createdAt: new Date().toISOString(),
    });
  } catch (error: any) {
    callback({
      code: error.status || status.INTERNAL,
      message: error.message || "Internal server error",
    });
  }
};

const commentHandler = { createComment };

export default commentHandler;
