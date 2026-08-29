import { db } from '../models/database.js';
import { GovernmentScheme } from '../types/index.js';

export class SchemeService {
  public static getAllSchemes(category?: string): GovernmentScheme[] {
    const list = Array.from(db.schemes.values());
    if (category && category !== 'All') {
      return list.filter((s) => s.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  }

  public static getSchemeById(id: string): GovernmentScheme | undefined {
    return db.schemes.get(id);
  }

  public static applyForScheme(id: string, applicantData?: any): GovernmentScheme | null {
    const scheme = db.schemes.get(id);
    if (!scheme) return null;
    scheme.appliedStatus = 'In Progress';
    db.schemes.set(id, scheme);
    return scheme;
  }
}
