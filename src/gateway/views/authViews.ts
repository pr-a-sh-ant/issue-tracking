import { userClient } from "../client";
import { Request, response, Response } from "express";
import { Metadata } from "@grpc/grpc-js";
import { RequestWithMetadata } from "../middleware/setMetadata";

const login = async (req: Request, res: Response) => {
  try {
    const { email, phone, password } = req.body;
    userClient.LoginUser(
      {
        email,
        phone,
        password,
      },
      function (error, response) {
        if (error) {
          return res.status(500).json({ error: error.details });
        }
        res.status(200).json({
          message: response.message,
          role: response.role,
          token: response.token,
        });
      }
    );
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, name, phone, password } = req.body;

    userClient.RegisterUser(
      {
        name,
        email,
        phone,
        password,
      },
      function (error, response) {
        if (error) {
          return res.status(500).json({ error: error.details });
        }
        res.status(200).json({
          message: response.message,
          role: response.role,
          token: response.token,
        });
      }
    );
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const createAdmin = async (req: Request, res: Response) => {
  try {
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
          return res.status(500).json({ error: error.details });
        }
        res.status(200).json({
          message: response.message,
          adminId: response.adminId,
          email: response.email,
          password: response.password,
        });
      }
    );
  } catch (error: any) {
    console.error("Admin creation failed:", error);
    res.status(500).json({ error: error.message || "Admin creation failed" });
  }
};

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.body;
    userClient.SendOTP({ email, phone }, (error, response) => {
      if (error) {
        return res.status(500).json({ error: error.details });
      }
      res.status(200).json({
        message: response.message,
      });
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to send OTP" });
  }
};

const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp, phone } = req.body;
    userClient.verifyOTP(
      { email, otp: otp.toString(), phone: phone.toString() },
      (error, response) => {
        if (error) {
          return res.status(500).json({ error: error.details });
        }
        res.status(200).json({
          message: response.message,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to verify OTP" });
  }
};

const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email, phone, password } = req.body;
    userClient.ForgetPassword({ email, phone, password }, (error, response) => {
      if (error) {
        return res.status(500).json({ error: error.details });
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

const resetPassword = async (req: RequestWithMetadata, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    userClient.ResetPassword(
      { currentPassword, newPassword },
      req.metadata,
      (error, response) => {
        if (error) {
          return res.status(500).json({ error: error.details });
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

const authViews = {
  login,
  register,
  createAdmin,
  sendOtp,
  verifyOTP,
  forgetPassword,
  resetPassword,
};

export default authViews;
