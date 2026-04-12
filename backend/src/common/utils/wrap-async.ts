import type { Request, Response, NextFunction } from "express";

export const wrapAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
