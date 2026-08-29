import { Request, Response } from 'express';
import { CropService } from '../services/crop.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class CropController {
  public static getAllCrops(req: Request, res: Response): Response {
    const { farmId } = req.query;
    const crops = CropService.getAllCrops(farmId as string);
    return sendSuccess(res, crops);
  }

  public static getCropById(req: Request, res: Response): Response {
    const crop = CropService.getCropById(req.params.id);
    if (!crop) return sendError(res, 'Crop not found', 404);
    return sendSuccess(res, crop);
  }

  public static createCrop(req: Request, res: Response): Response {
    const { name, variety, area, sowingDate, expectedHarvestDate } = req.body;
    if (!name || !area) {
      return sendError(res, 'Crop name and area are required', 400);
    }
    const crop = CropService.createCrop(req.body);
    return sendSuccess(res, crop, 'Crop created successfully', 201);
  }

  public static advanceStage(req: Request, res: Response): Response {
    const { stageId } = req.body;
    if (!stageId) {
      return sendError(res, 'stageId is required', 400);
    }
    const updated = CropService.advanceStage(req.params.id, stageId);
    if (!updated) return sendError(res, 'Crop not found', 404);
    return sendSuccess(res, updated, 'Crop stage advanced successfully');
  }

  public static deleteCrop(req: Request, res: Response): Response {
    const deleted = CropService.deleteCrop(req.params.id);
    if (!deleted) return sendError(res, 'Crop not found', 404);
    return sendSuccess(res, { deleted: true }, 'Crop deleted successfully');
  }

  // Tasks
  public static getAllTasks(req: Request, res: Response): Response {
    const tasks = CropService.getAllTasks();
    return sendSuccess(res, tasks);
  }

  public static addTask(req: Request, res: Response): Response {
    const task = CropService.addTask(req.body);
    return sendSuccess(res, task, 'Task created successfully', 201);
  }

  public static toggleTask(req: Request, res: Response): Response {
    const task = CropService.toggleTask(req.params.id);
    if (!task) return sendError(res, 'Task not found', 404);
    return sendSuccess(res, task, 'Task updated successfully');
  }
}
