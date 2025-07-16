import pool from "../../db/db";
import mysql2, { RowDataPacket, OkPacketParams } from "mysql2/promise";

const createComment = async (
  content: string,
  userId: number,
  issueId: number,
  parentId: number | null = null
) => {
  try {
    console.log(parentId);
    //check if the issue exists and it is created by the user or either the user is an admin
    const checkIssueSql = mysql2.format(
      "SELECT issues.issue_id FROM issues WHERE issue_id = ? AND (created_by = ? OR EXISTS (SELECT 1 FROM users WHERE id = ? AND role IN ('admin', 'superadmin')))",
      [issueId, userId, userId]
    );
    const [issueRows] = await pool.query<RowDataPacket[]>(checkIssueSql);
    if (issueRows.length === 0) {
      throw new Error(
        "Issue does not exist or you do not have permission to comment on it"
      );
    }
    const sql = mysql2.format(
      "INSERT INTO comment (content, user_id, issue_id,parent_id, created_at) VALUES (?, ?, ?,?, NOW())",
      [content, userId, issueId, parentId]
    );
    const [result] = await pool.query<RowDataPacket[]>(sql);
    const response = result as OkPacketParams;
    if (response.affectedRows === 0) {
      console.log("Failed to create comment");
      throw new Error("Failed to create comment");
    }
    return { message: "Comment created successfully" };
  } catch (error: any) {
    throw new Error(
      error.message || "Internal server error while creating comment"
    );
  }
};

const commentModel = { createComment };

export default commentModel;
