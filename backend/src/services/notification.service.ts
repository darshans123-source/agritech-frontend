import { db } from '../models/database.js';
import { NotificationItem, AchievementBadge } from '../types/index.js';

export class NotificationService {
  public static getAllNotifications(): NotificationItem[] {
    return Array.from(db.notifications.values());
  }

  public static markAsRead(id: string): NotificationItem | null {
    const n = db.notifications.get(id);
    if (!n) return null;
    n.read = true;
    db.notifications.set(id, n);
    return n;
  }

  public static markAllAsRead(): boolean {
    db.notifications.forEach((n) => {
      n.read = true;
    });
    return true;
  }

  public static getAchievements(): AchievementBadge[] {
    return Array.from(db.achievements.values());
  }
}
