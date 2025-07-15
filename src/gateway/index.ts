import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import issueRouter from "./routes/issueRoutes";
import commentRouter from "./routes/commentRouter";
import auditLogRouter from "./routes/auditLogRoutes";

const userApp = express();
const issueApp = express();

userApp.use(bodyParser.json());
issueApp.use(bodyParser.json());

userApp.use(cors());
issueApp.use(cors());

userApp.use("/api/v1/auth", authRouter);
issueApp.use("/api/v1/issue", issueRouter);
issueApp.use("/api/v1/comment", commentRouter);
issueApp.use("/api/v1/logs", auditLogRouter);

userApp.listen(3000, () => {
  console.log("User Client is running on http://localhost:3000");
});

issueApp.listen(3001, () => {
  console.log("Issue Client is running on http://localhost:3001");
});
