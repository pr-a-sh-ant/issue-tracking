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

const assignIssue = async (issueId: number, adminId: number) => {
  try {
    // First, check if the issue is already assigned
    const checkSql = mysql2.format(
      "SELECT admin_id FROM issues WHERE issue_id = ?",
      [issueId]
    );
    const [rows] = await pool.query<RowDataPacket[]>(checkSql);
    if (rows.length === 0) {
      throw new Error("Issue not found");
    }
    if (rows[0].admin_id !== null) {
      throw new Error("Issue is already assigned");
    }

    // Assign the issue
    const sql = mysql2.format(
      "UPDATE issues SET admin_id = ? WHERE issue_id = ?",
      [adminId, issueId]
    );
    const [result] = await pool.query<RowDataPacket[]>(sql);
    console.log(result);
    return { message: "Issue assigned successfully" };
  } catch (error: any) {
    throw new Error(`Error assigning issue: ${error.message}`);
  }
};

const listIssuesByUser = async (userId: number) => {
  try {
    const sql = mysql2.format(
      "SELECT i.issue_id, i.title, i.description, i.status, i.urgency, i.impact, u.name as created_by, i.admin_id, i.created_at, i.updated_at, i.priority FROM issues i INNER JOIN users u ON i.created_by = u.id WHERE i.created_by = ?",
      [userId]
    );
    const [rows] = await pool.query<RowDataPacket[]>(sql);
    if (rows.length === 0) {
      throw new Error("No issues found for this user");
    }
    return rows as Issue[];
  } catch (error: any) {
    throw new Error(`Error listing issues: ${error.message}`);
  }
};

const listAllIssues = async () => {
  try {
    const sql = `SELECT i.issue_id, i.title, i.description, i.status, i.urgency, i.impact, u.name as created_by, i.admin_id, i.created_at, i.updated_at, i.priority FROM issues i INNER JOIN users u ON i.created_by = u.id`;
    const [rows] = await pool.query<RowDataPacket[]>(sql);
    return rows as Issue[];
  } catch (error: any) {
    throw new Error(`Error listing all issues: ${error.message}`);
  }
};

const issueModel = {
  createIssue,
  getIssue,
  assignIssue,
  listIssuesByUser,
  listAllIssues,
};

export default issueModel;
