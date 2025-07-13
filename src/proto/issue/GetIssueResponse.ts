// Original file: src/proto/issue.proto

import type { Issue as _issue_Issue, Issue__Output as _issue_Issue__Output } from '../issue/Issue';
import type { Comment as _issue_Comment, Comment__Output as _issue_Comment__Output } from '../issue/Comment';

export interface GetIssueResponse {
  'Issue'?: (_issue_Issue | null);
  'comments'?: (_issue_Comment)[];
  'message'?: (string);
}

export interface GetIssueResponse__Output {
  'Issue'?: (_issue_Issue__Output);
  'comments'?: (_issue_Comment__Output)[];
  'message'?: (string);
}
