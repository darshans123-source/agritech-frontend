import { Request, Response } from 'express';
import { IoTService } from '../services/iot.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class IoTController {
  public static getDevices(req: Request, res: Response): Response {
    const devices = IoTService.getAllDevices();
    return sendSuccess(res, devices);
  }

  public static getDeviceById(req: Request, res: Response): Response {
    const device = IoTService.getDeviceById(req.params.id);
    if (!device) return sendError(res, 'Device not found', 404);
    return sendSuccess(res, device);
  }

  public static createDevice(req: Request, res: Response): Response {
    const { name, type, fieldLocation } = req.body;
    if (!name || !type) {
      return sendError(res, 'Device name and type are required', 400);
    }
    const device = IoTService.createDevice(req.body);
    return sendSuccess(res, device, 'Device added successfully', 201);
  }

  public static getReadings(req: Request, res: Response): Response {
    const readings = IoTService.getDeviceReadings(req.params.id);
    return sendSuccess(res, readings);
  }
}
