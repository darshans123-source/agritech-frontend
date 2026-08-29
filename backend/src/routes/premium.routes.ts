import { Router } from 'express';
import { PremiumController } from '../controllers/premium.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/tiers', PremiumController.getTiers);
router.post('/unlock', authenticateToken, PremiumController.unlockPro);

export default router;
