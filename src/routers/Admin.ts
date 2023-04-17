import {
  addCategoryController,
  editCategoryController,
  updateStatusCategoryController,
  getCategoryByIdController,
  getAllCategoryController
} from '@/controller/CategoryController';
import {
  addProductController,
  getAllProductController,
  getProductByIdController,
  updateProductController,
  updateProductStatusController
} from '@/controller/ProductController';
import { Router } from 'express';

const adminRoutes = (router: Router) => {
  router.post('/categories', addCategoryController);
  router.get('/categories', getAllCategoryController);
  router.get('/categories/:id', getCategoryByIdController);
  router.put('/categories/:id', editCategoryController);
  router.put('/categories/:id/status', updateStatusCategoryController);
  router.post('/products', addProductController);
  router.get('/products', getAllProductController);
  router.get('/products/:id', getProductByIdController);
  router.put('/products/:id', updateProductController);
  router.put('/products/:id/status', updateProductStatusController);
};

export { adminRoutes };
