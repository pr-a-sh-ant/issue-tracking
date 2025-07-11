// Original file: src/proto/issue.proto

import type { StatusEnum as _issue_StatusEnum, StatusEnum__Output as _issue_StatusEnum__Output } from '../issue/StatusEnum';
import type { UrgencyEnum as _issue_UrgencyEnum, UrgencyEnum__Output as _issue_UrgencyEnum__Output } from '../issue/UrgencyEnum';
import type { ImpactEnum as _issue_ImpactEnum, ImpactEnum__Output as _issue_ImpactEnum__Output } from '../issue/ImpactEnum';

export interface UpdateIssueRequest {
  'issueId'?: (string);
  'title'?: (string);
  'description'?: (string);
  'status'?: (_issue_StatusEnum);
  'urgency'?: (_issue_UrgencyEnum);
  'impact'?: (_issue_ImpactEnum);
  'priority'?: (string);
}

export interface UpdateIssueRequest__Output {
  'issueId'?: (string);
  'title'?: (string);
  'description'?: (string);
  'status'?: (_issue_StatusEnum__Output);
  'urgency'?: (_issue_UrgencyEnum__Output);
  'impact'?: (_issue_ImpactEnum__Output);
  'priority'?: (string);
}
