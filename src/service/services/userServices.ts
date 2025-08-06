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
import { GetMeRequest } from "src/proto/user/GetMeRequest";
import { GetMeResponse } from "src/proto/user/GetMeResponse";
import { RefreshTokenRequest } from "src/proto/user/RefreshTokenRequest";
import { RefreshTokenResponse } from "src/proto/user/RefreshTokenResponse";
import { ChangeAdminPasswordRequest } from "src/proto/user/ChangeAdminPasswordRequest";
import { ChangeAdminPasswordResponse } from "src/proto/user/ChangeAdminPasswordResponse";
import { DeleteAdminRequest } from "src/proto/user/DeleteAdminRequest";
import { DeleteAdminResponse } from "src/proto/user/DeleteAdminResponse";
import { GetAllAdminsRequest } from "src/proto/user/GetAllAdminsRequest";
import { GetAllAdminsResponse } from "src/proto/user/GetAllAdminsResponse";

// Importing the helper functions and models
import UserModel from "../model/userModel";
import { validateTokenCache } from "../../redis/tokenCache";
import { generateToken } from "../../utils/token";
import sendOTPUtils from "../../utils/sendOTPUtils";
import {
  validateOTPCache,
  removeOTP,
  incrementTries,
} from "../../redis/OTPCache";
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
    const token = generateToken({ userId: data.id, role: data.role });
    callback(null, {
      message: "Login successful",
      token: token,
      role: data.role,
    });
  } catch (error: any) {
    callback({
      code: status.INVALID_ARGUMENT,
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
    const token = generateToken({ userId: data.insertId, role: "user" });
    callback(null, {
      message: "Registration successful",
      token: token,
      role: "user",
    });
  } catch (error: any) {
    console.error("Error in RegisterUser:", error);
    callback({
      code: status.ALREADY_EXISTS,
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
      code: status.ALREADY_EXISTS,
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
      code: status.INVALID_ARGUMENT,
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
      code: status.INVALID_ARGUMENT,
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
      code: status.INVALID_ARGUMENT,
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
    const response = await validateOTPCache(userDetail);
    if (Number(response.tries) > 3) {
      return callback({
        code: status.PERMISSION_DENIED,
        details: "Too many attempts, please try again later",
      });
    }
    if (Number(response.otp) !== Number(otp)) {
      await incrementTries(userDetail);
      return callback({
        code: status.PERMISSION_DENIED,
        details: "Invalid OTP",
      });
    }
    removeOTP(email !== "" ? email : phone);
    const token = generateResetToken();
    storeResetToken(token, userDetail);

    callback(null, {
      message: "OTP verified successfully",
      token: token,
    });
  } catch (error: any) {
    callback({
      code: status.UNAUTHENTICATED,
      details: error.message || "Internal server error",
    });
  }
};

const getMe = async (
  call: ServerUnaryCall<GetMeRequest, GetMeResponse>,
  callback: sendUnaryData<GetMeResponse>
) => {
  try {
    // @ts-ignore
    const userRole = call.user?.userId;
    const data = await UserModel.getMe(userRole);
    callback(null, {
      email: data.email,
      name: data.name,
      phone: data.phone,
      role: data.role,
      message: "User retrieved successfully",
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      details: error.message || "Internal server error",
    });
  }
};

const refreshToken = async (
  call: ServerUnaryCall<RefreshTokenRequest, RefreshTokenResponse>,
  callback: sendUnaryData<RefreshTokenResponse>
) => {
  try {
    const { token } = call.request;
    const userId = await validateTokenCache(token);
    const userDetail = await UserModel.refreshToken(parseInt(userId));
    if (!userId) {
      return callback({
        code: status.UNAUTHENTICATED,
        details: "Invalid or expired refresh token",
      });
    }
    const newTokens = generateToken(userDetail);
    callback(null, {
      message: "Tokens refreshed successfully",
      token: newTokens,
    });
  } catch (error: any) {
    callback({
      code: status.INTERNAL,
      details: error.message || "Internal server error",
    });
  }
};

const ChangeAdminPassword = async (
  call: ServerUnaryCall<
    ChangeAdminPasswordRequest,
    ChangeAdminPasswordResponse
  >,
  callback: sendUnaryData<ChangeAdminPasswordResponse>
) => {
  try {
    const { adminId, newPassword } = call.request;
    const result = await UserModel.changeAdminPassword(
      parseInt(adminId),
      newPassword
    );
    callback(null, {
      message: result.message || "Password changed successfully",
      newPassword,
    });
  } catch (error: any) {
    callback({
      code: status.INVALID_ARGUMENT,
      details: error.message || "Internal server error",
    });
  }
};

const DeleteAdmin = async (
  call: ServerUnaryCall<DeleteAdminRequest, DeleteAdminResponse>,
  callback: sendUnaryData<DeleteAdminResponse>
) => {
  try {
    const { adminId } = call.request;
    const result = await UserModel.deleteAdmin(parseInt(adminId));
    callback(null, {
      message: result.message || "Admin deleted successfully",
    });
  } catch (error: any) {
    callback({
      code: status.INVALID_ARGUMENT,
      details: error.message || "Internal server error",
    });
  }
};

const GetAllAdmins = async (
  call: ServerUnaryCall<GetAllAdminsRequest, GetAllAdminsResponse>,
  callback: sendUnaryData<GetAllAdminsResponse>
) => {
  try {
    const admins = await UserModel.getAllAdmins();
    callback(null, {
      adminList: admins,
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
  getMe,
  refreshToken,
  ChangeAdminPassword,
  DeleteAdmin,
  GetAllAdmins,
};

export default userHandler;
