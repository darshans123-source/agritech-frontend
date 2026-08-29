import { Request, Response } from 'express';
import { WeatherService } from '../services/weather.service.js';
import { sendSuccess } from '../utils/response.js';

export class WeatherController {
  public static getWeather(req: Request, res: Response): Response {
    const { location } = req.query;
    const weather = WeatherService.getCurrentWeather(location as string);
    return sendSuccess(res, weather);
  }

  public static getSprayingAdvisory(req: Request, res: Response): Response {
    const advisory = WeatherService.getSprayingAdvisory();
    return sendSuccess(res, advisory);
  }

  public static getIrrigationAdvisory(req: Request, res: Response): Response {
    const advisory = WeatherService.getIrrigationAdvisory();
    return sendSuccess(res, advisory);
  }

  public static getForecast(req: Request, res: Response): Response {
    const forecast = WeatherService.getForecast();
    return sendSuccess(res, forecast);
  }
}
