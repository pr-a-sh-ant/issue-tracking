import pool from "../../db/db";
import mysql2, { RowDataPacket, OkPacketParams } from "mysql2/promise";
import { CreateIssueRequest } from "../../proto/issue/CreateIssueRequest";
import { Issue } from "../../proto/issue/Issue";
import { Comment } from "../../proto/issue/Comment";

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

const getIssue = async (issueId: number, role: string, userId: number) => {
  try {
    const isAdmin = role === "admin";
    const sql = mysql2.format(
      "SELECT i.issue_id, i.title, i.description, i.status, i.urgency, i.impact, u.name as created_by, i.admin_id, i.created_at, i.updated_at, u.id, i.priority FROM issues i INNER JOIN users u ON i.created_by = u.id WHERE issue_id = ?",
      [issueId]
    );

    const [rows] = await pool.query<RowDataPacket[]>(sql);
    if (rows.length === 0) {
      throw new Error("Issue not found");
    }
    if (!isAdmin && rows[0].id !== userId) {
      throw new Error("You do not have permission to view this issue");
    }

    const commentSql = mysql2.format(
      "SELECT c.id, c.content, u.name as user_name, c.created_at FROM comment c INNER JOIN users u ON c.user_id = u.id WHERE c.issue_id = ?",
      [issueId]
    );
    const [commentRows] = await pool.query<RowDataPacket[]>(commentSql);

    return {
      issue: rows[0] as Issue,
      comments: commentRows as Comment[],
    };
  } catch (error: any) {
    throw new Error(`Error fetching issue: ${error.message}`);
  }
};

const assignIssue = async (issueId: number, adminId: number) => {
  try {
    // check if the issue is already assigned
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
      "UPDATE issues SET status='ACK', admin_id = ? WHERE issue_id = ?",
      [adminId, issueId]
    );
    const [result] = await pool.query<RowDataPacket[]>(sql);
    return { message: "Issue assigned successfully" };
  } catch (error: any) {
    throw new Error(`Error assigning issue: ${error.message}`);
  }
};

const listIssuesByUser = async (
  userId: number,
  page: number,
  limit: number
) => {
  try {
    const sql = mysql2.format(
      "SELECT i.issue_id, i.title, i.status,i.impact, u.name as created_by, i.admin_id, i.created_at, i.priority FROM issues i INNER JOIN users u ON i.created_by = u.id where i.created_by = ? LIMIT ? OFFSET ?",
      [userId, limit, (page - 1) * limit]
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

const listAllIssues = async (page: number, limit: number) => {
  try {
    const sql = mysql2.format(
      "SELECT i.issue_id, i.title, i.status, i.impact, u.name as created_by, i.admin_id, i.created_at, i.priority FROM issues i INNER JOIN users u ON i.created_by = u.id LIMIT ? OFFSET ?",
      [limit, (page - 1) * limit]
    );
    const [rows] = await pool.query<RowDataPacket[]>(sql);
    return rows as Issue[];
  } catch (error: any) {
    throw new Error(`Error listing all issues: ${error.message}`);
  }
};

const updateIssueDetails = async (
  issueId: number,
  description: string,
  user_id: number
) => {
  try {
    const sql = mysql2.format(
      "UPDATE issues SET description = ?, updated_at = NOW() WHERE issue_id = ? AND created_by = ?",
      [description, issueId, user_id]
    );
    const [result] = await pool.query<RowDataPacket[]>(sql);
    const affectedRows = (result as OkPacketParams).affectedRows;
    if (affectedRows === 0) {
      throw new Error(
        "Issue not found or you do not have permission to update it"
      );
    }
    return { message: "Issue updated successfully" };
  } catch (error: any) {
    throw new Error(`Error updating issue details: ${error.message}`);
  }
};

const updateIssuePriorityImpact = async (
  issueId: number,
  priority: string,
  impact: string | number,
  urgency: string | number
) => {
  try {
    const sql = mysql2.format(
      "UPDATE issues SET priority = ?, impact = ?, urgency = ?, updated_at = NOW() WHERE issue_id = ?",
      [priority, impact, urgency, issueId]
    );
    const [result] = await pool.query<RowDataPacket[]>(sql);
    const affectedRows = (result as OkPacketParams).affectedRows;
    if (affectedRows === 0) {
      throw new Error(
        "Issue not found or you do not have permission to update it"
      );
    }
    return { message: "Issue priority and impact updated successfully" };
  } catch (error: any) {
    throw new Error(
      `Error updating issue priority and impact: ${error.message}`
    );
  }
};

const resolveIssue = async (
  issueId: number,
  resolution: string | number,
  adminId: string
) => {
  try {
    const sql = mysql2.format(
      "UPDATE issues SET status = ?, updated_at = NOW() WHERE issue_id = ? and admin_id = ?",
      [resolution, issueId, adminId]
    );
    const [result] = await pool.query<RowDataPacket[]>(sql);
    const affectedRows = (result as OkPacketParams).affectedRows;
    if (affectedRows === 0) {
      throw new Error(
        "Issue not found or you do not have permission to resolve it"
      );
    }
    return { message: "Issue resolved successfully" };
  } catch (error: any) {
    throw new Error(`Error resolving issue: ${error.message}`);
  }
};

const issueModel = {
  resolveIssue,
  updateIssuePriorityImpact,
  updateIssueDetails,
  createIssue,
  getIssue,
  assignIssue,
  listIssuesByUser,
  listAllIssues,
};

export default issueModel;
