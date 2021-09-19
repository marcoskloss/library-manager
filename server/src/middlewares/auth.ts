import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) return res.status(401).end();
  const [, token] = String(authHeader).split(' ');

  try {
    const decoded = AuthService.decodeToken(token);
    req.user_email = decoded.email;
    next();
  } catch (err) {
    const error = err as Error;
    res.status(401).json({ error: error.message });
  }
}