import pool from "../../db/db";
import mysql2, { RowDataPacket, OkPacketParams } from "mysql2/promise";
import { CreateIssueRequest } from "src/proto/issue/CreateIssueRequest";

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

const issueModel = { createIssue };

export default issueModel;
