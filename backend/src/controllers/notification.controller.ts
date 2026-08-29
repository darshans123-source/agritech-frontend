import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class NotificationController {
  public static getAll(req: Request, res: Response): Response {
    const notifications = NotificationService.getAllNotifications();
    return sendSuccess(res, notifications);
  }

  public static markRead(req: Request, res: Response): Response {
    const updated = NotificationService.markAsRead(req.params.id);
    if (!updated) return sendError(res, 'Notification not found', 404);
    return sendSuccess(res, updated, 'Notification marked as read');
  }

  public static markAllRead(req: Request, res: Response): Response {
    NotificationService.markAllAsRead();
    return sendSuccess(res, { markedAll: true }, 'All notifications marked as read');
  }

  public static getAchievements(req: Request, res: Response): Response {
    const achievements = NotificationService.getAchievements();
    return sendSuccess(res, achievements);
  }
}
