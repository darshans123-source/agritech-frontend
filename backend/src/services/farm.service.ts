import { db } from '../models/database.js';
import { Farm } from '../types/index.js';

export class FarmService {
  public static getAllFarms(): Farm[] {
    return Array.from(db.farms.values());
  }

  public static getFarmById(id: string): Farm | undefined {
    return db.farms.get(id);
  }

  public static createFarm(data: Omit<Farm, 'id'>): Farm {
    const id = `farm-${Date.now()}`;
    const farm: Farm = { ...data, id };
    db.farms.set(id, farm);
    return farm;
  }

  public static updateFarm(id: string, data: Partial<Farm>): Farm | null {
    const existing = db.farms.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...data };
    db.farms.set(id, updated);
    return updated;
  }

  public static deleteFarm(id: string): boolean {
    return db.farms.delete(id);
  }
}
