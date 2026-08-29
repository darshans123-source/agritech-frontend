export class YieldPredictionService {
  public static predictYield(params: {
    crop: string;
    areaAcres: number;
    soilHealthRating?: number;
    irrigationHealth?: number;
    climateRiskFactor?: number;
  }) {
    const { crop, areaAcres, soilHealthRating = 85, irrigationHealth = 90, climateRiskFactor = 0.95 } = params;

    // Base yields per acre in kg
    const baseYields: Record<string, { basePerAcre: number; unit: string; avgPricePerKg: number }> = {
      Tomato: { basePerAcre: 24000, unit: 'kg', avgPricePerKg: 24 },
      Sugarcane: { basePerAcre: 42000, unit: 'kg', avgPricePerKg: 3.2 },
      Paddy: { basePerAcre: 2800, unit: 'kg', avgPricePerKg: 26 },
      Ragi: { basePerAcre: 1600, unit: 'kg', avgPricePerKg: 42 },
      Cotton: { basePerAcre: 1200, unit: 'kg', avgPricePerKg: 68 },
      Maize: { basePerAcre: 3200, unit: 'kg', avgPricePerKg: 22 },
      Chilli: { basePerAcre: 1800, unit: 'kg', avgPricePerKg: 120 },
      Onion: { basePerAcre: 14000, unit: 'kg', avgPricePerKg: 32 }
    };

    const cropMeta = baseYields[crop] || { basePerAcre: 3000, unit: 'kg', avgPricePerKg: 25 };

    const soilMultiplier = (soilHealthRating / 100) * 0.4 + 0.6;
    const waterMultiplier = (irrigationHealth / 100) * 0.4 + 0.6;
    const combinedMultiplier = soilMultiplier * waterMultiplier * climateRiskFactor;

    const estimatedYieldKg = Math.round(cropMeta.basePerAcre * areaAcres * combinedMultiplier);
    const estimatedRevenue = Math.round(estimatedYieldKg * cropMeta.avgPricePerKg);
    const confidenceScore = Math.round(85 + (soilHealthRating > 80 ? 5 : 0) + (irrigationHealth > 80 ? 4 : 0));

    return {
      crop,
      areaAcres,
      estimatedYieldKg,
      estimatedYieldTons: Number((estimatedYieldKg / 1000).toFixed(2)),
      estimatedRevenue,
      confidenceScore: Math.min(96, confidenceScore),
      factors: {
        soilHealthContribution: `${Math.round(soilMultiplier * 100)}%`,
        waterAdequacyContribution: `${Math.round(waterMultiplier * 100)}%`,
        climateRiskImpact: `${Math.round((1 - climateRiskFactor) * 100)}% risk offset`
      },
      recommendation: `Optimizing foliar micronutrient sprays during active flowering can yield up to +12% additional harvest.`
    };
  }
}
