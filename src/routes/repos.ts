import { Router } from "express";
import { getRepos } from "@src/controllers/repoController";

const router = Router();

router.get("/", getRepos);

export default router;
