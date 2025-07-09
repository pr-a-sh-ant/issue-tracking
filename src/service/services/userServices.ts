import { status, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

// Importing the generated types
import { LoginRequest } from "../../proto/user/LoginRequest";
import { LoginResponse } from "../../proto/user/LoginResponse";
import { RegisterRequest } from "../../proto/user/RegisterRequest";
import { RegisterResponse } from "../../proto/user/RegisterResponse";
import { AdminRegisterResponse } from "../../proto/user/AdminRegisterResponse";

// Importing the helper functions and models
import UserModel from "../model/userModel";
import { generateToken } from "../../utils/token";
import { setToken } from "../../redis/tokenCache";

const LoginRequest = async (
  call: ServerUnaryCall<LoginRequest, LoginResponse>,
  callback: sendUnaryData<LoginResponse>
) => {
  try {
    const { email, password, phone } = call.request;
    const data = await UserModel.LoginUser({ email, password, phone });
    const token = generateToken(data.id, data.role, 3600);
    await setToken(token, data.id.toString(), 3600);
    callback(null, {
      message: "Login successful",
      token: token,
      role: data.role,
    });
  } catch (error: any) {
    console.error("Error in LoginRequest:", error);
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
    const token = generateToken(data.insertId, "user", 3600);
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

const userHandler = {
  LoginUser: LoginRequest,
  RegisterUser: RegisterUser,
  CreateAdminUser: AdminRegisterUser,
};

export default userHandler;
