import { sequelize } from '@/configs/ConnectDB';
import { Model, DataTypes } from 'sequelize';

type ProductAttributeModelAttributes = {
  id?: number;
  name: string;
};

class ProductAttribute extends Model<ProductAttributeModelAttributes> {
  declare id: number;
  declare name: string;
}

ProductAttribute.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  },
  {
    sequelize: sequelize,
    modelName: 'productAttribute'
  }
);

export default ProductAttribute;
