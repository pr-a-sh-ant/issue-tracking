import express from "express";
import issueViews from "../views/issueViews";
import setMetadata from "../middleware/setMetadata";
import multer from "multer";

const issueRouter = express.Router();

const upload = multer({ dest: "uploads/" });

issueRouter.use(setMetadata);

issueRouter.post("/create", issueViews.createIssue);
issueRouter.get("/get-issue/:issueId", issueViews.getIssue);
issueRouter.get("/get-issue", issueViews.listIssues);
issueRouter.get("/all-issues", issueViews.getAllIssues);
issueRouter.post("/assign-issue/:issueId", issueViews.assignIssue);
issueRouter.patch("/get-issue/:issueId", issueViews.updateIssueDetails);
issueRouter.patch(
  "/update-issue-priority-impact/:issueId",
  issueViews.updateIssuePriorityImpact
);
issueRouter.get("/dashboard-issues", issueViews.dashboardIssues);
issueRouter.post("/resolve-issue/:issueId", issueViews.resolveIssue);
issueRouter.delete("/delete-issue/:issueId", issueViews.deleteIssue);

issueRouter.post(
  "/upload/:issueId",
  upload.single("file"),
  issueViews.uploadFile
);

export default issueRouter;
