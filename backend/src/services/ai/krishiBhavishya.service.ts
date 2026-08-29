import { db } from '../../models/database.js';

export interface FuturePriceInput {
  crop: string;
  quantity: number; // in Quintals
  harvestDate?: string;
  location?: string;
}

export interface FuturePriceOutput {
  crop: string;
  quantityQuintals: number;
  todayPrice: number;
  sevenDayPrice: number;
  fifteenDayPrice: number;
  thirtyDayPrice: number;
  sixtyDayPrice: number;
  bestSellingWindow: string;
  expectedProfit: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  confidenceScore: number;
  marketSentiment: string;
  factors: string[];
  disclaimer: string;
}

export class KrishiBhavishyaService {
  public static predictFuturePrice(input: FuturePriceInput): FuturePriceOutput {
    const { crop = 'Tomato', quantity = 100, harvestDate, location } = input;
    const cropKey = Object.keys(Object.fromEntries(db.bhavishyaForecasts)).find(
      (k) => k.toLowerCase() === crop.toLowerCase()
    ) || 'Tomato';

    const forecast = db.bhavishyaForecasts.get(cropKey) || db.bhavishyaForecasts.get('Tomato')!;

    const todayPrice = forecast.timeframes.today;
    const sevenDayPrice = forecast.timeframes.days7;
    const fifteenDayPrice = forecast.timeframes.days15;
    const thirtyDayPrice = forecast.timeframes.days30;
    const sixtyDayPrice = forecast.timeframes.days60;

    const baseRevenue = quantity * todayPrice * 100; // per quintal
    const peakRevenue = quantity * forecast.peakPrice * 100;
    const expectedProfit = peakRevenue - baseRevenue;

    return {
      crop: forecast.crop,
      quantityQuintals: quantity,
      todayPrice,
      sevenDayPrice,
      fifteenDayPrice,
      thirtyDayPrice,
      sixtyDayPrice,
      bestSellingWindow: forecast.bestSellingWindow,
      expectedProfit,
      riskLevel: forecast.riskScore,
      confidenceScore: forecast.confidenceScore,
      marketSentiment: forecast.marketSentiment,
      factors: forecast.factors,
      disclaimer: 'Estimates generated using statistical time-series mandi trends, historical seasonal arrivals, and weather forecasting. These are AI estimates and NOT guaranteed commercial price quotes.'
    };
  }
}
