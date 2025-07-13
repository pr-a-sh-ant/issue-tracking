import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { IssueServiceClient as _issue_IssueServiceClient, IssueServiceDefinition as _issue_IssueServiceDefinition } from './issue/IssueService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  issue: {
    AssignIssueRequest: MessageTypeDefinition
    AssignIssueResponse: MessageTypeDefinition
    CreateIssueRequest: MessageTypeDefinition
    CreateIssueResponse: MessageTypeDefinition
    GetIssueRequest: MessageTypeDefinition
    GetIssueResponse: MessageTypeDefinition
    ImpactEnum: EnumTypeDefinition
    Issue: MessageTypeDefinition
    IssueService: SubtypeConstructor<typeof grpc.Client, _issue_IssueServiceClient> & { service: _issue_IssueServiceDefinition }
    IssueShort: MessageTypeDefinition
    ListIssuesRequest: MessageTypeDefinition
    ListIssuesResponse: MessageTypeDefinition
    ResolveIssueRequest: MessageTypeDefinition
    ResolveIssueResponse: MessageTypeDefinition
    StatusEnum: EnumTypeDefinition
    UpdateIssueDetailsRequest: MessageTypeDefinition
    UpdateIssueDetailsResponse: MessageTypeDefinition
    UpdateIssuePriorityImpactRequest: MessageTypeDefinition
    UpdateIssuePriorityImpactResponse: MessageTypeDefinition
    UrgencyEnum: EnumTypeDefinition
  }
}

