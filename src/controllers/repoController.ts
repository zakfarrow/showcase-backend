import { Request, Response } from "express";
import { repos } from "@src/db/schema";
import { db } from "@src/services/db";

export const getRepos = async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(repos);
    res.json({ repos: rows });
  } catch (error) {
    console.error("getRepos error:", error);
    res.status(500).json({ error: "Failed to fetch repos" });
  }
};
