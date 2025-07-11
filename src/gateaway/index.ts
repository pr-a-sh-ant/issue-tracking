import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes";

const userApp = express();
const issueApp = express();

userApp.use(bodyParser.json());
issueApp.use(bodyParser.json());

userApp.use(cors());
issueApp.use(cors());

userApp.use("/api/v1/auth", authRouter);

userApp.listen(3000, () => {
  console.log("User Client is running on http://localhost:3000");
});
