import { db } from '../models/database.js';
import { DronePlan } from '../types/index.js';

export class DroneService {
  public static getAllPlans(): DronePlan[] {
    return Array.from(db.dronePlans.values());
  }

  public static createPlan(input: {
    fieldName: string;
    cropName: string;
    areaAcres: number;
    cropStage?: string;
    sprayType?: 'Bio-Fungicide' | 'Micronutrient Mix' | 'Nano Urea' | 'Insecticide';
    chemicalName?: string;
    weather?: any;
  }) {
    const { fieldName, cropName, areaAcres, cropStage = 'Flowering', sprayType = 'Bio-Fungicide', chemicalName = 'Trichoderma Bio-Fungicide' } = input;

    const estimatedFlightTimeMinutes = Number((areaAcres * 6.5).toFixed(1));
    const numberOfFlights = Math.max(1, Math.ceil(areaAcres / 1.5));
    const solutionVolumeLitres = Math.round(areaAcres * 12);
    const recommendedPlanningWindow = 'Tomorrow morning 06:30 AM - 09:30 AM (Wind < 8 km/h)';

    const id = `drn-${Date.now()}`;
    const plan: DronePlan = {
      id,
      fieldName,
      cropName,
      areaAcres,
      sprayType,
      chemicalName,
      solutionVolumeLitres,
      altitudeMeters: 3.0,
      estimatedFlightTimeMinutes,
      batteryPacksNeeded: numberOfFlights,
      windSpeedAcceptable: true,
      status: 'Scheduled',
      coverageProgress: 0
    };

    db.dronePlans.set(id, plan);

    return {
      plan,
      estimates: {
        coverageAreaAcres: areaAcres,
        estimatedFlightTime: `${estimatedFlightTimeMinutes} minutes`,
        numberOfFlights,
        recommendedPlanningWindow,
        sprayVolumeLiters: solutionVolumeLitres,
        disclaimer: 'This is a pre-flight planning and battery efficiency estimate. Follow all CIBRC approved label dosages and wear protective gear during actual agricultural operations.'
      }
    };
  }

  public static executeMission(id: string): DronePlan | null {
    const plan = db.dronePlans.get(id);
    if (!plan) return null;
    plan.status = 'In Flight';
    plan.coverageProgress = 100;
    setTimeout(() => {
      plan.status = 'Completed';
      db.dronePlans.set(id, plan);
    }, 1000);
    db.dronePlans.set(id, plan);
    return plan;
  }
}
