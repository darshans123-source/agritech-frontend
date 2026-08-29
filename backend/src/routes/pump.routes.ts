import { Router } from 'express';
import { PumpController } from '../controllers/pump.controller.js';

const router = Router();

router.get('/', PumpController.getAllPumps);
router.get('/:id', PumpController.getPumpById);
router.post('/:id/control', PumpController.controlPump);
router.post('/:id/schedule', PumpController.setSchedule);
router.get('/:id/history', PumpController.getHistory);

export default router;
