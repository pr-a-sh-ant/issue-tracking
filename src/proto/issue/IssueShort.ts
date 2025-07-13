// Original file: src/proto/issue.proto

import type { StatusEnum as _issue_StatusEnum, StatusEnum__Output as _issue_StatusEnum__Output } from '../issue/StatusEnum';
import type { ImpactEnum as _issue_ImpactEnum, ImpactEnum__Output as _issue_ImpactEnum__Output } from '../issue/ImpactEnum';

export interface IssueShort {
  'issueId'?: (string);
  'title'?: (string);
  'status'?: (_issue_StatusEnum);
  'priority'?: (string);
  'impact'?: (_issue_ImpactEnum);
  'createdBy'?: (string);
  'createdAt'?: (string);
}

export interface IssueShort__Output {
  'issueId'?: (string);
  'title'?: (string);
  'status'?: (_issue_StatusEnum__Output);
  'priority'?: (string);
  'impact'?: (_issue_ImpactEnum__Output);
  'createdBy'?: (string);
  'createdAt'?: (string);
}
