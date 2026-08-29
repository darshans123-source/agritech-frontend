import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { sendError } from '../utils/response.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    // For demo/dev mode, allow anonymous requests with mock user fallback or reject based on strict requirements
    req.user = { id: 'usr-001', email: 'darshan.agri@krishismart.ai' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch (err) {
    sendError(res, 'Invalid or expired token', 401);
  }
};
