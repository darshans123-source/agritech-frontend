import { Request, Response } from 'express';
import { PumpService } from '../services/pump.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class PumpController {
  public static getAllPumps(req: Request, res: Response): Response {
    const pumps = PumpService.getAllPumps();
    return sendSuccess(res, pumps);
  }

  public static getPumpById(req: Request, res: Response): Response {
    const pump = PumpService.getPumpById(req.params.id);
    if (!pump) return sendError(res, 'Pump not found', 404);
    return sendSuccess(res, pump);
  }

  public static controlPump(req: Request, res: Response): Response {
    const { status, mode, threshold } = req.body;
    const result = PumpService.controlPump(req.params.id, { status, mode, threshold });
    if (!result) return sendError(res, 'Pump not found', 404);
    return sendSuccess(res, result);
  }

  public static setSchedule(req: Request, res: Response): Response {
    const result = PumpService.updateSchedule(req.params.id, req.body);
    if (!result) return sendError(res, 'Pump not found', 404);
    return sendSuccess(res, result, 'Schedule updated successfully');
  }

  public static getHistory(req: Request, res: Response): Response {
    const history = PumpService.getPumpHistory(req.params.id);
    return sendSuccess(res, history);
  }
}
