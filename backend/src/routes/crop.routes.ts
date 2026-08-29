import { Router } from 'express';
import { CropController } from '../controllers/crop.controller.js';

const router = Router();

router.get('/', CropController.getAllCrops);
router.post('/', CropController.createCrop);
router.get('/tasks', CropController.getAllTasks);
router.post('/tasks', CropController.addTask);
router.put('/tasks/:id/toggle', CropController.toggleTask);
router.get('/:id', CropController.getCropById);
router.post('/:id/advance-stage', CropController.advanceStage);
router.delete('/:id', CropController.deleteCrop);

export default router;
