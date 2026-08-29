import { Router } from 'express';
import { WeatherController } from '../controllers/weather.controller.js';

const router = Router();

router.get('/', WeatherController.getWeather);
router.get('/spraying', WeatherController.getSprayingAdvisory);
router.get('/irrigation', WeatherController.getIrrigationAdvisory);
router.get('/forecast', WeatherController.getForecast);

export default router;
