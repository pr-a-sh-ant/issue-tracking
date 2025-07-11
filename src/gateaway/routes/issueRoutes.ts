import express from "express";
import issueViews from "../views/issueViews";

const issueRouter = express.Router();

issueRouter.post("/create", issueViews.createIssue);
issueRouter.get("/get-issue/:issueId", issueViews.getIssue);
issueRouter.get("/get-issue", issueViews.listIssues);
issueRouter.get("/all-issues", issueViews.getAllIssues);

export default issueRouter;
