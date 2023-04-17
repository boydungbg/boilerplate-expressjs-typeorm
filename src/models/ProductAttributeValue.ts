import { sequelize } from '@/configs/ConnectDB';
import { Model, DataTypes } from 'sequelize';
import ProductAttribute from '@/models/ProductAttribute';

type ProductAttributeValueModelAttributes = {
  id?: number;
  value?: string;
  productAttributeId: number;
  productId: number;
  productAttribute?: ProductAttribute;
};

class ProductAttributeValue extends Model<ProductAttributeValueModelAttributes> {
  declare id: number;
  declare value: string;
  declare productAttributeId: number;
  declare productId: number;
}

ProductAttributeValue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    value: {
      type: DataTypes.TEXT
    },
    productAttributeId: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize: sequelize,
    modelName: 'productAttributeValue'
  }
);

export default ProductAttributeValue;
