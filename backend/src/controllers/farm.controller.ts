import { Request, Response } from 'express';
import { FarmService } from '../services/farm.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class FarmController {
  public static getAllFarms(req: Request, res: Response): Response {
    const farms = FarmService.getAllFarms();
    return sendSuccess(res, farms);
  }

  public static getFarmById(req: Request, res: Response): Response {
    const farm = FarmService.getFarmById(req.params.id);
    if (!farm) return sendError(res, 'Farm not found', 404);
    return sendSuccess(res, farm);
  }

  public static createFarm(req: Request, res: Response): Response {
    const { name, location, totalArea, soilType, waterSource } = req.body;
    if (!name || !location) {
      return sendError(res, 'Farm name and location are required', 400);
    }
    const farm = FarmService.createFarm(req.body);
    return sendSuccess(res, farm, 'Farm created successfully', 201);
  }

  public static updateFarm(req: Request, res: Response): Response {
    const updated = FarmService.updateFarm(req.params.id, req.body);
    if (!updated) return sendError(res, 'Farm not found', 404);
    return sendSuccess(res, updated, 'Farm updated successfully');
  }

  public static deleteFarm(req: Request, res: Response): Response {
    const deleted = FarmService.deleteFarm(req.params.id);
    if (!deleted) return sendError(res, 'Farm not found', 404);
    return sendSuccess(res, { deleted: true }, 'Farm deleted successfully');
  }
}
