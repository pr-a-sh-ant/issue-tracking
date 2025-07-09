import pool from "../../db/db";
import { RowDataPacket, OkPacketParams } from "mysql2";
import bcrypt from "bcrypt";
import { RegisterRequest } from "../../proto/user/RegisterRequest";
import mysql2 from "mysql2/promise";

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
      "SELECT user.id, user.password, user.role FROM users WHERE email = ? OR phone = ?",
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

const UserModel = { LoginUser, RegisterUser };

export default UserModel;
