import StatusCode from '@/utils/StatusCode';
import T, { LangsType } from '@/configs/Locale';
import ExceptionHandler from 'src/exceptions/ExceptionHandler';
import {
  addCategory,
  getAllCategory,
  getCategoryBySlug,
  updateCategory,
  updateStatusCategory,
  AddCategoryParams,
  UpdateCategoryParams,
  getCategoryById
} from '@/services/CategoryService';
import { responseSuccess, responseError } from '@/utils/Response';
import { Response, Request, NextFunction } from 'express';

const addCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: AddCategoryParams = req.body;
    const categoryExist = await getCategoryBySlug(body.slug);
    if (categoryExist) {
      return next(
        new ExceptionHandler(
          StatusCode.CODE_BAD_REQUEST,
          T({
            lang: req.headers.lang as LangsType,
            key: 'slug_category_exist'
          })
        )
      );
    }
    const category = await addCategory({
      name: body.name,
      slug: body.slug,
      description: body.description
    });
    return responseSuccess({
      res: res,
      data: {
        item: category
      }
    });
  } catch (error) {
    return next(
      new ExceptionHandler(
        StatusCode.CODE_SERVER_ERROR,
        T({
          lang: req.headers.lang as LangsType,
          key: 'faild'
        })
      )
    );
  }
};

const getCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      return next(
        new ExceptionHandler(
          StatusCode.CODE_NOT_FOUND,
          T({
            lang: req.headers.locacle as LangsType,
            key: 'get_category_id_not_found',
            values: [req.params.id]
          })
        )
      );
    }
    return responseSuccess({
      res: res,
      data: {
        item: category
      }
    });
  } catch (error) {
    return next(
      new ExceptionHandler(
        StatusCode.CODE_SERVER_ERROR,
        T({
          lang: req.headers.locacle as LangsType,
          key: 'faild'
        })
      )
    );
  }
};

const getCategoryBySlugController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await getCategoryBySlug(req.params.slug);
    if (!category) {
      return next(
        new ExceptionHandler(
          StatusCode.CODE_NOT_FOUND,
          T({
            lang: req.headers.locacle as LangsType,
            key: 'get_category_slug_not_found',
            values: [req.params.slug]
          })
        )
      );
    }
    return responseSuccess({
      res: res,
      data: {
        item: category
      }
    });
  } catch (error) {
    return next(
      new ExceptionHandler(
        StatusCode.CODE_SERVER_ERROR,
        T({
          lang: req.headers.locacle as LangsType,
          key: 'faild'
        })
      )
    );
  }
};

const editCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: { category: UpdateCategoryParams } = req.body;
    const category = await updateCategory({
      ...body.category,
      id: req.params.id
    });
    if (!category) {
      return next(
        new ExceptionHandler(
          StatusCode.CODE_NOT_FOUND,
          T({
            lang: req.headers.locacle as LangsType,
            key: 'get_category_id_not_found',
            values: [req.params.id]
          })
        )
      );
    }
    return responseSuccess({
      res: res,
      data: {
        item: category
      }
    });
  } catch (error) {
    return next(
      new ExceptionHandler(
        StatusCode.CODE_SERVER_ERROR,
        T({
          lang: req.headers.locacle as LangsType,
          key: 'faild'
        })
      )
    );
  }
};

const updateStatusCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await updateStatusCategory(req.params.id);
    if (!category) {
      return next(
        new ExceptionHandler(
          StatusCode.CODE_NOT_FOUND,
          T({
            lang: req.headers.locacle as LangsType,
            key: 'get_category_id_not_found',
            values: [req.params.id]
          })
        )
      );
    }
    return responseSuccess({
      res: res,
      data: {
        item: category
      }
    });
  } catch (error) {
    return next(
      new ExceptionHandler(
        StatusCode.CODE_SERVER_ERROR,
        T({
          lang: req.headers.locacle as LangsType,
          key: 'faild'
        })
      )
    );
  }
};

const getAllCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategory(
      Number(req.query.page),
      Number(req.query.limit)
    );
    if (req.query.page == null || req.query.limit == null) {
      return responseSuccess({
        res: res,
        data: {
          items: categories.categories
        }
      });
    }
    return responseSuccess({
      res: res,
      data: {
        items: categories.categories,
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        maxPage: categories.maxPage,
        count: categories.count
      }
    });
  } catch (error) {
    next(
      new ExceptionHandler(
        StatusCode.CODE_SERVER_ERROR,
        T({
          lang: req.headers.locacle as LangsType,
          key: 'faild'
        })
      )
    );
  }
};

export {
  addCategoryController,
  getCategoryByIdController,
  getCategoryBySlugController,
  editCategoryController,
  getAllCategoryController,
  updateStatusCategoryController
};
