// Original file: src/proto/issue.proto

import type { UrgencyEnum as _issue_UrgencyEnum, UrgencyEnum__Output as _issue_UrgencyEnum__Output } from '../issue/UrgencyEnum';
import type { ImpactEnum as _issue_ImpactEnum, ImpactEnum__Output as _issue_ImpactEnum__Output } from '../issue/ImpactEnum';

export interface CreateIssueRequest {
  'title'?: (string);
  'description'?: (string);
  'urgency'?: (_issue_UrgencyEnum);
  'impact'?: (_issue_ImpactEnum);
}

export interface CreateIssueRequest__Output {
  'title'?: (string);
  'description'?: (string);
  'urgency'?: (_issue_UrgencyEnum__Output);
  'impact'?: (_issue_ImpactEnum__Output);
}
