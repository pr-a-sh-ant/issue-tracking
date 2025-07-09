// Original file: src/proto/issue.proto

import type { Issue as _issue_Issue, Issue__Output as _issue_Issue__Output } from '../issue/Issue';

export interface ListIssuesResponse {
  'issues'?: (_issue_Issue)[];
  'message'?: (string);
}

export interface ListIssuesResponse__Output {
  'issues'?: (_issue_Issue__Output)[];
  'message'?: (string);
}
