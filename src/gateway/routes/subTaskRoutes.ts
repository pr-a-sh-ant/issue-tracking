import express from "express";
import subTaskViews from "../views/subTaskViews";
import setMetadata from "../middleware/setMetadata";

const subTaskRouter = express.Router();

subTaskRouter.use(setMetadata);
subTaskRouter.post("/create/:issueId", subTaskViews.createSubTask);
subTaskRouter.post("/complete/:issueId/:taskId", subTaskViews.completeSubTask);

export default subTaskRouter;
