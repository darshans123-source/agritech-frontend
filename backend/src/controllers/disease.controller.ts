import { Request, Response } from 'express';
import { CropDoctorService } from '../services/ai/cropDoctor.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class DiseaseController {
  public static async analyze(req: Request, res: Response): Promise<Response> {
    const { image, sampleId, crop } = req.body;
    const result = await CropDoctorService.analyzeImage(image, sampleId, crop);
    return sendSuccess(res, result, 'Disease analyzed successfully');
  }

  public static getSamples(req: Request, res: Response): Response {
    const samples = CropDoctorService.getSampleDiagnostics();
    return sendSuccess(res, samples);
  }
}
