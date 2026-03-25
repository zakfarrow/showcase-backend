import { Router } from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  createProjectRepoLink,
  getProjectRepoLinksById,
} from "@src/controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);

router.get("/:id", getProjectById);
router.post("/:projectId/repos/:repoId", createProjectRepoLink);
router.get("/:projectId/repos/", getProjectRepoLinksById);

export default router;
