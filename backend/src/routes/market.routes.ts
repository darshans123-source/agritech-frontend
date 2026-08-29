import { Router } from 'express';
import { MarketController } from '../controllers/market.controller.js';

const router = Router();

router.get('/', MarketController.getMandiRates);
router.get('/best', MarketController.getBestMarket);
router.post('/future-price', MarketController.predictFuturePrice);

export default router;
