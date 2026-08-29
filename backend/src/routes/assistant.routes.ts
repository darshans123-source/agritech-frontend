import { Router } from 'express';
import { AssistantController } from '../controllers/assistant.controller.js';

const router = Router();

router.post('/query', AssistantController.query);

export default router;
