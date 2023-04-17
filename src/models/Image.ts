import { sequelize } from '@/configs/ConnectDB';
import { Model, DataTypes } from 'sequelize';

type ImageModelAttributes = {
  id?: number;
  url: string;
  alt?: string;
  name?: string;
};

class Image extends Model<ImageModelAttributes> {
  declare id: number;
  declare url: string;
  declare alt: string;
  declare productId: number;
}

Image.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: sequelize,
    modelName: 'Image'
  }
);

export default Image;
