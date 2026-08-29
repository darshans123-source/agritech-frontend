import { db } from '../models/database.js';
import { SmartPump } from '../types/index.js';

export class PumpService {
  public static getAllPumps(): SmartPump[] {
    return Array.from(db.smartPumps.values());
  }

  public static getPumpById(id: string): SmartPump | undefined {
    return db.smartPumps.get(id) || Array.from(db.smartPumps.values())[0];
  }

  public static controlPump(id: string, action: { status?: 'ON' | 'OFF'; mode?: 'MANUAL' | 'AUTO' | 'SCHEDULE'; threshold?: number }) {
    let pump = db.smartPumps.get(id) || Array.from(db.smartPumps.values())[0];
    if (!pump) return null;

    if (action.status !== undefined) {
      pump.status = action.status;
    }
    if (action.mode !== undefined) {
      pump.mode = action.mode;
    }
    if (action.threshold !== undefined) {
      pump.soilMoistureThreshold = action.threshold;
    }

    db.smartPumps.set(pump.id, pump);

    return {
      pump,
      isSimulated: true,
      executionTimestamp: new Date().toISOString(),
      message: `Pump ${pump.name} switched ${pump.status} in ${pump.mode} mode (Simulated Cloud Trigger).`
    };
  }

  public static updateSchedule(id: string, schedule: { startTime: string; durationMins: number; days: string[]; enabled: boolean }) {
    const pump = db.smartPumps.get(id) || Array.from(db.smartPumps.values())[0];
    if (!pump) return null;

    const newSch = { ...schedule, id: `sch-${Date.now()}` };
    pump.schedules.push(newSch);
    db.smartPumps.set(pump.id, pump);

    return { pump, newSchedule: newSch };
  }

  public static getPumpHistory(id: string) {
    return [
      { id: 'h-1', timestamp: 'Today, 06:00 AM', event: 'Auto-Start Triggered (Moisture < 45%)', duration: '45 mins', waterPumpedLiters: 14400, energyKwh: 3.8 },
      { id: 'h-2', timestamp: 'Yesterday, 05:30 PM', event: 'Scheduled Fertigation Cycle', duration: '30 mins', waterPumpedLiters: 9600, energyKwh: 2.5 },
      { id: 'h-3', timestamp: '2 days ago, 06:15 AM', event: 'Manual App Start', duration: '60 mins', waterPumpedLiters: 19200, energyKwh: 5.1 }
    ];
  }
}
