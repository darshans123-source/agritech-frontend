import { Router } from 'express';
import { DroneController } from '../controllers/drone.controller.js';

const router = Router();

router.get('/plans', DroneController.getAllPlans);
router.post('/plan', DroneController.createPlan);
router.post('/plans/:id/execute', DroneController.executeMission);

export default router;
