import { Model, DataTypes, Optional } from 'sequelize'
import { sequelize } from '@/configs/ConnectDB';

type CategoryAttributes = {
  id: string,
  slug: string,
  name: string,
  description: string | undefined,
  status: number | undefined,
}

class Category extends Model<CategoryAttributes> {
  declare id: string;
  declare slug: string;
  declare name: string;
  declare description: string | undefined;
  declare status: number | undefined;
}

(async () => {
  Category.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    sequelize: sequelize,
  });

  Category.sync();
})()

export default Category;