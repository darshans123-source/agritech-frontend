import { db } from '../models/database.js';
import { UserProfile } from '../types/index.js';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export class UserService {
  public static getCurrentUser(id = 'usr-001'): UserProfile | undefined {
    return db.users.get(id) || Array.from(db.users.values())[0];
  }

  public static updateUser(id: string, updates: Partial<UserProfile>): UserProfile | null {
    const user = db.users.get(id) || Array.from(db.users.values())[0];
    if (!user) return null;
    const updated = { ...user, ...updates };
    db.users.set(user.id, updated);
    return updated;
  }

  public static login(email: string, name?: string) {
    let user = Array.from(db.users.values()).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: `usr-${Date.now()}`,
        name: name || email.split('@')[0] || 'Farmer User',
        phone: '+91 98450 00000',
        email,
        state: 'Karnataka',
        district: 'Mandya',
        village: 'Pandavapura',
        landSize: 5.0,
        farmingType: 'Precision Tech',
        preferredLanguage: 'en',
        experienceYears: 5,
        isPremium: false,
        tier: 'Free',
        level: 1,
        xp: 100,
        streakDays: 1,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      db.users.set(user.id, user);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, ENV.JWT_SECRET, { expiresIn: '7d' });
    return { user, token };
  }

  public static register(data: Partial<UserProfile>) {
    const id = `usr-${Date.now()}`;
    const user: UserProfile = {
      id,
      name: data.name || 'New Farmer',
      phone: data.phone || '+91 98000 00000',
      email: data.email || `farmer_${Date.now()}@krishismart.ai`,
      state: data.state || 'Karnataka',
      district: data.district || 'Mandya',
      village: data.village || 'Village',
      landSize: data.landSize || 4.0,
      farmingType: data.farmingType || 'Precision Tech',
      preferredLanguage: data.preferredLanguage || 'en',
      experienceYears: data.experienceYears || 5,
      isPremium: false,
      tier: 'Free',
      level: 1,
      xp: 150,
      streakDays: 1,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    db.users.set(id, user);

    const token = jwt.sign({ id: user.id, email: user.email }, ENV.JWT_SECRET, { expiresIn: '7d' });
    return { user, token };
  }

  public static unlockPro(id = 'usr-001'): UserProfile | null {
    const user = db.users.get(id) || Array.from(db.users.values())[0];
    if (!user) return null;
    user.isPremium = true;
    user.tier = 'Pro';
    db.users.set(user.id, user);
    return user;
  }
}
