import { Request, Response } from 'express';
import { Order } from '../../models/order';

export async function cancelOrder(req: Request, res: Response): Promise<void> {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.sendStatus(204);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
}
