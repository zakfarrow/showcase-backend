import { NextFunction, Request, Response } from "express";
import { repos } from "@src/db/schema";
import { db } from "@src/services/db";
import { eq } from "drizzle-orm";
import { HttpError, HttpStatus } from "@src/lib/httpError";

export const getRepos = async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(repos);
    res.json(rows);
  } catch (error) {
    console.error("getRepos error:", error);
    res.status(500).json({ error: "Failed to fetch repos" });
  }
};

export const getRepoById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new HttpError(HttpStatus.BAD_REQUEST, "id must be a valid integer");
    }

    const [row] = await db.select().from(repos).where(eq(repos.id, id));

    if (!row) {
      throw new HttpError(HttpStatus.NOT_FOUND, "Repo not found");
    }

    res.json(row);
  } catch (error) {
    next(error);
  }
};
