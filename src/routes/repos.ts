import { Router } from "express";
import { getRepos, getRepoById } from "@src/controllers/repoController";

const router = Router();

router.get("/", getRepos);
router.get("/:id", getRepoById);

export default router;
