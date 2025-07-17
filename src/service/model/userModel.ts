import pool from "../../db/db";
import { RowDataPacket, OkPacketParams } from "mysql2";
import bcrypt from "bcrypt";
import { RegisterRequest } from "../../proto/user/RegisterRequest";
import mysql2 from "mysql2/promise";
import { userInfo } from "os";

export interface User {
  id: number;
  name: string;
  password: string;
  role: string;
}

const LoginUser = async ({
  email,
  password,
  phone,
}: {
  email: string | null;
  password: string;
  phone: string | null;
}) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT u.id, u.password, u.role FROM users as u WHERE email = ? OR phone = ?",
      [email, phone]
    );
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    const user = rows[0] as User;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  } catch (error: any) {
    throw new Error(error.message || "Database error");
  }
};

const RegisterUser = async (data: RegisterRequest, role: string = "user") => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const email = data.email && data.email.trim() !== "" ? data.email : null;
    const phone = data.phone && data.phone.trim() !== "" ? data.phone : null;
    const userData = {
      ...data,
      password: hashedPassword,
      email: email,
      phone: phone,
      role: role,
      createdAt: new Date(),
    };

    const fields = Object.keys(userData).join(", ");
    const values = Object.values(userData);
    const placeholders = Object.keys(userData)
      .map(() => "?")
      .join(", ");
    const sql = mysql2.format(
      `INSERT INTO users (${fields}) VALUES (${placeholders})`,
      values
    );

    const [result] = await pool.query<RowDataPacket[]>(sql);
    return result as OkPacketParams;
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("Email or phone already exists");
    }
    throw new Error(error.message || "Database error");
  }
};

const verifyUser = async (email: string | null, phone: string | null) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    );
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    return rows[0] as { userID: number };
  } catch (error: any) {
    throw new Error(error.message || "Database error");
  }
};

const forgetPassword = async (userInfo: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query<RowDataPacket[]>(
      "UPDATE users SET password = ? WHERE email = ? OR phone = ?",
      [hashedPassword, userInfo, userInfo]
    );
    const affectedRows = (result as OkPacketParams).affectedRows;
    if (affectedRows === 0) {
      throw new Error("User not found or no changes made");
    }
    return { message: "Password updated successfully" };
  } catch (error: any) {
    throw new Error(error.message || "Database error");
  }
};

const resetPassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT  u.password, u.role FROM users as u WHERE id = ?",
      [userId]
    );
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    const user = rows[0] as User;
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await pool.query<RowDataPacket[]>(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedNewPassword, userId]
    );
    const affectedRows = (result as OkPacketParams).affectedRows;
    if (affectedRows === 0) {
      throw new Error("User not found or no changes made");
    }
    return { message: "Password reset successfully" };
  } catch (error: any) {
    throw new Error(error.message || "Database error");
  }
};

const UserModel = {
  LoginUser,
  RegisterUser,
  verifyUser,
  forgetPassword,
  resetPassword,
};

export default UserModel;
