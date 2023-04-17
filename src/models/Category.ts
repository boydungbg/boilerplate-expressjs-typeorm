import { sequelize } from '@/configs/ConnectDB';
import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

type CategoryModelAttributes = {
  id?: number;
  uuid?: string;
  slug: string;
  name: string;
  description?: string;
  status?: number;
};

class Category extends Model<CategoryModelAttributes> {
  declare id: number;
  declare uuid: string;
  declare slug: string;
  declare name: string;
  declare description: string | undefined;
  declare status: number | undefined;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  },
  {
    sequelize: sequelize,
    deletedAt: true,
    modelName: 'category'
  }
);

export default Category;
