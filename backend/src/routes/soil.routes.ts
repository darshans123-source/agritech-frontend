import { Router } from 'express';
import { SoilController } from '../controllers/soil.controller.js';

const router = Router();

router.post('/analyze', SoilController.analyze);

export default router;
