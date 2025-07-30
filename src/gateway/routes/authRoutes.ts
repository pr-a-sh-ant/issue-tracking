import express from "express";
import authViews from "../views/authViews";
import setMetadata from "../middleware/setMetadata";

const authRouter = express.Router();

authRouter.post("/login", authViews.login);
authRouter.post("/register", authViews.register);
authRouter.post("/send-otp", authViews.sendOtp);
authRouter.post("/verify-otp", authViews.verifyOTP);
authRouter.post("/forgot-password/:token", authViews.forgetPassword);

authRouter.use(setMetadata);
authRouter.get("/get-me", authViews.getMe);

authRouter.post("/reset-password", authViews.resetPassword);

authRouter.post("/create-admin", authViews.createAdmin);

export default authRouter;
