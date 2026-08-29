import { Router } from 'express';
import { StoreController } from '../controllers/store.controller.js';

const router = Router();

router.get('/products', StoreController.getProducts);
router.get('/products/:id', StoreController.getProductById);
router.get('/orders', StoreController.getOrders);
router.post('/orders', StoreController.createOrder);

export default router;
