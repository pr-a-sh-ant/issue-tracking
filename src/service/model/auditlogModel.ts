import pool from "../../db/db";
import mysql2, { RowDataPacket, QueryResult } from "mysql2/promise";
import { LogEvent } from "../../proto/auditlog/LogEvent";

export interface LogEventTable {
  action: string;
  details: string;
  issue_id: number;
  log_date: Date;
  user_id: string;
}

const getAllLogEvents = async (page: number, limit: number) => {
  try {
    const sql = mysql2.format(
      "SELECT l.log_id, l.action, l.details, l.issue_id, l.log_date, u.name FROM audit_logs as l INNER JOIN users u ON l.user_id = u.id ORDER BY log_date DESC LIMIT ? OFFSET ?",
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

const createAuditLogEvent = async (logDetail: LogEventTable) => {
  try {
    const fields = Object.keys(logDetail).join(", ");
    const values = Object.values(logDetail);
    const placeholders = Object.keys(logDetail)
      .map(() => "?")
      .join(", ");
    const sql = mysql2.format(
      `INSERT INTO audit_logs (${fields}) VALUES (${placeholders})`,
      values
    );
    await pool.query<RowDataPacket[]>(sql);
  } catch (error: any) {
    throw new Error(
      error.message || "Internal server error while creating audit log event"
    );
  }
};

const auditlogModel = { getAllLogEvents, createAuditLogEvent };

export default auditlogModel;
