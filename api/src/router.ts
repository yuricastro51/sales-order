import { createCategory } from './app/usecases/categories/create-category';
import { listCategories } from './app/usecases/categories/list-categories';
import { createProduct } from './app/usecases/products/create-product';
import { listProducts } from './app/usecases/products/list-products';
import { listProductsByCategory } from './app/usecases/categories/list-products-by-category';
import { listOrders } from './app/usecases/orders/list-orders';
import { createOrder } from './app/usecases/orders/create-order';
import { changeOrderStatus } from './app/usecases/orders/change-order-status';
import { cancelOrder } from './app/usecases/orders/cancel-order';
import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

router.get('/categories', listCategories);

router.post('/categories', createCategory);

router.get('/products', listProducts);

router.post('/products', upload.single('image'), createProduct);

router.get('/categories/:categoryId/products', listProductsByCategory);

router.get('/orders', listOrders);

router.post('/orders', createOrder);

router.patch('/orders/:orderId', changeOrderStatus);

router.delete('/orders/:orderId', cancelOrder);
