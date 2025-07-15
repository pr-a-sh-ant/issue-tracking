import pool from "../../db/db";
import mysql2, { RowDataPacket } from "mysql2/promise";
import { LogEvent } from "../../proto/auditlog/LogEvent";

const getAllLogEvents = async (page: number, limit: number) => {
  try {
    const sql = mysql2.format(
      "SELECT l.log_id, l.action, l.details, l.issue_id, l.log_date, u.name FROM audit_log as l INNER JOIN users u ON l.user_id = u.id ORDER BY log_date DESC LIMIT ? OFFSET ?",
      [limit, (page - 1) * limit]
    );
    const [rows] = await pool.query<RowDataPacket[]>(sql);

    if (rows.length === 0) {
      return [];
    }
    return rows as LogEvent[];
  } catch (error: any) {
    throw new Error(
      error.message || "Internal server error while fetching log events"
    );
  }
};

const auditlogModel = { getAllLogEvents };

export default auditlogModel;
