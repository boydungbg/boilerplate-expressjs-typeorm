import T, { LangsType } from '@/configs/Locale';
import {
  addProduct,
  AddProductParams,
  getDataProductById,
  getDataProductLangBySlugWith,
  getProductBySlug,
  getAllProducts,
  updateProduct,
  UpdateProductParams,
  updateStatusProduct,
  GetProductParams
} from '@/services/ProductService';
import { responseSuccess } from '@/utils/Response';
import StatusCode from '@/utils/StatusCode';
import { Request, Response, NextFunction } from 'express';
import ExceptionHandler from 'src/exceptions/ExceptionHandler';

const addProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: AddProductParams = req.body;
  try {
    const productExist = await getProductBySlug(body.slug);
    if (productExist) {
      return next(
        new ExceptionHandler(
          StatusCode.CODE_BAD_REQUEST,
          T({
            lang: req.headers.lang as LangsType,
            key: 'slug_product_exist'
          })
        )
      );
    }
    const product = await addProduct({
      slug: body.slug,
      name: body.name,
      thumbnail: body.thumbnail,
      price: body.price,
      barcode: body.barcode,
      isShipping: body.isShipping,
      shortDescription: body.shortDescription,
      description: body.description,
      metaKeywords: body.metaKeywords,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      categoryId: body.categoryId,
      langs: body.langs,
      images: body.images,
      langCode: body.langCode,
      sku: body.sku
    });
    return responseSuccess({
      res,
      data: { item: product }
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

const getProductBySlugController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await getDataProductLangBySlugWith(
      req.params.slug,
      (req.headers.lang as LangsType) ?? 'vi'
    );
    if (!product) {
      return next(
        new ExceptionHandler(
          StatusCode.CODE_NOT_FOUND,
          T({
            lang: req.headers.lang as LangsType,
            key: 'get_product_slug_not_found',
            values: [req.params.slug]
          })
        )
      );
    }
    return responseSuccess({
      res,
      data: { item: product }
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

const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await getDataProductById(
      req.params.id,
      req.headers.lang as LangsType
    );
    if (!product) {
      return next(
        new ExceptionHandler(
          StatusCode.CODE_NOT_FOUND,
          T({
            lang: req.headers.lang as LangsType,
            key: 'get_product_id_not_found',
            values: [req.params.id]
          })
        )
      );
    }
    return responseSuccess({
      res,
      data: { item: product }
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

const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: UpdateProductParams = req.body;
    const productUpdated = await updateProduct({
      ...body,
      id: req.params.id
    });
    if (!productUpdated) {
      return next(
        new ExceptionHandler(
          StatusCode.CODE_NOT_FOUND,
          T({
            lang: req.headers.lang as LangsType,
            key: 'get_product_id_not_found',
            values: [req.params.id]
          })
        )
      );
    }
    return responseSuccess({
      res,
      data: { item: productUpdated }
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

const updateProductStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productUpdated = await updateStatusProduct(req.params.id);
    if (!productUpdated) {
      return next(
        new ExceptionHandler(
          StatusCode.CODE_NOT_FOUND,
          T({
            lang: req.headers.locacle as LangsType,
            key: 'get_product_id_not_found'
          })
        )
      );
    }
    return responseSuccess({
      res,
      data: [],
      message: T({
        lang: req.headers.locacle as LangsType,
        key: 'successfully'
      })
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

const getAllProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, page, search, sort }: GetProductParams =
      req.query as unknown as GetProductParams;
    const { count, rows } = await getAllProducts(search, limit, page, sort);
    return responseSuccess({
      res,
      data: {
        items: rows,
        count: count,
        page: page,
        limit: limit
      },
      message: T({
        lang: req.headers.locacle as LangsType,
        key: 'successfully'
      })
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
export {
  addProductController,
  getProductByIdController,
  getProductBySlugController,
  updateProductController,
  updateProductStatusController,
  getAllProductController
};
