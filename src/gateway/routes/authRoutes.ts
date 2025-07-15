import express from "express";
import authViews from "../views/authViews";

const authRouter = express.Router();

authRouter.post("/login", authViews.login);
authRouter.post("/register", authViews.register);

authRouter.post("/create-admin", authViews.createAdmin);

export default authRouter;
