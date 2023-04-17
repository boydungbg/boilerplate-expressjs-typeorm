import { sequelize } from '@/configs/ConnectDB';
import ProductAttributeValue from '@/models/ProductAttributeValue';
import { Model, DataTypes } from 'sequelize';

type ProductModelAttributes = {
  id?: number;
  slug: string;
  name: string;
  thumbnail: string;
  price: number;
  sku?: string;
  barcode?: string;
  isShipping?: boolean;
  shortDescription?: string;
  description?: string;
  status?: number;
  metaKeywords?: string;
  metaTitle?: string;
  metaDescription?: string;
  categoryId?: number;
  langCode: string;
  productAttributeValues?: ProductAttributeValue[];
  langs?: { [key: string]: any };
  [key: string]: any;
};

class Product extends Model<ProductModelAttributes> {
  declare id: number;
  declare slug: string;
  declare name: string;
  declare thumnail: string;
  declare price: number;
  declare sku: string;
  declare barcode: string;
  declare isShipping: boolean;
  declare shortDescription: string;
  declare description: string;
  declare status: number;
  declare metaKeywords: string;
  declare metaTitle: string;
  declare metaDescription: string;
  declare categoryId: number;
  declare langCode: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING(1000)
    },
    thumbnail: {
      type: DataTypes.STRING(1000)
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    sku: {
      type: DataTypes.STRING
    },
    barcode: {
      type: DataTypes.STRING
    },
    isShipping: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    shortDescription: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metaKeywords: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    metaTitle: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    },
    langCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize: sequelize,
    deletedAt: true,
    modelName: 'product'
  }
);

export default Product;
