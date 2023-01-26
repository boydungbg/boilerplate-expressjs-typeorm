import ExceptionHandler from '@/models/ExceptionHandler';
import { addCategory, getAllCategory, getCategoryBySlug, updateCategory, updateStatusCategory } from '@/services/CategoryService';
import { responseSuccess } from '@/utils/Response';
import { Response, Request, NextFunction } from 'express';

const addCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await addCategory({
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description
    });
    return responseSuccess({
      res: res,
      status: 200,
      data: {
        item: category
      }
    })
  } catch (error) {
    next(new ExceptionHandler(400, 'Add category failded!'));
  }
}

const getCategoryBySlugController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategoryBySlug(req.params.slug);
    return responseSuccess({
      res: res,
      status: 200,
      data: {
        item: category
      }
    })
  } catch (error) {
    next(new ExceptionHandler(404, `Category ${req.params.slug} not found!`));
  }
}

const editCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await updateCategory({
      id: req.params.id,
      ...req.body.category
    });
    return responseSuccess({
      res: res,
      status: 200,
      data: {
        item: category
      }
    })
  } catch (error) {
    next(new ExceptionHandler(404, `Category ID:${req.params.id} not found!`));
  }
}

const updateStatusCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await updateStatusCategory(req.params.id,);
    return responseSuccess({
      res: res,
      status: 200,
      data: {
        item: category
      }
    })
  } catch (error) {
    next(new ExceptionHandler(404, `Category ID:${req.params.id} not found!`));
  }
}

const getAllCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await getAllCategory(Number(req.query.page), Number(req.query.limit));
    if (req.query.page == null || req.query.limit == null) {
      return responseSuccess({
        res: res,
        status: 200,
        data: {
          items: categories.categories
        }
      })
    }
    return responseSuccess({
      res: res,
      status: 200,
      data: {
        items: categories.categories,
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        maxPage: categories.maxPage,
        count: categories.count,
      }
    })
  } catch (error) {
    next(new ExceptionHandler());
  }
}

export { addCategoryController, getCategoryBySlugController, editCategoryController, getAllCategoryController, updateStatusCategoryController };