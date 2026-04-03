import { NextFunction, Request, Response } from "express";
import { projects, projectsToRepos } from "@src/db/schema";
import { db } from "@src/services/db";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { HttpError, HttpStatus } from "@src/lib/httpError";

const createProjectSchema = createInsertSchema(projects);

export const getProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectsRows = await db.query.projects.findMany({
      with: {
        projectsToRepos: {
          with: {
            repo: true,
          },
        },
      },
    });

    if (!projectsRows) {
      throw new HttpError(HttpStatus.NOT_FOUND, "Project not found");
    }

    res.json(
      projectsRows.map(({ projectsToRepos, ...rest }) => ({
        ...rest,
        repos: projectsToRepos.map(({ repo }) => repo),
      })),
    );
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = createProjectSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        parsed.error.issues[0]?.message,
      );
    }

    const [row] = await db.insert(projects).values(parsed.data).returning();
    res.json(row);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new HttpError(HttpStatus.BAD_REQUEST, "id must be a valid integer");
    }

    const project = await db.query.projects.findFirst({
      where: eq(projects.id, id),
      with: {
        projectsToRepos: {
          with: {
            repo: true,
          },
        },
      },
    });

    if (!project) {
      throw new HttpError(HttpStatus.NOT_FOUND, "Project not found");
    }

    const { projectsToRepos, ...rest } = project;
    res.json({
      ...rest,
      repos: projectsToRepos.map((link) => link.repo),
    });
  } catch (error) {
    next(error);
  }
};

export const createProjectRepoLink = async (
  req: Request<{ projectId: string; repoId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const repoId = parseInt(req.params.repoId);

    if (isNaN(projectId) || isNaN(repoId)) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "projectId and repoId must be valid integers",
      );
    }

    const [row] = await db
      .insert(projectsToRepos)
      .values({ projectId, repoId })
      .onConflictDoNothing()
      .returning();

    res.json(row);
  } catch (error) {
    next(error);
  }
};

export const getProjectRepoLinksById = async (
  req: Request<{ projectId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectId = parseInt(req.params.projectId);

    if (isNaN(projectId)) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "projectId must be a valid integer",
      );
    }

    const rows = await db
      .select()
      .from(projectsToRepos)
      .where(eq(projectsToRepos.projectId, projectId));

    res.json(rows);
  } catch (error) {
    next(error);
  }
};
