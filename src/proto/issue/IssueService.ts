// Original file: src/proto/issue.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AssignIssueRequest as _issue_AssignIssueRequest, AssignIssueRequest__Output as _issue_AssignIssueRequest__Output } from '../issue/AssignIssueRequest';
import type { AssignIssueResponse as _issue_AssignIssueResponse, AssignIssueResponse__Output as _issue_AssignIssueResponse__Output } from '../issue/AssignIssueResponse';
import type { CreateIssueRequest as _issue_CreateIssueRequest, CreateIssueRequest__Output as _issue_CreateIssueRequest__Output } from '../issue/CreateIssueRequest';
import type { CreateIssueResponse as _issue_CreateIssueResponse, CreateIssueResponse__Output as _issue_CreateIssueResponse__Output } from '../issue/CreateIssueResponse';
import type { GetIssueRequest as _issue_GetIssueRequest, GetIssueRequest__Output as _issue_GetIssueRequest__Output } from '../issue/GetIssueRequest';
import type { GetIssueResponse as _issue_GetIssueResponse, GetIssueResponse__Output as _issue_GetIssueResponse__Output } from '../issue/GetIssueResponse';
import type { ListIssuesRequest as _issue_ListIssuesRequest, ListIssuesRequest__Output as _issue_ListIssuesRequest__Output } from '../issue/ListIssuesRequest';
import type { ListIssuesResponse as _issue_ListIssuesResponse, ListIssuesResponse__Output as _issue_ListIssuesResponse__Output } from '../issue/ListIssuesResponse';
import type { UpdateIssueRequest as _issue_UpdateIssueRequest, UpdateIssueRequest__Output as _issue_UpdateIssueRequest__Output } from '../issue/UpdateIssueRequest';
import type { UpdateIssueResponse as _issue_UpdateIssueResponse, UpdateIssueResponse__Output as _issue_UpdateIssueResponse__Output } from '../issue/UpdateIssueResponse';

export interface IssueServiceClient extends grpc.Client {
  AssignIssue(argument: _issue_AssignIssueRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_AssignIssueResponse__Output>): grpc.ClientUnaryCall;
  AssignIssue(argument: _issue_AssignIssueRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_AssignIssueResponse__Output>): grpc.ClientUnaryCall;
  AssignIssue(argument: _issue_AssignIssueRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_AssignIssueResponse__Output>): grpc.ClientUnaryCall;
  AssignIssue(argument: _issue_AssignIssueRequest, callback: grpc.requestCallback<_issue_AssignIssueResponse__Output>): grpc.ClientUnaryCall;
  assignIssue(argument: _issue_AssignIssueRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_AssignIssueResponse__Output>): grpc.ClientUnaryCall;
  assignIssue(argument: _issue_AssignIssueRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_AssignIssueResponse__Output>): grpc.ClientUnaryCall;
  assignIssue(argument: _issue_AssignIssueRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_AssignIssueResponse__Output>): grpc.ClientUnaryCall;
  assignIssue(argument: _issue_AssignIssueRequest, callback: grpc.requestCallback<_issue_AssignIssueResponse__Output>): grpc.ClientUnaryCall;
  
  CreateIssue(argument: _issue_CreateIssueRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_CreateIssueResponse__Output>): grpc.ClientUnaryCall;
  CreateIssue(argument: _issue_CreateIssueRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_CreateIssueResponse__Output>): grpc.ClientUnaryCall;
  CreateIssue(argument: _issue_CreateIssueRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_CreateIssueResponse__Output>): grpc.ClientUnaryCall;
  CreateIssue(argument: _issue_CreateIssueRequest, callback: grpc.requestCallback<_issue_CreateIssueResponse__Output>): grpc.ClientUnaryCall;
  createIssue(argument: _issue_CreateIssueRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_CreateIssueResponse__Output>): grpc.ClientUnaryCall;
  createIssue(argument: _issue_CreateIssueRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_CreateIssueResponse__Output>): grpc.ClientUnaryCall;
  createIssue(argument: _issue_CreateIssueRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_CreateIssueResponse__Output>): grpc.ClientUnaryCall;
  createIssue(argument: _issue_CreateIssueRequest, callback: grpc.requestCallback<_issue_CreateIssueResponse__Output>): grpc.ClientUnaryCall;
  
  GetIssue(argument: _issue_GetIssueRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_GetIssueResponse__Output>): grpc.ClientUnaryCall;
  GetIssue(argument: _issue_GetIssueRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_GetIssueResponse__Output>): grpc.ClientUnaryCall;
  GetIssue(argument: _issue_GetIssueRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_GetIssueResponse__Output>): grpc.ClientUnaryCall;
  GetIssue(argument: _issue_GetIssueRequest, callback: grpc.requestCallback<_issue_GetIssueResponse__Output>): grpc.ClientUnaryCall;
  getIssue(argument: _issue_GetIssueRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_GetIssueResponse__Output>): grpc.ClientUnaryCall;
  getIssue(argument: _issue_GetIssueRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_GetIssueResponse__Output>): grpc.ClientUnaryCall;
  getIssue(argument: _issue_GetIssueRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_GetIssueResponse__Output>): grpc.ClientUnaryCall;
  getIssue(argument: _issue_GetIssueRequest, callback: grpc.requestCallback<_issue_GetIssueResponse__Output>): grpc.ClientUnaryCall;
  
  ListIssues(argument: _issue_ListIssuesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  ListIssues(argument: _issue_ListIssuesRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  ListIssues(argument: _issue_ListIssuesRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  ListIssues(argument: _issue_ListIssuesRequest, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  listIssues(argument: _issue_ListIssuesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  listIssues(argument: _issue_ListIssuesRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  listIssues(argument: _issue_ListIssuesRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  listIssues(argument: _issue_ListIssuesRequest, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateIssue(argument: _issue_UpdateIssueRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssueResponse__Output>): grpc.ClientUnaryCall;
  UpdateIssue(argument: _issue_UpdateIssueRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_UpdateIssueResponse__Output>): grpc.ClientUnaryCall;
  UpdateIssue(argument: _issue_UpdateIssueRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssueResponse__Output>): grpc.ClientUnaryCall;
  UpdateIssue(argument: _issue_UpdateIssueRequest, callback: grpc.requestCallback<_issue_UpdateIssueResponse__Output>): grpc.ClientUnaryCall;
  updateIssue(argument: _issue_UpdateIssueRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssueResponse__Output>): grpc.ClientUnaryCall;
  updateIssue(argument: _issue_UpdateIssueRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_UpdateIssueResponse__Output>): grpc.ClientUnaryCall;
  updateIssue(argument: _issue_UpdateIssueRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssueResponse__Output>): grpc.ClientUnaryCall;
  updateIssue(argument: _issue_UpdateIssueRequest, callback: grpc.requestCallback<_issue_UpdateIssueResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface IssueServiceHandlers extends grpc.UntypedServiceImplementation {
  AssignIssue: grpc.handleUnaryCall<_issue_AssignIssueRequest__Output, _issue_AssignIssueResponse>;
  
  CreateIssue: grpc.handleUnaryCall<_issue_CreateIssueRequest__Output, _issue_CreateIssueResponse>;
  
  GetIssue: grpc.handleUnaryCall<_issue_GetIssueRequest__Output, _issue_GetIssueResponse>;
  
  ListIssues: grpc.handleUnaryCall<_issue_ListIssuesRequest__Output, _issue_ListIssuesResponse>;
  
  UpdateIssue: grpc.handleUnaryCall<_issue_UpdateIssueRequest__Output, _issue_UpdateIssueResponse>;
  
}

export interface IssueServiceDefinition extends grpc.ServiceDefinition {
  AssignIssue: MethodDefinition<_issue_AssignIssueRequest, _issue_AssignIssueResponse, _issue_AssignIssueRequest__Output, _issue_AssignIssueResponse__Output>
  CreateIssue: MethodDefinition<_issue_CreateIssueRequest, _issue_CreateIssueResponse, _issue_CreateIssueRequest__Output, _issue_CreateIssueResponse__Output>
  GetIssue: MethodDefinition<_issue_GetIssueRequest, _issue_GetIssueResponse, _issue_GetIssueRequest__Output, _issue_GetIssueResponse__Output>
  ListIssues: MethodDefinition<_issue_ListIssuesRequest, _issue_ListIssuesResponse, _issue_ListIssuesRequest__Output, _issue_ListIssuesResponse__Output>
  UpdateIssue: MethodDefinition<_issue_UpdateIssueRequest, _issue_UpdateIssueResponse, _issue_UpdateIssueRequest__Output, _issue_UpdateIssueResponse__Output>
}
