import { db } from '../../models/database.js';
import { MandiItem } from '../../types/index.js';

export class MarketPredictionService {
  public static getMandiRates(state?: string, district?: string, commodity?: string): MandiItem[] {
    let list = Array.from(db.mandis.values());

    if (state && state !== 'All') {
      list = list.filter((m) => m.state.toLowerCase() === state.toLowerCase());
    }
    if (district && district !== 'All') {
      list = list.filter((m) => m.district.toLowerCase() === district.toLowerCase());
    }
    if (commodity && commodity !== 'All') {
      list = list.filter((m) => m.commodity.toLowerCase().includes(commodity.toLowerCase()));
    }

    return list;
  }

  public static getBestMarketRecommendation(commodity: string) {
    const list = Array.from(db.mandis.values()).filter((m) =>
      m.commodity.toLowerCase().includes(commodity.toLowerCase())
    );

    if (list.length === 0) {
      return Array.from(db.mandis.values())[0];
    }

    // Sort by highest net price after transport
    return list.sort((a, b) => (b.currentPrice - b.transportCostPerQtl) - (a.currentPrice - a.transportCostPerQtl))[0];
  }
}
