import { SoilAnalysisReport } from '../../types/index.js';

export class SoilAnalysisService {
  public static analyzeSoil(params: {
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organicCarbon?: number;
    salinityEc?: number;
  }): SoilAnalysisReport {
    const { ph, nitrogen, phosphorus, potassium, organicCarbon = 0.65, salinityEc = 0.45 } = params;

    const nStatus: 'Low' | 'Optimal' | 'High' = nitrogen < 200 ? 'Low' : nitrogen > 400 ? 'High' : 'Optimal';
    const pStatus: 'Low' | 'Optimal' | 'High' = phosphorus < 25 ? 'Low' : phosphorus > 60 ? 'High' : 'Optimal';
    const kStatus: 'Low' | 'Optimal' | 'High' = potassium < 150 ? 'Low' : potassium > 350 ? 'High' : 'Optimal';

    // Calculate overall soil health score (0-100)
    let score = 85;
    if (ph < 6.0 || ph > 7.8) score -= 15;
    if (nStatus !== 'Optimal') score -= 8;
    if (pStatus !== 'Optimal') score -= 8;
    if (kStatus !== 'Optimal') score -= 8;
    score = Math.max(40, Math.min(98, score));

    const recommendedCrops: string[] = [];
    if (ph >= 6.0 && ph <= 7.5) {
      recommendedCrops.push('Sugarcane', 'Tomato', 'Paddy / Rice', 'Ragi (Finger Millet)', 'Maize');
    } else if (ph < 6.0) {
      recommendedCrops.push('Tea', 'Coffee', 'Potato', 'Ginger', 'Cardamom');
    } else {
      recommendedCrops.push('Cotton', 'Barley', 'Sugarbeet', 'Mustard');
    }

    const fertilizerPlan: string[] = [];
    if (nStatus === 'Low') {
      fertilizerPlan.push('Apply 50 kg/acre Urea or spray IFFCO Nano Urea @ 3ml/L during tillering.');
    }
    if (pStatus === 'Low') {
      fertilizerPlan.push('Apply 35 kg/acre Single Super Phosphate (SSP) or DAP as basal dose.');
    }
    if (kStatus === 'Low') {
      fertilizerPlan.push('Apply 25 kg/acre Muriate of Potash (MOP) during pre-flowering stage.');
    }
    if (ph < 6.2) {
      fertilizerPlan.push('Broadcast Agricultural Lime (CaCO3) @ 250 kg/acre to neutralize acidity.');
    } else if (ph > 7.8) {
      fertilizerPlan.push('Apply Gypsum (CaSO4) @ 300 kg/acre and incorporate green manure crops like Dhaincha.');
    }
    if (fertilizerPlan.length === 0) {
      fertilizerPlan.push('Soil chemical profile is balanced. Maintain organic vermicompost @ 2 tons/acre annually.');
    }

    return {
      ph,
      nitrogen: { value: nitrogen, unit: 'kg/ha', status: nStatus },
      phosphorus: { value: phosphorus, unit: 'kg/ha', status: pStatus },
      potassium: { value: potassium, unit: 'kg/ha', status: kStatus },
      organicCarbon,
      salinityEc,
      healthIndex: score,
      recommendedCrops,
      fertilizerPlan
    };
  }
}
