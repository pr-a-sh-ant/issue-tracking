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
interface DashboardIssuesResponse {
  newIssues: number;
  ackIssues: number;
  closedIssues: number;
  list?: string[];
}

interface User {
  userId: number;
  role: string;
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
    const isAdmin = role === "admin" || role === "superadmin";
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
      "SELECT c.id, c.content, u.name as userName, c.parent_id as parentId, c.created_at FROM comment c INNER JOIN users u ON c.user_id = u.id WHERE c.issue_id = ?",
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
  role: string,
  page?: number,
  limit?: number,
  priority?: string,
  status?: string
) => {
  try {
    let baseSql =
      "SELECT i.issue_id, i.title, i.status, i.impact, u.name as created_by, i.admin_id, i.created_at, i.priority FROM issues i INNER JOIN users u ON i.created_by = u.id";
    const whereClauses: string[] = [];
    const params: any[] = [];

    if (role === "admin" || role === "superadmin") {
      whereClauses.push("i.admin_id = ?");
      params.push(userId);
    } else {
      whereClauses.push("i.created_by = ?");
      params.push(userId);
    }

    if (priority || priority !== "") {
      whereClauses.push("i.priority = ?");
      params.push(priority);
    }
    if (status || status !== "") {
      whereClauses.push("i.status = ?");
      params.push(status);
    }

    if (whereClauses.length > 0) {
      baseSql += " WHERE " + whereClauses.join(" AND ");
    }

    if (typeof limit === "number" && typeof page === "number") {
      baseSql += " LIMIT ? OFFSET ?";
      params.push(limit, (page - 1) * limit);
    }

    const sql = mysql2.format(baseSql, params);
    const [rows] = await pool.query<RowDataPacket[]>(sql);
    if (rows.length === 0) {
      throw new Error("No issues found for this user");
    }
    return rows as Issue[];
  } catch (error: any) {
    throw new Error(`Error listing issues: ${error.message}`);
  }
};

const listAllIssues = async (
  page?: number,
  limit?: number,
  priority?: string,
  status?: string
) => {
  try {
    let baseSql =
      "SELECT i.issue_id, i.title, i.status, i.impact, u.name as created_by, i.admin_id, i.created_at, i.priority FROM issues i INNER JOIN users u ON i.created_by = u.id";
    const whereClauses: string[] = [];
    const params: any[] = [];

    if (priority || priority !== "") {
      whereClauses.push("i.priority = ?");
      params.push(priority);
    }
    if (status || status !== "") {
      whereClauses.push("i.status = ?");
      params.push(status);
    }

    if (whereClauses.length > 0) {
      baseSql += " WHERE " + whereClauses.join(" AND ");
    }

    if (
      typeof limit === "number" &&
      typeof page === "number" &&
      limit > 0 &&
      page > 0
    ) {
      baseSql += " LIMIT ? OFFSET ?";
      params.push(limit, (page - 1) * limit);
    }

    const sql = mysql2.format(baseSql, params);
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

const dashboardIssues = async (user: User) => {
  try {
    if (user.role === "user") {
      const sql = mysql2.format(
        `SELECT 
          COUNT(CASE WHEN status = 'NEW' THEN 1 END) as newIssues,
          COUNT(CASE WHEN status = 'ACK' THEN 1 END) as ackIssues,
          COUNT(CASE WHEN (status = 'CLOSED' OR status = 'RESOLVED') THEN 1 END) as closedIssues
         FROM issues WHERE created_by = ?`,
        [user.userId]
      );
      const [rows] = await pool.query<RowDataPacket[]>(sql);
      const createdAtSql = mysql2.format(
        "SELECT created_at FROM issues WHERE created_by = ?",
        [user.userId]
      );
      const [createdAtRows] = await pool.query<RowDataPacket[]>(createdAtSql);

      return {
        newIssues: rows[0].newIssues,
        ackIssues: rows[0].ackIssues,
        closedIssues: rows[0].closedIssues,
        list: createdAtRows.map((row) =>
          new Date(row.created_at).toISOString()
        ),
      } as DashboardIssuesResponse;
    } else if (user.role === "admin") {
      const sql = mysql2.format(
        `SELECT 
          (SELECT COUNT(*) FROM issues WHERE status = 'NEW') as newIssues,
          COUNT(CASE WHEN admin_id = ? AND (status = 'ACK') THEN 1 END) as ackIssues,
          COUNT(CASE WHEN admin_id = ? AND (status = 'CLOSED' OR status = 'RESOLVED') THEN 1 END) as closedIssues
         FROM issues`,
        [user.userId, user.userId]
      );
      const [rows] = await pool.query<RowDataPacket[]>(sql);
      return rows[0] as DashboardIssuesResponse;
    } else if (user.role === "superadmin") {
      const sql = mysql2.format(
        `SELECT 
          (SELECT COUNT(*) FROM issues WHERE status = 'NEW') as newIssues,
          (SELECT COUNT(*) FROM issues WHERE status = 'ACK') as ackIssues,
          (SELECT COUNT(*) FROM issues WHERE status = 'CLOSED' OR status = 'RESOLVED') as closedIssues
         FROM issues`
      );
      const [rows] = await pool.query<RowDataPacket[]>(sql);
      return rows[0] as DashboardIssuesResponse;
    }
  } catch (error: any) {
    throw new Error(`Error fetching dashboard data: ${error.message}`);
  }
};

const deleteIssue = async (issueId: number, userId: number) => {
  try {
    const sql = mysql2.format(
      "DELETE FROM issues WHERE issue_id = ? AND status = 'NEW' AND created_by = ?",
      [issueId, userId]
    );
    const [result] = await pool.query<RowDataPacket[]>(sql);
    const affectedRows = (result as OkPacketParams).affectedRows;
    if (affectedRows === 0) {
      throw new Error("Issue not found or Issue already acknowledged");
    }
    return { message: "Issue deleted successfully" };
  } catch (error: any) {
    throw new Error(`Error deleting issue: ${error.message}`);
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
  dashboardIssues,
  deleteIssue,
};

export default issueModel;
