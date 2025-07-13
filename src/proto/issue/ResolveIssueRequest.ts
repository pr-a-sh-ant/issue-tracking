// Original file: src/proto/issue.proto

import type { StatusEnum as _issue_StatusEnum, StatusEnum__Output as _issue_StatusEnum__Output } from '../issue/StatusEnum';

export interface ResolveIssueRequest {
  'issueId'?: (string);
  'resolution'?: (_issue_StatusEnum);
}

export interface ResolveIssueRequest__Output {
  'issueId'?: (string);
  'resolution'?: (_issue_StatusEnum__Output);
}
