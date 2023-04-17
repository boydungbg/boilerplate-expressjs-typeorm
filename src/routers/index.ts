import {
  getAllCategoryController,
  getCategoryBySlugController
} from '@/controller/CategoryController';
import { getProductBySlugController } from '@/controller/ProductController';
import { Router } from 'express';

const routes = (router: Router) => {
  router.get('/categories/:slug', getCategoryBySlugController);
  router.get('/products/:slug', getProductBySlugController);
  router.get('/categories', getAllCategoryController);
};

export { routes };
