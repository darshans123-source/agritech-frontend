import { Router } from 'express';
import { FarmController } from '../controllers/farm.controller.js';

const router = Router();

router.get('/', FarmController.getAllFarms);
router.post('/', FarmController.createFarm);
router.get('/:id', FarmController.getFarmById);
router.put('/:id', FarmController.updateFarm);
router.delete('/:id', FarmController.deleteFarm);

export default router;
