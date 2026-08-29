export class CropRecommendationService {
  public static recommendCrops(params: {
    state: string;
    district?: string;
    season?: 'Kharif' | 'Rabi' | 'Zaid' | 'Annual';
    soilType?: string;
    waterSource?: string;
    landSizeAcres?: number;
  }) {
    const { state, district, season = 'Kharif', soilType = 'Red Loamy', waterSource = 'Canal' } = params;

    const recommendations = [
      {
        cropName: 'Sugarcane (Co 86032 / Nayana)',
        suitabilityScore: 94,
        category: 'Cash Crop',
        durationDays: '300-360 days',
        waterRequirement: 'High (Canal / Drip)',
        expectedRoi: '65% - 85%',
        marketDemand: 'High (Assured sugar mill crushing & jaggery units)',
        pros: ['Guaranteed Fair & Remunerative Price (FRP)', 'High biomass return', 'Low pest vulnerability in ratoon'],
        cons: ['Long gestation period', 'Requires heavy basal fertilizer investment']
      },
      {
        cropName: 'Tomato (Abhinav F1 / US-440)',
        suitabilityScore: 91,
        category: 'High-Value Horticulture',
        durationDays: '90-110 days',
        waterRequirement: 'Moderate (Drip irrigated)',
        expectedRoi: '120% - 180%',
        marketDemand: 'Very High (Kolar / Bengaluru APMC Mandis)',
        pros: ['Multiple picking flushes over 60 days', 'Quick capital turnaround', 'High export & processing demand'],
        cons: ['Price volatility', 'Vulnerable to early blight & viral leaf curl']
      },
      {
        cropName: 'Ragi / Finger Millet (GPU-28)',
        suitabilityScore: 88,
        category: 'Nutri-Cereal',
        durationDays: '105-120 days',
        waterRequirement: 'Low (Drought resilient)',
        expectedRoi: '45% - 60%',
        marketDemand: 'High (PDS Govt MSP procurement & health food demand)',
        pros: ['Zero pest pressure', 'Minimal chemical inputs', 'Excellent fodder for cattle'],
        cons: ['Moderate gross revenue per acre']
      }
    ];

    return {
      query: { state, district, season, soilType, waterSource },
      recommendations,
      soilSuitabilityNote: `Your ${soilType} with ${waterSource} irrigation provides high fertility for horticulture and sugarcane cultivation.`
    };
  }
}
