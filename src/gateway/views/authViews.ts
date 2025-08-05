import { userClient } from "../client";
import { Request, Response, NextFunction } from "express";
import { isEmail, isMobilePhone } from "validator";
import { Metadata } from "@grpc/grpc-js";
import { RequestWithMetadata } from "../middleware/setMetadata";
import AppError from "../../utils/appError";

const validateEmailOrPhone = (email: string, phone: string) => {
  if (!email && !phone) {
    throw new Error("Either email or phone must be provided");
  }
  if (email && !isEmail(email)) {
    throw new Error("Invalid email format");
  }
  if (phone && !isMobilePhone(phone, "ne-NP")) {
    throw new Error("Invalid phone format");
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, phone, password } = req.body;
    validateEmailOrPhone(email, phone);
    userClient.LoginUser(
      {
        email,
        phone,
        password,
      },
      function (error, response) {
        if (error) {
          return next(
            new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
          );
        }
        res.status(200).json({
          message: response.message,
          role: response.role,
          token: response.token,
        });
      }
    );
  } catch (error: any | AppError) {
    return next(new AppError(error.message || "Login failed", 400));
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, phone, password } = req.body;
    validateEmailOrPhone(email, phone);

    userClient.RegisterUser(
      {
        name,
        email,
        phone,
        password,
      },
      function (error, response) {
        if (error) {
          return next(
            new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
          );
        }
        res.status(200).json({
          message: response.message,
          role: response.role,
          token: response.token,
        });
      }
    );
  } catch (error: any) {
    return next(new AppError(error.message || "Registration Failed", 400));
  }
};

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next(new AppError("Token Required", 401));
  }
  const { email, name, phone, password } = req.body;
  const metadata = new Metadata();
  metadata.set("authorization", req.headers.authorization || "");
  userClient.CreateAdminUser(
    {
      name,
      email,
      phone,
      password,
    },
    metadata,
    function (error, response) {
      if (error) {
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(200).json({
        message: response.message,
        adminId: response.adminId,
        email: response.email,
        password: response.password,
      });
    }
  );
};

const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, phone } = req.body;
    userClient.SendOTP({ email, phone }, (error, response) => {
      if (error) {
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(200).json({
        message: response.message,
      });
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to send OTP" });
  }
};

const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp, phone } = req.body;
    userClient.verifyOTP(
      { email, otp: otp.toString(), phone: phone },
      (error, response) => {
        if (error) {
          return next(
            new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
          );
        }
        res.status(200).json({
          message: response.message,
          token: response.token,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to verify OTP" });
  }
};

const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    userClient.ForgetPassword({ token, password }, (error, response) => {
      if (error) {
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(200).json({
        message: response.message,
      });
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to process request" });
  }
};

const resetPassword = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword } = req.body;
    userClient.ResetPassword(
      { currentPassword, newPassword },
      req.metadata,
      (error, response) => {
        if (error) {
          return next(
            new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
          );
        }
        res.status(200).json({
          message: response.message,
        });
      }
    );
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to reset password" });
  }
};

const getMe = async (
  req: RequestWithMetadata,
  res: Response,
  next: NextFunction
) => {
  try {
    userClient.GetMe({}, req.metadata, (error, response) => {
      if (error) {
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(200).json({
        name: response.name,
        email: response.email,
        phone: response.phone,
        role: response.role,
        message: response.message,
      });
    });
  } catch (error: any) {
    return next(new AppError(error.message || "Failed to get user info", 500));
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    if (!token) {
      return next(new AppError("Token is required", 400));
    }
    userClient.RefreshToken({ token }, (error, response) => {
      if (error) {
        return next(
          new AppError(error.message, AppError.mapGRPCCodeToHTTP(error.code))
        );
      }
      res.status(200).json({
        message: response.message,
        token: response.token,
      });
    });
  } catch (error: any) {
    return next(new AppError(error.message || "Failed to refresh token", 500));
  }
};

const authViews = {
  login,
  register,
  createAdmin,
  sendOtp,
  verifyOTP,
  forgetPassword,
  resetPassword,
  getMe,
  refreshToken,
};

export default authViews;
