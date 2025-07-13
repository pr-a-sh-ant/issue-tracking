// Original file: src/proto/issue.proto

import type { ImpactEnum as _issue_ImpactEnum, ImpactEnum__Output as _issue_ImpactEnum__Output } from '../issue/ImpactEnum';
import type { UrgencyEnum as _issue_UrgencyEnum, UrgencyEnum__Output as _issue_UrgencyEnum__Output } from '../issue/UrgencyEnum';

export interface UpdateIssuePriorityImpactRequest {
  'issueId'?: (string);
  'priority'?: (string);
  'impact'?: (_issue_ImpactEnum);
  'urgency'?: (_issue_UrgencyEnum);
}

export interface UpdateIssuePriorityImpactRequest__Output {
  'issueId'?: (string);
  'priority'?: (string);
  'impact'?: (_issue_ImpactEnum__Output);
  'urgency'?: (_issue_UrgencyEnum__Output);
}
