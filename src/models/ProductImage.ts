import { sequelize } from '@/configs/ConnectDB';
import { Model, DataTypes } from 'sequelize';

type ProductImageModelAttributes = {
  id?: number;
  url: string;
  alt?: string;
  productId: number;
};

class ProductImage extends Model<ProductImageModelAttributes> {
  declare id: number;
  declare url: string;
  declare alt: string;
  declare productId: number;
}

ProductImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    url: {
      type: DataTypes.STRING(1000)
    },
    alt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    productId: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize: sequelize,
    modelName: 'productImage'
  }
);

export default ProductImage;
