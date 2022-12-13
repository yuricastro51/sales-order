import { Request, Response } from 'express';
import { io } from '../../..';
import { Order } from '../../models/order';

export async function createOrder(req: Request, res: Response): Promise<void> {
  try {
    const { table, products } = req.body;
    const order = await Order.create({
      table,
      products
    });
    const orderDetail = await order.populate('products.product');
    io.emit('orders@new', orderDetail);
    res.status(201).json(order);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
}
