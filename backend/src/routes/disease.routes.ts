import { Router } from 'express';
import { DiseaseController } from '../controllers/disease.controller.js';

const router = Router();

router.post('/analyze', DiseaseController.analyze);
router.get('/samples', DiseaseController.getSamples);

export default router;
