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
import type { ResolveIssueRequest as _issue_ResolveIssueRequest, ResolveIssueRequest__Output as _issue_ResolveIssueRequest__Output } from '../issue/ResolveIssueRequest';
import type { ResolveIssueResponse as _issue_ResolveIssueResponse, ResolveIssueResponse__Output as _issue_ResolveIssueResponse__Output } from '../issue/ResolveIssueResponse';
import type { UpdateIssueDetailsRequest as _issue_UpdateIssueDetailsRequest, UpdateIssueDetailsRequest__Output as _issue_UpdateIssueDetailsRequest__Output } from '../issue/UpdateIssueDetailsRequest';
import type { UpdateIssueDetailsResponse as _issue_UpdateIssueDetailsResponse, UpdateIssueDetailsResponse__Output as _issue_UpdateIssueDetailsResponse__Output } from '../issue/UpdateIssueDetailsResponse';
import type { UpdateIssuePriorityImpactRequest as _issue_UpdateIssuePriorityImpactRequest, UpdateIssuePriorityImpactRequest__Output as _issue_UpdateIssuePriorityImpactRequest__Output } from '../issue/UpdateIssuePriorityImpactRequest';
import type { UpdateIssuePriorityImpactResponse as _issue_UpdateIssuePriorityImpactResponse, UpdateIssuePriorityImpactResponse__Output as _issue_UpdateIssuePriorityImpactResponse__Output } from '../issue/UpdateIssuePriorityImpactResponse';

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
  
  ListIssuesByUser(argument: _issue_ListIssuesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  ListIssuesByUser(argument: _issue_ListIssuesRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  ListIssuesByUser(argument: _issue_ListIssuesRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  ListIssuesByUser(argument: _issue_ListIssuesRequest, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  listIssuesByUser(argument: _issue_ListIssuesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  listIssuesByUser(argument: _issue_ListIssuesRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  listIssuesByUser(argument: _issue_ListIssuesRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  listIssuesByUser(argument: _issue_ListIssuesRequest, callback: grpc.requestCallback<_issue_ListIssuesResponse__Output>): grpc.ClientUnaryCall;
  
  ResolveIssue(argument: _issue_ResolveIssueRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ResolveIssueResponse__Output>): grpc.ClientUnaryCall;
  ResolveIssue(argument: _issue_ResolveIssueRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_ResolveIssueResponse__Output>): grpc.ClientUnaryCall;
  ResolveIssue(argument: _issue_ResolveIssueRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ResolveIssueResponse__Output>): grpc.ClientUnaryCall;
  ResolveIssue(argument: _issue_ResolveIssueRequest, callback: grpc.requestCallback<_issue_ResolveIssueResponse__Output>): grpc.ClientUnaryCall;
  resolveIssue(argument: _issue_ResolveIssueRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ResolveIssueResponse__Output>): grpc.ClientUnaryCall;
  resolveIssue(argument: _issue_ResolveIssueRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_ResolveIssueResponse__Output>): grpc.ClientUnaryCall;
  resolveIssue(argument: _issue_ResolveIssueRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_ResolveIssueResponse__Output>): grpc.ClientUnaryCall;
  resolveIssue(argument: _issue_ResolveIssueRequest, callback: grpc.requestCallback<_issue_ResolveIssueResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateIssueDetails(argument: _issue_UpdateIssueDetailsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssueDetailsResponse__Output>): grpc.ClientUnaryCall;
  UpdateIssueDetails(argument: _issue_UpdateIssueDetailsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_UpdateIssueDetailsResponse__Output>): grpc.ClientUnaryCall;
  UpdateIssueDetails(argument: _issue_UpdateIssueDetailsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssueDetailsResponse__Output>): grpc.ClientUnaryCall;
  UpdateIssueDetails(argument: _issue_UpdateIssueDetailsRequest, callback: grpc.requestCallback<_issue_UpdateIssueDetailsResponse__Output>): grpc.ClientUnaryCall;
  updateIssueDetails(argument: _issue_UpdateIssueDetailsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssueDetailsResponse__Output>): grpc.ClientUnaryCall;
  updateIssueDetails(argument: _issue_UpdateIssueDetailsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_UpdateIssueDetailsResponse__Output>): grpc.ClientUnaryCall;
  updateIssueDetails(argument: _issue_UpdateIssueDetailsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssueDetailsResponse__Output>): grpc.ClientUnaryCall;
  updateIssueDetails(argument: _issue_UpdateIssueDetailsRequest, callback: grpc.requestCallback<_issue_UpdateIssueDetailsResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateIssuePriorityImpact(argument: _issue_UpdateIssuePriorityImpactRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssuePriorityImpactResponse__Output>): grpc.ClientUnaryCall;
  UpdateIssuePriorityImpact(argument: _issue_UpdateIssuePriorityImpactRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_UpdateIssuePriorityImpactResponse__Output>): grpc.ClientUnaryCall;
  UpdateIssuePriorityImpact(argument: _issue_UpdateIssuePriorityImpactRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssuePriorityImpactResponse__Output>): grpc.ClientUnaryCall;
  UpdateIssuePriorityImpact(argument: _issue_UpdateIssuePriorityImpactRequest, callback: grpc.requestCallback<_issue_UpdateIssuePriorityImpactResponse__Output>): grpc.ClientUnaryCall;
  updateIssuePriorityImpact(argument: _issue_UpdateIssuePriorityImpactRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssuePriorityImpactResponse__Output>): grpc.ClientUnaryCall;
  updateIssuePriorityImpact(argument: _issue_UpdateIssuePriorityImpactRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_issue_UpdateIssuePriorityImpactResponse__Output>): grpc.ClientUnaryCall;
  updateIssuePriorityImpact(argument: _issue_UpdateIssuePriorityImpactRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_issue_UpdateIssuePriorityImpactResponse__Output>): grpc.ClientUnaryCall;
  updateIssuePriorityImpact(argument: _issue_UpdateIssuePriorityImpactRequest, callback: grpc.requestCallback<_issue_UpdateIssuePriorityImpactResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface IssueServiceHandlers extends grpc.UntypedServiceImplementation {
  AssignIssue: grpc.handleUnaryCall<_issue_AssignIssueRequest__Output, _issue_AssignIssueResponse>;
  
  CreateIssue: grpc.handleUnaryCall<_issue_CreateIssueRequest__Output, _issue_CreateIssueResponse>;
  
  GetIssue: grpc.handleUnaryCall<_issue_GetIssueRequest__Output, _issue_GetIssueResponse>;
  
  ListIssues: grpc.handleUnaryCall<_issue_ListIssuesRequest__Output, _issue_ListIssuesResponse>;
  
  ListIssuesByUser: grpc.handleUnaryCall<_issue_ListIssuesRequest__Output, _issue_ListIssuesResponse>;
  
  ResolveIssue: grpc.handleUnaryCall<_issue_ResolveIssueRequest__Output, _issue_ResolveIssueResponse>;
  
  UpdateIssueDetails: grpc.handleUnaryCall<_issue_UpdateIssueDetailsRequest__Output, _issue_UpdateIssueDetailsResponse>;
  
  UpdateIssuePriorityImpact: grpc.handleUnaryCall<_issue_UpdateIssuePriorityImpactRequest__Output, _issue_UpdateIssuePriorityImpactResponse>;
  
}

export interface IssueServiceDefinition extends grpc.ServiceDefinition {
  AssignIssue: MethodDefinition<_issue_AssignIssueRequest, _issue_AssignIssueResponse, _issue_AssignIssueRequest__Output, _issue_AssignIssueResponse__Output>
  CreateIssue: MethodDefinition<_issue_CreateIssueRequest, _issue_CreateIssueResponse, _issue_CreateIssueRequest__Output, _issue_CreateIssueResponse__Output>
  GetIssue: MethodDefinition<_issue_GetIssueRequest, _issue_GetIssueResponse, _issue_GetIssueRequest__Output, _issue_GetIssueResponse__Output>
  ListIssues: MethodDefinition<_issue_ListIssuesRequest, _issue_ListIssuesResponse, _issue_ListIssuesRequest__Output, _issue_ListIssuesResponse__Output>
  ListIssuesByUser: MethodDefinition<_issue_ListIssuesRequest, _issue_ListIssuesResponse, _issue_ListIssuesRequest__Output, _issue_ListIssuesResponse__Output>
  ResolveIssue: MethodDefinition<_issue_ResolveIssueRequest, _issue_ResolveIssueResponse, _issue_ResolveIssueRequest__Output, _issue_ResolveIssueResponse__Output>
  UpdateIssueDetails: MethodDefinition<_issue_UpdateIssueDetailsRequest, _issue_UpdateIssueDetailsResponse, _issue_UpdateIssueDetailsRequest__Output, _issue_UpdateIssueDetailsResponse__Output>
  UpdateIssuePriorityImpact: MethodDefinition<_issue_UpdateIssuePriorityImpactRequest, _issue_UpdateIssuePriorityImpactResponse, _issue_UpdateIssuePriorityImpactRequest__Output, _issue_UpdateIssuePriorityImpactResponse__Output>
}
