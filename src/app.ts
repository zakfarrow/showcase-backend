import express, { Application, Request, Response } from "express";
import routes from "./routes";

export const createApp = (): Application => {
  const app = express();

  app.use(express.json());

  app.use("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.use("/api", routes);

  return app;
};
