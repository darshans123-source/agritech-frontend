import { Request, Response } from 'express';
import { DroneService } from '../services/drone.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class DroneController {
  public static getAllPlans(req: Request, res: Response): Response {
    const plans = DroneService.getAllPlans();
    return sendSuccess(res, plans);
  }

  public static createPlan(req: Request, res: Response): Response {
    const { field, crop, area, cropStage, weather, sprayType, chemicalName, fieldName, cropName, areaAcres } = req.body;
    const finalFieldName = fieldName || field;
    const finalCropName = cropName || crop;
    const finalArea = areaAcres || area;

    if (!finalFieldName || !finalCropName || !finalArea) {
      return sendError(res, 'field/fieldName, crop/cropName, and area/areaAcres are required', 400);
    }

    const result = DroneService.createPlan({
      fieldName: finalFieldName,
      cropName: finalCropName,
      areaAcres: Number(finalArea),
      cropStage,
      sprayType,
      chemicalName,
      weather
    });

    return sendSuccess(res, result, 'Drone mission planned successfully', 201);
  }

  public static executeMission(req: Request, res: Response): Response {
    const plan = DroneService.executeMission(req.params.id);
    if (!plan) return sendError(res, 'Drone plan not found', 404);
    return sendSuccess(res, plan, 'Drone mission launched');
  }
}
