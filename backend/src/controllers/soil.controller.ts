import { Request, Response } from 'express';
import { SoilAnalysisService } from '../services/ai/soilAnalysis.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class SoilController {
  public static analyze(req: Request, res: Response): Response {
    const { ph, nitrogen, phosphorus, potassium, organicCarbon, salinityEc } = req.body;
    if (ph === undefined || nitrogen === undefined || phosphorus === undefined || potassium === undefined) {
      return sendError(res, 'ph, nitrogen, phosphorus, and potassium are required', 400);
    }
    const report = SoilAnalysisService.analyzeSoil({ ph, nitrogen, phosphorus, potassium, organicCarbon, salinityEc });
    return sendSuccess(res, report, 'Soil analysis report generated');
  }
}
