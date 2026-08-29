import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller.js';

const router = Router();

router.get('/', NotificationController.getAll);
router.put('/:id/read', NotificationController.markRead);
router.post('/mark-all-read', NotificationController.markAllRead);
router.get('/achievements', NotificationController.getAchievements);

export default router;
