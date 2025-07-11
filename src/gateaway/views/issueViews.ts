import { issueClient } from "../client";
import { Request, Response } from "express";
import { Metadata } from "@grpc/grpc-js";

const createIssue = async (req: Request, res: Response) => {
  try {
    const { title, description, impact, urgency } = req.body;
    if (!title || !description || !urgency || !impact) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const metadata = new Metadata();
    metadata.add("authorization", req.headers.authorization || "");
    issueClient.CreateIssue(
      { description, impact, title, urgency },
      metadata,
      (error, response) => {
        if (error) {
          return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
        }
        res.status(201).json({
          message: response.message,
          issue: response.issueId,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const getIssue = async (req: Request, res: Response) => {
  try {
    const { issueId } = req.params;
    if (!issueId) {
      return res.status(400).json({ error: "Issue ID is required" });
    }
    const metadata = new Metadata();
    metadata.add("authorization", req.headers.authorization || "");
    issueClient.GetIssue({ issueId }, metadata, (error, response) => {
      if (error) {
        return res
          .status(500)
          .json({ error: error.message || "Internal Server Error" });
      }
      res.status(200).json(response);
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const listIssues = async (req: Request, res: Response) => {
  try {
    const metadata = new Metadata();
    metadata.add("authorization", req.headers.authorization || "");
    issueClient.ListIssuesByUser({}, metadata, (error, response) => {
      if (error) {
        return res
          .status(500)
          .json({ error: error.message || "Internal Server Error" });
      }
      res.status(200).json(response);
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const metadata = new Metadata();
    metadata.add("authorization", req.headers.authorization || "");
    issueClient.ListIssues({}, metadata, (error, response) => {
      if (error) {
        return res
          .status(500)
          .json({ error: error.message || "Internal Server Error" });
      }
      res.status(200).json(response);
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const issueViews = { createIssue, getIssue, listIssues, getAllIssues };

export default issueViews;
