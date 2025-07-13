// Original file: src/proto/comment.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateCommentRequest as _comment_CreateCommentRequest, CreateCommentRequest__Output as _comment_CreateCommentRequest__Output } from '../comment/CreateCommentRequest';
import type { CreateCommentResponse as _comment_CreateCommentResponse, CreateCommentResponse__Output as _comment_CreateCommentResponse__Output } from '../comment/CreateCommentResponse';

export interface CommentServiceClient extends grpc.Client {
  CreateComment(argument: _comment_CreateCommentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_comment_CreateCommentResponse__Output>): grpc.ClientUnaryCall;
  CreateComment(argument: _comment_CreateCommentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_comment_CreateCommentResponse__Output>): grpc.ClientUnaryCall;
  CreateComment(argument: _comment_CreateCommentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_comment_CreateCommentResponse__Output>): grpc.ClientUnaryCall;
  CreateComment(argument: _comment_CreateCommentRequest, callback: grpc.requestCallback<_comment_CreateCommentResponse__Output>): grpc.ClientUnaryCall;
  createComment(argument: _comment_CreateCommentRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_comment_CreateCommentResponse__Output>): grpc.ClientUnaryCall;
  createComment(argument: _comment_CreateCommentRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_comment_CreateCommentResponse__Output>): grpc.ClientUnaryCall;
  createComment(argument: _comment_CreateCommentRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_comment_CreateCommentResponse__Output>): grpc.ClientUnaryCall;
  createComment(argument: _comment_CreateCommentRequest, callback: grpc.requestCallback<_comment_CreateCommentResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface CommentServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateComment: grpc.handleUnaryCall<_comment_CreateCommentRequest__Output, _comment_CreateCommentResponse>;
  
}

export interface CommentServiceDefinition extends grpc.ServiceDefinition {
  CreateComment: MethodDefinition<_comment_CreateCommentRequest, _comment_CreateCommentResponse, _comment_CreateCommentRequest__Output, _comment_CreateCommentResponse__Output>
}
