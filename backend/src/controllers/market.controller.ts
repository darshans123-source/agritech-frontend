import { Request, Response } from 'express';
import { MarketPredictionService } from '../services/ai/marketPrediction.service.js';
import { KrishiBhavishyaService } from '../services/ai/krishiBhavishya.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class MarketController {
  public static getMandiRates(req: Request, res: Response): Response {
    const { state, district, commodity } = req.query;
    const rates = MarketPredictionService.getMandiRates(
      state as string,
      district as string,
      commodity as string
    );
    return sendSuccess(res, rates);
  }

  public static getBestMarket(req: Request, res: Response): Response {
    const { commodity = 'Tomato' } = req.query;
    const best = MarketPredictionService.getBestMarketRecommendation(commodity as string);
    return sendSuccess(res, best);
  }

  public static predictFuturePrice(req: Request, res: Response): Response {
    const { crop, quantity, harvestDate, location } = req.body;
    if (!crop || quantity === undefined) {
      return sendError(res, 'crop and quantity are required', 400);
    }
    const forecast = KrishiBhavishyaService.predictFuturePrice({
      crop,
      quantity: Number(quantity),
      harvestDate,
      location
    });
    return sendSuccess(res, forecast);
  }
}
