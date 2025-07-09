import pool from "../../db/db";
import mysql2, { RowDataPacket, OkPacketParams } from "mysql2/promise";
import { CreateIssueRequest } from "src/proto/issue/CreateIssueRequest";
import { Issue } from "../../proto/issue/Issue";

interface CreateIssueRequestwithUserId extends CreateIssueRequest {
  created_by: number;
  created_at: Date;
  updated_at: Date;
}

const createIssue = async (
  issue: CreateIssueRequestwithUserId
): Promise<OkPacketParams> => {
  try {
    const fields = Object.keys(issue).join(", ");
    const values = Object.values(issue);
    const placeholders = Object.keys(issue)
      .map(() => "?")
      .join(", ");
    const sql = mysql2.format(
      `INSERT INTO issues (${fields}) VALUES (${placeholders})`,
      values
    );
    const [result] = await pool.query<RowDataPacket[]>(sql);
    return result as OkPacketParams;
  } catch (error: any) {
    throw new Error(`Error creating issue: ${error.message}`);
  }
};

const getIssue = async (issueId: number) => {
  try {
    const sql = mysql2.format(
      "SELECT i.issue_id, i.title, i.description, i.status, i.urgency, i.impact, u.name as created_by, i.admin_id, i.created_at, i.updated_at, i.priority FROM issues i INNER JOIN users u ON i.created_by = u.id WHERE issue_id = ?",
      [issueId]
    );
    const [rows] = await pool.query<RowDataPacket[]>(sql);
    if (rows.length === 0) {
      throw new Error("Issue not found");
    }
    return rows[0] as Issue;
  } catch (error: any) {
    throw new Error(`Error fetching issue: ${error.message}`);
  }
};

const issueModel = { createIssue, getIssue };

export default issueModel;
