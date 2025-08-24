import { IssueShort } from "../proto/issue/IssueShort";
import { ListIssuesResponse } from "src/proto/issue/ListIssuesResponse";

const formatIssue = (response: ListIssuesResponse) => {
  const P1: IssueShort[] = [];
  const P2: IssueShort[] = [];
  const P3: IssueShort[] = [];
  const P4: IssueShort[] = [];

  response.issues?.forEach((issue) => {
    if (issue.priority === "P1") P1.push(issue);
    else if (issue.priority === "P2") P2.push(issue);
    else if (issue.priority === "P3") P3.push(issue);
    else P4.push(issue);
  });

  return {
    ...response,
    P1,
    P2,
    P3,
    P4,
  };
};

export default formatIssue;
