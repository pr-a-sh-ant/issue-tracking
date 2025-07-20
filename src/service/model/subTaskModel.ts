import { get } from "http";
import pool from "../../db/db";
import mysql2, { RowDataPacket, OkPacketParams } from "mysql2/promise";
import { SubTask as SubTaskResponse } from "../../proto/issue/SubTask";

interface SubTask {
  issue_id: number;
  task: string;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}

const createSubTask = async (subTask: SubTask) => {
  try {
    const issueQuery = mysql2.format(
      `SELECT admin_id FROM issues WHERE issue_id = ?`,
      [subTask.issue_id]
    );
    const [issueResult] = await pool.query<RowDataPacket[]>(issueQuery);

    if (issueResult.length === 0) {
      throw new Error("Parent issue not found");
    }

    if (!issueResult[0].admin_id) {
      throw new Error(
        "Issue must be assigned to an admin before creating subtasks"
      );
    }
    if (subTask.createdBy !== issueResult[0].admin_id) {
      throw new Error(
        "Only the admin assigned to this issue can create subtasks"
      );
    }

    const fields = Object.keys(subTask).join(", ");
    const values = Object.values(subTask);
    const placeholders = Object.keys(subTask)
      .map(() => "?")
      .join(", ");
    const query = mysql2.format(
      `INSERT INTO sub_tasks (${fields}) VALUES (${placeholders})`,
      values
    );
    const [result] = await pool.query<RowDataPacket[]>(query);
    const row = result as OkPacketParams;
    if (row.affectedRows === 0) {
      throw new Error("Failed to create subtask");
    }
    return {
      message: "Subtask created successfully",
    };
  } catch (error: any) {
    throw new Error(
      error.message || "Internal server error while creating subtask"
    );
  }
};

const getSubTasks = async (issueId: number) => {
  try {
    const query = mysql2.format(
      `SELECT sub_task_id as subTaskId, task, status, createdBy, createdAt, updatedAt, issue_id as issueId FROM sub_tasks WHERE issue_id = ?`,
      [issueId]
    );
    const [result] = await pool.query<RowDataPacket[]>(query);
    return result as SubTaskResponse[];
  } catch (error: any) {
    throw new Error(
      error.message || "Internal server error while fetching subtasks"
    );
  }
};

const completeSubTask = async (
  taskId: number,
  userId: number,
  issueId: number
) => {
  try {
    const query = mysql2.format(
      `UPDATE sub_tasks SET status = 'completed', updatedAt = NOW() WHERE issue_id = ? AND sub_task_id = ? AND createdBy = ?`,
      [issueId, taskId, userId]
    );
    const [result] = await pool.query<RowDataPacket[]>(query);
    const row = result as OkPacketParams;
    if (row.affectedRows === 0) {
      throw new Error("Failed to complete subtask or subtask not found");
    }
    return {
      message: "Subtask completed successfully",
    };
  } catch (error: any) {
    throw new Error(
      error.message || "Internal server error while completing subtask"
    );
  }
};

const subTaskModel = {
  createSubTask,
  completeSubTask,
  getSubTasks,
};

export default subTaskModel;
