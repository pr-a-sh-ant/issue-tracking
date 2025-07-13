import express from "express";
import issueViews from "../views/issueViews";
import setMetadata from "../middleware/setMetadata";

const issueRouter = express.Router();

issueRouter.use(setMetadata);

issueRouter.post("/create", issueViews.createIssue);
issueRouter.get("/get-issue/:issueId", issueViews.getIssue);
issueRouter.get("/get-issue", issueViews.listIssues);
issueRouter.get("/all-issues", issueViews.getAllIssues);
issueRouter.post("/assign-issue/:issueId", issueViews.assignIssue);

export default issueRouter;
