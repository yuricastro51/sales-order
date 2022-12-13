import { Request, Response } from 'express';
import { Category } from '../../models/category';

export async function listCategories(req: Request, res: Response): Promise<void> {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
}
