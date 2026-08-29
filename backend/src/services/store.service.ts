import { db } from '../models/database.js';
import { StoreProduct, StoreOrder, CartItem } from '../types/index.js';

export class StoreService {
  public static getAllProducts(category?: string, search?: string): StoreProduct[] {
    let list = Array.from(db.products.values());
    if (category && category !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    }
    return list;
  }

  public static getProductById(id: string): StoreProduct | undefined {
    return db.products.get(id);
  }

  public static getAllOrders(): StoreOrder[] {
    return Array.from(db.orders.values());
  }

  public static createOrder(items: CartItem[], deliveryAddress: string, paymentMethod: string): StoreOrder {
    const totalAmount = items.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
    const id = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const order: StoreOrder = {
      id,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      items,
      totalAmount,
      deliveryAddress,
      status: 'Processing',
      paymentMethod,
      trackingSteps: [
        { title: 'Order Confirmed & Payment Received', date: 'Just now', completed: true },
        { title: 'Dispatched from KrishiSmart Hub (Mandya)', date: 'Expected Tomorrow', completed: false },
        { title: 'Out for Farm Gate Delivery', date: 'Expected 2 days', completed: false },
        { title: 'Delivered', date: 'Expected 3 days', completed: false }
      ]
    };

    db.orders.set(id, order);
    return order;
  }
}
