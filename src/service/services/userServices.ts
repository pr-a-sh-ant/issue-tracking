import { status, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

// Importing the generated types
import { LoginRequest } from "../../proto/user/LoginRequest";
import { LoginResponse } from "../../proto/user/LoginResponse";
import { RegisterRequest } from "../../proto/user/RegisterRequest";
import { RegisterResponse } from "../../proto/user/RegisterResponse";
import { AdminRegisterResponse } from "../../proto/user/AdminRegisterResponse";
import { ForgetPasswordRequest } from "../../proto/user/ForgetPasswordRequest";
import { ForgetPasswordResponse } from "../../proto/user/ForgetPasswordResponse";
import { ResetPasswordRequest } from "../../proto/user/ResetPasswordRequest";
import { ResetPasswordResponse } from "../../proto/user/ResetPasswordResponse";
import { SendOTPRequest } from "src/proto/user/SendOTPRequest";
import { SendOTPResponse } from "src/proto/user/SendOTPResponse";
import { VerifyOTPRequest } from "src/proto/user/VerifyOTPRequest";
import { VerifyOTPResponse } from "src/proto/user/VerifyOTPResponse";

// Importing the helper functions and models
import UserModel from "../model/userModel";
import { generateToken } from "../../utils/token";
import { setToken } from "../../redis/tokenCache";
import sendOTPUtils from "../../utils/sendOTPUtils";
import { validateOTPCache, removeOTP } from "../../redis/OTPCache";
import crypto from "crypto";
import { storeResetToken, verifyResetToken } from "../../redis/tokenCache";

function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

const LoginRequest = async (
  call: ServerUnaryCall<LoginRequest, LoginResponse>,
  callback: sendUnaryData<LoginResponse>
) => {
  try {
    const { email, password, phone } = call.request;
    const data = await UserModel.LoginUser({ email, password, phone });
    const token = generateToken({ userId: data.id, role: data.role }, 3600);
    await setToken(token, data.id.toString(), 3600);
    callback(null, {
      message: "Login successful",
      token: token,
      role: data.role,
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      details: error.message || "Internal server error",
    });
  }
};

const RegisterUser = async (
  call: ServerUnaryCall<RegisterRequest, RegisterResponse>,
  callback: sendUnaryData<RegisterResponse>
) => {
  try {
    const userDetail = call.request;
    const data = await UserModel.RegisterUser(userDetail);
    const token = generateToken({ userId: data.insertId, role: "user" }, 3600);
    await setToken(token, data.insertId.toString(), 3600);
    callback(null, {
      message: "Registration successful",
      token: token,
      role: "user",
    });
  } catch (error: any) {
    console.error("Error in RegisterUser:", error);
    callback({
      code: status.INTERNAL,
      details: error.message || "Internal server error",
    });
  }
};

const AdminRegisterUser = async (
  call: ServerUnaryCall<RegisterRequest, AdminRegisterResponse>,
  callback: sendUnaryData<AdminRegisterResponse>
) => {
  try {
    const userDetail = call.request;
    const data = await UserModel.RegisterUser(userDetail, "admin");
    callback(null, {
      message: "Registration successful",
      adminId: data.insertId.toString(),
      email: userDetail.email,
      password: userDetail.password,
    });
  } catch (error: any) {
    console.error("Error in RegisterUser:", error);
    callback({
      code: status.INTERNAL,
      details: error.message || "Internal server error",
    });
  }
};
const forgetPassword = async (
  call: ServerUnaryCall<ForgetPasswordRequest, ForgetPasswordResponse>,
  callback: sendUnaryData<ForgetPasswordResponse>
) => {
  try {
    const { password, token } = call.request;
    const userInfo = await verifyResetToken(token);
    const result = await UserModel.forgetPassword(userInfo, password);
    callback(null, { message: result.message || "Password reset successful" });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      details: error.message || "Internal server error",
    });
  }
};

const resetPassword = async (
  call: ServerUnaryCall<ResetPasswordRequest, ResetPasswordResponse>,
  callback: sendUnaryData<ResetPasswordResponse>
) => {
  try {
    const { currentPassword, newPassword } = call.request;
    //@ts-ignore
    const userId = call.user?.userId;

    const result = await UserModel.resetPassword(
      userId,
      currentPassword,
      newPassword
    );
    callback(null, { message: result.message || "Password reset successful" });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      details: error.message || "Internal server error",
    });
  }
};
const sendOTP = async (
  call: ServerUnaryCall<SendOTPRequest, SendOTPResponse>,
  callback: sendUnaryData<SendOTPResponse>
) => {
  try {
    const { email, phone } = call.request;
    //verify the email or phone number
    const result = await UserModel.verifyUser(email, phone);

    // implement the logic inside sendOTPUtils
    sendOTPUtils(email, parseInt(phone));

    callback(null, {
      message: `OTP sent to ${email || phone}`,
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      details: error.message || "Internal server error",
    });
  }
};

const verifyOTP = async (
  call: ServerUnaryCall<VerifyOTPRequest, VerifyOTPResponse>,
  callback: sendUnaryData<VerifyOTPResponse>
) => {
  try {
    const { otp, email, phone } = call.request;
    const userDetail = email !== "" ? email : phone;
    console.log("User detail for OTP verification:", userDetail);
    const response = await validateOTPCache(userDetail);
    const token = generateResetToken();
    storeResetToken(token, userDetail);
    if (response !== parseInt(otp)) {
      callback({
        code: status.INVALID_ARGUMENT,
        details: "Invalid OTP",
      });
    }
    removeOTP(email !== "" ? email : phone);

    callback(null, {
      message: "OTP verified successfully",
      token: token,
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      details: error.message || "Internal server error",
    });
  }
};

const userHandler = {
  LoginRequest,
  RegisterUser,
  AdminRegisterUser,
  forgetPassword,
  resetPassword,
  sendOTP,
  verifyOTP,
};

export default userHandler;
