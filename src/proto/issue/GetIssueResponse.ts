// Original file: src/proto/issue.proto

import type { Issue as _issue_Issue, Issue__Output as _issue_Issue__Output } from '../issue/Issue';

export interface GetIssueResponse {
  'Issue'?: (_issue_Issue | null);
  'message'?: (string);
}

export interface GetIssueResponse__Output {
  'Issue'?: (_issue_Issue__Output);
  'message'?: (string);
}
