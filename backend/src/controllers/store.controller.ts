import { Request, Response } from 'express';
import { StoreService } from '../services/store.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class StoreController {
  public static getProducts(req: Request, res: Response): Response {
    const { category, search } = req.query;
    const products = StoreService.getAllProducts(category as string, search as string);
    return sendSuccess(res, products);
  }

  public static getProductById(req: Request, res: Response): Response {
    const product = StoreService.getProductById(req.params.id);
    if (!product) return sendError(res, 'Product not found', 404);
    return sendSuccess(res, product);
  }

  public static getOrders(req: Request, res: Response): Response {
    const orders = StoreService.getAllOrders();
    return sendSuccess(res, orders);
  }

  public static createOrder(req: Request, res: Response): Response {
    const { items, deliveryAddress, paymentMethod } = req.body;
    if (!items || !items.length || !deliveryAddress) {
      return sendError(res, 'items and deliveryAddress are required', 400);
    }
    const order = StoreService.createOrder(items, deliveryAddress, paymentMethod || 'Cash on Delivery / UPI');
    return sendSuccess(res, order, 'Order placed successfully', 201);
  }
}
