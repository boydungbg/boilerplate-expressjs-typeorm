import { LangsType } from '@/configs/Locale';
import { sequelize } from '@/configs/ConnectDB';
import {
  ProductAttribute,
  Product,
  ProductAttributeValue,
  ProductImage
} from '@/models/index';
import { Op } from 'sequelize';

const enum StatusProduct {
  ACTIVE = 1,
  IN_ACTIVE = 0
}

export type AddProductParams = {
  slug: string;
  name: string;
  thumbnail: string;
  price: number;
  sku?: string;
  barcode?: string;
  isShipping?: boolean;
  shortDescription?: string;
  description?: string;
  metaKeywords?: string;
  metaTitle?: string;
  metaDescription?: string;
  categoryId?: number;
  langCode: string;
  langs?: {
    name: string;
    description: string;
    shortDescription: string;
    metaTitle: string;
    metaDescription: string;
    langCode: string;
  }[];
  images?: {
    url: string;
    alt: string;
  }[];
};

export type UpdateProductParams = {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  price: number;
  sku?: string;
  barcode?: string;
  isShipping?: boolean;
  shortDescription?: string;
  description?: string;
  metaKeywords?: string;
  metaTitle?: string;
  metaDescription?: string;
  categoryId?: number;
  langs?: {
    [key: string]: {
      [key: string]: any;
      name: {
        productAttributeValueId: string;
        value: string;
      };
      description: {
        productAttributeValueId: string;
        value: string;
      };
      shortDescription: {
        productAttributeValueId: string;
        value: string;
      };
      metaTitle: {
        productAttributeValueId: string;
        value: string;
      };
      metaDescription: {
        productAttributeValueId: string;
        value: string;
      };
    };
  }[];
  images?: {
    id: string;
    url: string;
    alt: string;
  }[];
};

export type GetProductParams = {
  page: number;
  limit: number;
  search: string;
  sort?: string;
};

const addProduct = async ({
  slug,
  name,
  thumbnail,
  price,
  sku,
  barcode,
  isShipping,
  shortDescription,
  description,
  metaKeywords,
  metaTitle,
  metaDescription,
  categoryId,
  langCode,
  langs,
  images
}: AddProductParams) => {
  const transactionAddProduct = await sequelize.transaction();
  try {
    const newProduct = await Product.create({
      name: name,
      price: price,
      slug: slug,
      thumbnail: thumbnail,
      barcode: barcode,
      categoryId: categoryId,
      description: description,
      isShipping: isShipping,
      metaDescription: metaDescription,
      metaKeywords: metaKeywords,
      metaTitle: metaTitle,
      shortDescription: shortDescription,
      sku: sku,
      langCode: langCode
    });
    let productValueWithLang: { [key: string]: { [key: string]: any } } = {};
    if (langs != undefined && langs.length > 0) {
      langs.forEach((productLangValue) => {
        productValueWithLang[productLangValue.langCode] = {
          ...productLangValue
        };
        return productValueWithLang;
      });
      for (const lang in productValueWithLang) {
        Object.keys(productValueWithLang[lang]).forEach(async (key) => {
          let productAtt = await ProductAttribute.findOrCreate({
            where: {
              name: `${key}_${lang}`
            }
          });
          ProductAttributeValue.create({
            productId: newProduct.id,
            productAttributeId: productAtt[0].id,
            value: productValueWithLang[lang][key]
          });
        });
      }
    }
    images?.forEach(async (image) => {
      await ProductImage.create({
        productId: newProduct.id,
        url: image.url,
        alt: image.alt
      });
    });
    await transactionAddProduct.commit();
    return {
      ...newProduct.dataValues,
      langs: {
        ...productValueWithLang
      },
      images
    };
  } catch (error) {
    await transactionAddProduct.rollback();
  }
  return null;
};

const getDataProductLangBySlugWith = async (slug: string, lang: LangsType) => {
  const product = await Product.findOne({
    where: {
      slug: slug
    },
    attributes: {
      exclude: ['CategoryId'],
      include: []
    },
    include: [
      {
        model: ProductAttributeValue,
        attributes: {
          exclude: ['ProductId', 'ProductAttributeId']
        },
        include: [
          {
            model: ProductAttribute,
            where: {
              name: {
                [Op.like]: `%_${lang}`
              }
            }
          }
        ]
      },
      {
        model: ProductImage,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    ]
  });
  if (!product) {
    return null;
  }
  let dataProduct = { ...product.dataValues };
  dataProduct.productAttributeValues?.forEach((productAttributevalue) => {
    let dataProductAttrValue = { ...productAttributevalue.dataValues };
    let dataProductAttrField = {
      ...dataProductAttrValue.productAttribute?.dataValues
    };
    let [fieldName] = dataProductAttrField.name?.split('_') ?? [];
    dataProduct[fieldName] =
      dataProductAttrValue.value ?? dataProduct[fieldName];
  });
  delete dataProduct.productAttributeValues;
  return dataProduct;
};

const getDataProductById = async (id: string, lang: LangsType) => {
  const product = await Product.findOne({
    where: {
      id: id
    },
    attributes: {
      exclude: ['CategoryId'],
      include: []
    },
    include: [
      {
        model: ProductAttributeValue,
        attributes: {
          exclude: ['ProductId', 'ProductAttributeId']
        },
        include: [
          {
            model: ProductAttribute
          }
        ]
      },
      {
        model: ProductImage,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    ]
  });
  if (!product) {
    return null;
  }
  let dataProduct = { ...product.dataValues };
  dataProduct.langs = {};
  dataProduct.productAttributeValues?.forEach((productAttributevalue) => {
    let dataProductAttrValue = { ...productAttributevalue.dataValues };
    let dataProductAttrField = {
      ...dataProductAttrValue.productAttribute?.dataValues
    };
    let [fieldName, lang] = dataProductAttrField.name?.split('_') ?? [];
    if (!dataProduct.langs![lang]) {
      dataProduct.langs![lang] = {};
    }
    dataProduct.langs![lang][fieldName] = {
      value: dataProductAttrValue.value,
      productAttributeValueId: dataProductAttrValue.id
    };
  });
  delete dataProduct.productAttributeValues;
  return dataProduct;
};

const getProductBySlug = async (slug: string) => {
  const product = await Product.findOne({
    where: {
      slug: slug
    }
  });
  if (!product) {
    return null;
  }
  return product.dataValues;
};

const updateProduct = async ({
  id,
  name,
  price,
  slug,
  thumbnail,
  barcode,
  categoryId,
  description,
  isShipping,
  metaDescription,
  metaKeywords,
  metaTitle,
  shortDescription,
  sku,
  langs,
  images
}: UpdateProductParams) => {
  const transactionUpdateProduct = await sequelize.transaction();
  try {
    const product = await Product.findByPk(id);
    if (!product) return null;
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.slug = slug ?? product.slug;
    product.thumnail = thumbnail ?? product.thumnail;
    product.barcode = barcode ?? product.barcode;
    product.categoryId = categoryId ?? product.categoryId;
    product.description = description ?? product.description;
    product.isShipping = isShipping ?? product.isShipping;
    product.metaDescription = metaDescription ?? product.metaDescription;
    product.metaKeywords = metaKeywords ?? product.metaKeywords;
    product.metaTitle = metaTitle ?? product.metaDescription;
    product.shortDescription = shortDescription ?? product.shortDescription;
    product.sku = sku ?? product.sku;
    await product.save();
    for (const lang in langs ?? []) {
      for (const field in langs![lang]) {
        let productAttributeValue = await ProductAttributeValue.findByPk(
          langs![lang][field]['productAttributeValueId']
        );
        if (productAttributeValue) {
          productAttributeValue.value =
            langs![lang][field]['value'] ?? productAttributeValue.value;
          await productAttributeValue.save();
        }
      }
    }
    for (const image of images ?? []) {
      const productImage = await ProductImage.findByPk(image.id);
      if (productImage) {
        productImage.alt = image.alt ?? productImage.alt;
        productImage.url = image.url ?? productImage.url;
        await productImage.save();
      }
    }
    await transactionUpdateProduct.commit();
    return {
      ...product.dataValues,
      langs,
      images
    };
  } catch (error) {
    await transactionUpdateProduct.rollback();
  }
  return null;
};

const updateStatusProduct = async (productId: string) => {
  const product = await Product.findByPk(productId);
  if (!product) {
    return null;
  }
  product.status =
    product.status == StatusProduct.ACTIVE
      ? StatusProduct.IN_ACTIVE
      : StatusProduct.ACTIVE;
  product.save();
  return product;
};

const getAllProducts = async (
  search: String = ' ',
  limit: number = 10,
  page: number = 1,
  sort?: string
) => {
  const offset = limit * (page - 1);
  const products = await Product.findAndCountAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${search}%`
          }
        },
        {
          sku: {
            [Op.like]: `%${search}%`
          }
        },
        {
          barcode: {
            [Op.like]: `%${search}%`
          }
        }
      ]
    },
    offset: offset,
    limit: limit,
    order: [['created_at', sort ? sort.toUpperCase() : 'DESC']]
  });
  return products;
};

export {
  addProduct,
  getDataProductLangBySlugWith,
  getProductBySlug,
  getDataProductById,
  updateProduct,
  updateStatusProduct,
  getAllProducts
};
