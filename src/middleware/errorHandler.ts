import { ErrorRequestHandler } from "express";
import { HttpError, HttpStatus } from "@src/lib/httpError";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
