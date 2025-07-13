// Original file: src/proto/issue.proto

import type { IssueShort as _issue_IssueShort, IssueShort__Output as _issue_IssueShort__Output } from '../issue/IssueShort';

export interface ListIssuesResponse {
  'issues'?: (_issue_IssueShort)[];
  'message'?: (string);
}

export interface ListIssuesResponse__Output {
  'issues'?: (_issue_IssueShort__Output)[];
  'message'?: (string);
}
