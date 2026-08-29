import { Request, Response } from 'express';
import { SchemeService } from '../services/scheme.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class SchemeController {
  public static getAllSchemes(req: Request, res: Response): Response {
    const { category } = req.query;
    const schemes = SchemeService.getAllSchemes(category as string);
    return sendSuccess(res, schemes);
  }

  public static getSchemeById(req: Request, res: Response): Response {
    const scheme = SchemeService.getSchemeById(req.params.id);
    if (!scheme) return sendError(res, 'Scheme not found', 404);
    return sendSuccess(res, scheme);
  }

  public static apply(req: Request, res: Response): Response {
    const scheme = SchemeService.applyForScheme(req.params.id, req.body);
    if (!scheme) return sendError(res, 'Scheme not found', 404);
    return sendSuccess(res, scheme, 'Application submitted successfully');
  }
}
