import { addCategoryController, getCategoryBySlugController, editCategoryController, getAllCategoryController, updateStatusCategoryController } from "@/controller/CategoryController";
import { Router } from "express";

const routersCatetory = (router: Router) => {
  router.post('/category', addCategoryController);
  router.get('/category/:slug', getCategoryBySlugController)
  router.put('/category/:id', editCategoryController)
  router.put('/category/:id/status', updateStatusCategoryController)
  router.get('/category', getAllCategoryController)
};

export { routersCatetory };