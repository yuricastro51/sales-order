import { Request, Response } from 'express';
import { Product } from '../../models/product';

export async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      imagePath
    });
    res.status(201).json(product);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
}
