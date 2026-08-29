import { Router } from 'express';
import { IoTController } from '../controllers/iot.controller.js';

const router = Router();

router.get('/devices', IoTController.getDevices);
router.post('/devices', IoTController.createDevice);
router.get('/devices/:id', IoTController.getDeviceById);
router.get('/devices/:id/readings', IoTController.getReadings);

export default router;
