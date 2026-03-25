import { Router } from "express";
import projectRoutes from "@src/routes/projects";
import repoRoutes from "@src/routes/repos";

const router = Router();

router.use("/projects", projectRoutes);
router.use("/repos", repoRoutes);

export default router;
