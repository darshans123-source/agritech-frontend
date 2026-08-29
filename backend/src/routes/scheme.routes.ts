import { Router } from 'express';
import { SchemeController } from '../controllers/scheme.controller.js';

const router = Router();

router.get('/', SchemeController.getAllSchemes);
router.get('/:id', SchemeController.getSchemeById);
router.post('/:id/apply', SchemeController.apply);

export default router;
