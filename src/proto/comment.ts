import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { CommentServiceClient as _comment_CommentServiceClient, CommentServiceDefinition as _comment_CommentServiceDefinition } from './comment/CommentService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  comment: {
    CommentService: SubtypeConstructor<typeof grpc.Client, _comment_CommentServiceClient> & { service: _comment_CommentServiceDefinition }
    CreateCommentRequest: MessageTypeDefinition
    CreateCommentResponse: MessageTypeDefinition
  }
}

