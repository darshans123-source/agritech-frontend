import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.js';

export const requireFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missing = fields.filter((f) => req.body[f] === undefined || req.body[f] === null || req.body[f] === '');
    if (missing.length > 0) {
      sendError(res, `Missing required fields: ${missing.join(', ')}`, 400);
      return;
    }
    next();
  };
};
