import { Request, Response, NextFunction } from "express";

export function log4Middleware(req: Request, res: Response, next: NextFunction) {
  next();
}
